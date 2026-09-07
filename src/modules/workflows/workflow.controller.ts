import { Request, Response } from "express";

import { HTTP_STATUS } from "../../constants";
import { asyncHandler } from "../../middleware/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";

import workflowService from "./workflow.service";

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    organizationId: string;
    email: string;
  };
}

class WorkflowController {
  /**
   * Get all workflows
   */
  getWorkflows = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.getAll(
      request.user.organizationId,
      req.query,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflows fetched successfully", data));
  });

  /**
   * Get workflow by ID
   */
  getWorkflowById = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.getById(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow fetched successfully", data));
  });

  /**
   * Create workflow
   */
  createWorkflow = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.create(
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Workflow created successfully", data));
  });

  /**
   * Update workflow
   */
  updateWorkflow = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.update(
      req.params.id,
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow updated successfully", data));
  });

  /**
   * Delete workflow
   */
  deleteWorkflow = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    await workflowService.delete(req.params.id, request.user.organizationId);

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow deleted successfully"));
  });

  /**
   * Activate workflow
   */
  activateWorkflow = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.activate(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow activated successfully", data));
  });

  /**
   * Deactivate workflow
   */
  deactivateWorkflow = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.deactivate(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow deactivated successfully", data));
  });

  // ============================================================
  // WORKFLOW STEPS
  // ============================================================

  /**
   * Get workflow steps
   */
  getWorkflowSteps = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.getSteps(
      req.params.id,
      request.user.organizationId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow steps fetched successfully", data));
  });

  /**
   * Create workflow step
   */
  createWorkflowStep = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.createStep(
      req.params.id,
      request.user.organizationId,
      req.body,
    );

    res
      .status(HTTP_STATUS.CREATED)
      .json(new ApiResponse(true, "Workflow step created successfully", data));
  });

  /**
   * Update workflow step
   */
  updateWorkflowStep = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    const data = await workflowService.updateStep(
      req.params.id,
      request.user.organizationId,
      req.params.stepId,
      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow step updated successfully", data));
  });

  /**
   * Delete workflow step
   */
  deleteWorkflowStep = asyncHandler(async (req: Request, res: Response) => {
    const request = req as AuthenticatedRequest;

    await workflowService.deleteStep(
      req.params.id,
      request.user.organizationId,
      req.params.stepId,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(new ApiResponse(true, "Workflow step deleted successfully"));
  });
}

export default new WorkflowController();
