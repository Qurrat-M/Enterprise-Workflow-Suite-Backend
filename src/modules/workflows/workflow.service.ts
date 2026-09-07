import { HTTP_STATUS } from "../../constants";
import { ApiError } from "../../utils/ApiError";

import workflowRepository from "./workflow.repository";

import {
  CreateWorkflowInput,
  CreateWorkflowStepInput,
  UpdateWorkflowInput,
  UpdateWorkflowStepInput,
} from "./workflow.types";

class WorkflowService {
  /**
   * Create workflow
   */
  async create(organizationId: string, data: CreateWorkflowInput) {
    return workflowRepository.create(organizationId, data);
  }

  /**
   * Get all workflows
   */
  async getAll(organizationId: string, query: Record<string, unknown>) {
    return workflowRepository.findAll(organizationId, query);
  }

  /**
   * Get workflow by ID
   */
  async getById(id: string, organizationId: string) {
    const workflow = await workflowRepository.findById(id, organizationId);

    if (!workflow) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Workflow not found");
    }

    return workflow;
  }

  /**
   * Update workflow
   *
   * Only inactive workflows can be updated.
   */
  async update(id: string, organizationId: string, data: UpdateWorkflowInput) {
    const workflow = await this.getById(id, organizationId);

    if (workflow.status !== "inactive") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only inactive workflows can be updated",
      );
    }

    return workflowRepository.update(id, organizationId, data);
  }

  /**
   * Delete workflow
   *
   * Only inactive workflows can be deleted.
   */
  async delete(id: string, organizationId: string) {
    const workflow = await this.getById(id, organizationId);

    if (workflow.status !== "inactive") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Only inactive workflows can be deleted",
      );
    }

    await workflowRepository.delete(id, organizationId);
  }

  /**
   * Activate workflow
   *
   * inactive → active
   *
   * A workflow must contain at least one step
   * before it can be activated.
   */
  async activate(id: string, organizationId: string) {
    const workflow = await this.getById(id, organizationId);

    if (workflow.status === "active") {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, "Workflow is already active");
    }

    const steps = await workflowRepository.findSteps(id);

    if (!steps.length) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Workflow must contain at least one step before activation",
      );
    }

    return workflowRepository.updateStatus(id, organizationId, "active");
  }

  /**
   * Deactivate workflow
   *
   * active → inactive
   */
  async deactivate(id: string, organizationId: string) {
    const workflow = await this.getById(id, organizationId);

    if (workflow.status === "inactive") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Workflow is already inactive",
      );
    }

    return workflowRepository.updateStatus(id, organizationId, "inactive");
  }

  // ============================================================
  // WORKFLOW STEPS
  // ============================================================

  /**
   * Create workflow step
   *
   * Steps can only be modified while the workflow is inactive.
   */
  async createStep(
    workflowId: string,
    organizationId: string,
    data: CreateWorkflowStepInput,
  ) {
    const workflow = await this.getById(workflowId, organizationId);

    if (workflow.status !== "inactive") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Steps can only be added to inactive workflows",
      );
    }

    this.validateStepApprover(data);

    return workflowRepository.createStep(workflowId, data);
  }

  /**
   * Get workflow steps
   */
  async getSteps(workflowId: string, organizationId: string) {
    await this.getById(workflowId, organizationId);

    return workflowRepository.findSteps(workflowId);
  }

  /**
   * Update workflow step
   */
  async updateStep(
    workflowId: string,
    organizationId: string,
    stepId: string,
    data: UpdateWorkflowStepInput,
  ) {
    const workflow = await this.getById(workflowId, organizationId);

    if (workflow.status !== "inactive") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Steps can only be updated in inactive workflows",
      );
    }

    const step = await workflowRepository.findStepById(workflowId, stepId);

    if (!step) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Workflow step not found");
    }

    this.validateStepApprover(data, step);

    return workflowRepository.updateStep(workflowId, stepId, data);
  }

  /**
   * Delete workflow step
   */
  async deleteStep(workflowId: string, organizationId: string, stepId: string) {
    const workflow = await this.getById(workflowId, organizationId);

    if (workflow.status !== "inactive") {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Steps can only be deleted from inactive workflows",
      );
    }

    const step = await workflowRepository.findStepById(workflowId, stepId);

    if (!step) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, "Workflow step not found");
    }

    await workflowRepository.deleteStep(workflowId, stepId);
  }

  /**
   * Validate approver configuration
   */
  private validateStepApprover(
    data: CreateWorkflowStepInput | UpdateWorkflowStepInput,
    existingStep?: {
      approverType: string;
      approverRoleId: string | null;
    },
  ) {
    const approverType = data.approverType ?? existingStep?.approverType;

    const approverRoleId =
      data.approverRoleId !== undefined
        ? data.approverRoleId
        : existingStep?.approverRoleId;

    /**
     * Role-based approver requires a role ID.
     */
    if (approverType === "role" && !approverRoleId) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Approver role ID is required when approver type is role",
      );
    }

    /**
     * Non-role approvers should not use a role ID.
     */
    if (approverType !== "role" && approverRoleId) {
      throw new ApiError(
        HTTP_STATUS.BAD_REQUEST,
        "Approver role ID can only be used with role approver type",
      );
    }
  }
}

export default new WorkflowService();
