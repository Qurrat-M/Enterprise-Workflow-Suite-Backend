import { Router } from "express";

import workflowController from "./workflow.controller";
import {
  createWorkflowSchema,
  createWorkflowStepSchema,
  updateWorkflowSchema,
  updateWorkflowStepSchema,
  workflowIdSchema,
  workflowListQuerySchema,
  workflowStepIdSchema,
} from "./workflow.schema";

import { authenticate } from "../../middleware/authenticate";
import { authorize } from "../../middleware/authorize";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.use(authenticate);

// Workflows
router.get(
  "/",
  authorize("workflow.read"),
  workflowListQuerySchema,
  validateRequest,
  workflowController.getWorkflows,
);

router.get(
  "/:id",
  authorize("workflow.read"),
  workflowIdSchema,
  validateRequest,
  workflowController.getWorkflowById,
);

router.post(
  "/",
  authorize("workflow.create"),
  createWorkflowSchema,
  validateRequest,
  workflowController.createWorkflow,
);

router.put(
  "/:id",
  authorize("workflow.update"),
  updateWorkflowSchema,
  validateRequest,
  workflowController.updateWorkflow,
);

router.delete(
  "/:id",
  authorize("workflow.delete"),
  workflowIdSchema,
  validateRequest,
  workflowController.deleteWorkflow,
);

// Workflow activation
router.patch(
  "/:id/activate",
  authorize("workflow.activate"),
  workflowIdSchema,
  validateRequest,
  workflowController.activateWorkflow,
);

router.patch(
  "/:id/deactivate",
  authorize("workflow.deactivate"),
  workflowIdSchema,
  validateRequest,
  workflowController.deactivateWorkflow,
);

// Workflow steps
router.get(
  "/:id/steps",
  authorize("workflow.step.read"),
  workflowIdSchema,
  validateRequest,
  workflowController.getWorkflowSteps,
);

router.post(
  "/:id/steps",
  authorize("workflow.step.create"),
  createWorkflowStepSchema,
  validateRequest,
  workflowController.createWorkflowStep,
);

router.put(
  "/:id/steps/:stepId",
  authorize("workflow.step.update"),
  updateWorkflowStepSchema,
  validateRequest,
  workflowController.updateWorkflowStep,
);

router.delete(
  "/:id/steps/:stepId",
  authorize("workflow.step.delete"),
  workflowStepIdSchema,
  validateRequest,
  workflowController.deleteWorkflowStep,
);

export default router;
