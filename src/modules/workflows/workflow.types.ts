export type WorkflowType = "serial" | "parallel" | "mixed";

export type WorkflowStatus = "active" | "inactive";

export type WorkflowEntityType = "budget" | "asset";

export type ApproverType = "role" | "user" | "department_head";

export interface Workflow {
  id: string;
  organizationId: string;
  name: string;
  description: string | null;
  type: WorkflowType;
  status: WorkflowStatus;
  entityType: WorkflowEntityType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkflowInput {
  name: string;
  description?: string;
  type: WorkflowType;
  entityType: WorkflowEntityType;
}

export interface UpdateWorkflowInput {
  name?: string;
  description?: string;
  type?: WorkflowType;
  entityType?: WorkflowEntityType;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  name: string;
  description: string | null;
  stepOrder: number;
  approverType: ApproverType;
  approverRoleId: string | null;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkflowStepInput {
  name: string;
  description?: string;
  stepOrder: number;
  approverType: ApproverType;
  approverRoleId?: string;
  isRequired?: boolean;
}

export interface UpdateWorkflowStepInput {
  name?: string;
  description?: string;
  stepOrder?: number;
  approverType?: ApproverType;
  approverRoleId?: string | null;
  isRequired?: boolean;
}
