/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePermission:
 *       type: object
 *       required:
 *         - module
 *         - action
 *       properties:
 *         module:
 *           type: string
 *           example: Budget
 *         action:
 *           type: string
 *           example: Create
 *         display_name:
 *           type: string
 *           example: Create Budget
 *         description:
 *           type: string
 *           example: Allows users to create budgets.
 *
 *     UpdatePermission:
 *       type: object
 *       properties:
 *         module:
 *           type: string
 *           example: Budget
 *         action:
 *           type: string
 *           example: Approve
 *         display_name:
 *           type: string
 *           example: Approve Budget
 *         description:
 *           type: string
 *           example: Allows users to approve budgets.
 *
 *     Permission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         module:
 *           type: string
 *           example: Budget
 *         action:
 *           type: string
 *           example: Create
 *         name:
 *           type: string
 *           example: budget.create
 *         display_name:
 *           type: string
 *           example: Create Budget
 *         description:
 *           type: string
 *           example: Allows users to create budgets.
 *         created_at:
 *           type: string
 *           format: date-time
 */
