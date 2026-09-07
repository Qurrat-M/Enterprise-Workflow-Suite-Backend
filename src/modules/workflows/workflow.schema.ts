import { param, query, body } from "express-validator";

export const workflowIdSchema = [
  param("id").isUUID().withMessage("Workflow ID must be a valid UUID"),
];

export const createWorkflowSchema = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Workflow name is required")
    .isLength({ max: 150 })
    .withMessage("Workflow name must not exceed 150 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("type")
    .notEmpty()
    .withMessage("Workflow type is required")
    .isIn(["serial", "parallel", "mixed"])
    .withMessage("Workflow type must be serial, parallel, or mixed"),

  body("entityType")
    .notEmpty()
    .withMessage("Entity type is required")
    .isIn(["budget", "asset"])
    .withMessage("Entity type must be budget or asset"),
];

export const updateWorkflowSchema = [
  param("id").isUUID().withMessage("Workflow ID must be a valid UUID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Workflow name cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Workflow name must not exceed 150 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("type")
    .optional()
    .isIn(["serial", "parallel", "mixed"])
    .withMessage("Workflow type must be serial, parallel, or mixed"),

  body("entityType")
    .optional()
    .isIn(["budget", "asset"])
    .withMessage("Entity type must be budget or asset"),
];

export const workflowListQuerySchema = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),

  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be asc or desc"),
];

export const workflowStepIdSchema = [
  param("id").isUUID().withMessage("Workflow ID must be a valid UUID"),

  param("stepId").isUUID().withMessage("Step ID must be a valid UUID"),
];

export const createWorkflowStepSchema = [
  param("id").isUUID().withMessage("Workflow ID must be a valid UUID"),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Step name is required")
    .isLength({ max: 150 })
    .withMessage("Step name must not exceed 150 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("stepOrder")
    .isInt({ min: 1 })
    .withMessage("Step order must be a positive integer"),

  body("approverType")
    .isIn(["role", "user", "department_head"])
    .withMessage("Approver type must be role, user, or department_head"),

  body("approverRoleId")
    .optional()
    .isUUID()
    .withMessage("Approver role ID must be a valid UUID"),

  body("isRequired")
    .optional()
    .isBoolean()
    .withMessage("isRequired must be a boolean"),
];

export const updateWorkflowStepSchema = [
  param("id").isUUID().withMessage("Workflow ID must be a valid UUID"),

  param("stepId").isUUID().withMessage("Step ID must be a valid UUID"),

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Step name cannot be empty")
    .isLength({ max: 150 })
    .withMessage("Step name must not exceed 150 characters"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("stepOrder")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Step order must be a positive integer"),

  body("approverType")
    .optional()
    .isIn(["role", "user", "department_head"])
    .withMessage("Approver type must be role, user, or department_head"),

  body("approverRoleId")
    .optional({ nullable: true })
    .isUUID()
    .withMessage("Approver role ID must be a valid UUID"),

  body("isRequired")
    .optional()
    .isBoolean()
    .withMessage("isRequired must be a boolean"),
];
