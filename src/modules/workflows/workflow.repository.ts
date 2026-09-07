import { db } from "../../config/db";
import { getPagination } from "../../utils/pagination/getPagination";

import {
  CreateWorkflowInput,
  CreateWorkflowStepInput,
  UpdateWorkflowInput,
  UpdateWorkflowStepInput,
  WorkflowStatus,
} from "./workflow.types";

class WorkflowRepository {
  /**
   * Create workflow within an organization
   */
  async create(organizationId: string, data: CreateWorkflowInput) {
    const { rows } = await db.query(
      `
      INSERT INTO workflows (
        organization_id,
        name,
        description,
        type,
        entity_type
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        organization_id,
        name,
        description,
        type,
        status,
        entity_type,
        created_at,
        updated_at;
      `,
      [
        organizationId,
        data.name,
        data.description ?? null,
        data.type,
        data.entityType,
      ],
    );

    return rows[0];
  }

  /**
   * Get a single workflow belonging to an organization
   */
  async findById(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        description,
        type,
        status,
        entity_type,
        created_at,
        updated_at
      FROM workflows
      WHERE id = $1
        AND organization_id = $2;
      `,
      [id, organizationId],
    );

    return rows[0];
  }

  /**
   * Get paginated workflows belonging to an organization
   */
  async findAll(organizationId: string, query: Record<string, unknown>) {
    const { page, limit, offset, search, sort, order } = getPagination(query);

    const allowedSortColumns = [
      "name",
      "type",
      "status",
      "entity_type",
      "created_at",
      "updated_at",
    ];

    const sortColumn = allowedSortColumns.includes(sort) ? sort : "created_at";

    const filter = `%${search || ""}%`;

    /**
     * Count total records
     */
    const countResult = await db.query(
      `
      SELECT COUNT(*) AS total
      FROM workflows
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(type) LIKE LOWER($2)
          OR LOWER(status) LIKE LOWER($2)
          OR LOWER(entity_type) LIKE LOWER($2)
        );
      `,
      [organizationId, filter],
    );

    /**
     * Fetch workflows
     */
    const { rows } = await db.query(
      `
      SELECT
        id,
        organization_id,
        name,
        description,
        type,
        status,
        entity_type,
        created_at,
        updated_at
      FROM workflows
      WHERE organization_id = $1
        AND (
          LOWER(name) LIKE LOWER($2)
          OR LOWER(type) LIKE LOWER($2)
          OR LOWER(status) LIKE LOWER($2)
          OR LOWER(entity_type) LIKE LOWER($2)
        )
      ORDER BY ${sortColumn} ${order}
      LIMIT $3
      OFFSET $4;
      `,
      [organizationId, filter, limit, offset],
    );

    const totalRecords = Number(countResult.rows[0].total);

    return {
      items: rows,

      pagination: {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
      },
    };
  }

  /**
   * Update workflow information
   */
  async update(id: string, organizationId: string, data: UpdateWorkflowInput) {
    const fields: string[] = [];
    const values: unknown[] = [];

    const add = (field: string, value: unknown) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    };

    if (data.name !== undefined) {
      add("name", data.name);
    }

    if (data.description !== undefined) {
      add("description", data.description);
    }

    if (data.type !== undefined) {
      add("type", data.type);
    }

    if (data.entityType !== undefined) {
      add("entity_type", data.entityType);
    }

    /**
     * Nothing to update
     */
    if (!fields.length) {
      return this.findById(id, organizationId);
    }

    fields.push("updated_at = NOW()");

    /**
     * Workflow ID
     */
    values.push(id);

    /**
     * Organization ID
     */
    values.push(organizationId);

    const { rows } = await db.query(
      `
      UPDATE workflows
      SET ${fields.join(", ")}
      WHERE id = $${values.length - 1}
        AND organization_id = $${values.length}
      RETURNING
        id,
        organization_id,
        name,
        description,
        type,
        status,
        entity_type,
        created_at,
        updated_at;
      `,
      values,
    );

    return rows[0];
  }

  /**
   * Update workflow status
   */
  async updateStatus(
    id: string,
    organizationId: string,
    status: WorkflowStatus,
  ) {
    const { rows } = await db.query(
      `
      UPDATE workflows
      SET
        status = $1,
        updated_at = NOW()
      WHERE id = $2
        AND organization_id = $3
      RETURNING
        id,
        organization_id,
        name,
        description,
        type,
        status,
        entity_type,
        created_at,
        updated_at;
      `,
      [status, id, organizationId],
    );

    return rows[0];
  }

  /**
   * Delete workflow
   */
  async delete(id: string, organizationId: string) {
    const { rows } = await db.query(
      `
      DELETE FROM workflows
      WHERE id = $1
        AND organization_id = $2
      RETURNING id;
      `,
      [id, organizationId],
    );

    return rows[0];
  }

  // ============================================================
  // WORKFLOW STEPS
  // ============================================================

  /**
   * Create workflow step
   */
  async createStep(workflowId: string, data: CreateWorkflowStepInput) {
    const { rows } = await db.query(
      `
      INSERT INTO workflow_steps (
        workflow_id,
        name,
        description,
        step_order,
        approver_type,
        approver_role_id,
        is_required
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        id,
        workflow_id,
        name,
        description,
        step_order,
        approver_type,
        approver_role_id,
        is_required,
        created_at,
        updated_at;
      `,
      [
        workflowId,
        data.name,
        data.description ?? null,
        data.stepOrder,
        data.approverType,
        data.approverRoleId ?? null,
        data.isRequired ?? true,
      ],
    );

    return rows[0];
  }

  /**
   * Get workflow steps
   */
  async findSteps(workflowId: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        workflow_id,
        name,
        description,
        step_order,
        approver_type,
        approver_role_id,
        is_required,
        created_at,
        updated_at
      FROM workflow_steps
      WHERE workflow_id = $1
      ORDER BY step_order ASC;
      `,
      [workflowId],
    );

    return rows;
  }

  /**
   * Get one workflow step
   */
  async findStepById(workflowId: string, stepId: string) {
    const { rows } = await db.query(
      `
      SELECT
        id,
        workflow_id,
        name,
        description,
        step_order,
        approver_type,
        approver_role_id,
        is_required,
        created_at,
        updated_at
      FROM workflow_steps
      WHERE id = $1
        AND workflow_id = $2;
      `,
      [stepId, workflowId],
    );

    return rows[0];
  }

  /**
   * Update workflow step
   */
  async updateStep(
    workflowId: string,
    stepId: string,
    data: UpdateWorkflowStepInput,
  ) {
    const fields: string[] = [];
    const values: unknown[] = [];

    const add = (field: string, value: unknown) => {
      values.push(value);
      fields.push(`${field} = $${values.length}`);
    };

    if (data.name !== undefined) {
      add("name", data.name);
    }

    if (data.description !== undefined) {
      add("description", data.description);
    }

    if (data.stepOrder !== undefined) {
      add("step_order", data.stepOrder);
    }

    if (data.approverType !== undefined) {
      add("approver_type", data.approverType);
    }

    if (data.approverRoleId !== undefined) {
      add("approver_role_id", data.approverRoleId);
    }

    if (data.isRequired !== undefined) {
      add("is_required", data.isRequired);
    }

    /**
     * Nothing to update
     */
    if (!fields.length) {
      return this.findStepById(workflowId, stepId);
    }

    fields.push("updated_at = NOW()");

    values.push(stepId);
    values.push(workflowId);

    const { rows } = await db.query(
      `
      UPDATE workflow_steps
      SET ${fields.join(", ")}
      WHERE id = $${values.length - 1}
        AND workflow_id = $${values.length}
      RETURNING
        id,
        workflow_id,
        name,
        description,
        step_order,
        approver_type,
        approver_role_id,
        is_required,
        created_at,
        updated_at;
      `,
      values,
    );

    return rows[0];
  }

  /**
   * Delete workflow step
   */
  async deleteStep(workflowId: string, stepId: string) {
    const { rows } = await db.query(
      `
      DELETE FROM workflow_steps
      WHERE id = $1
        AND workflow_id = $2
      RETURNING id;
      `,
      [stepId, workflowId],
    );

    return rows[0];
  }
}

export default new WorkflowRepository();
