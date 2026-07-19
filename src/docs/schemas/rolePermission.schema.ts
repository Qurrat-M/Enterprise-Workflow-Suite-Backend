/**
 * @swagger
 * components:
 *   schemas:
 *     AssignPermissions:
 *       type: object
 *       required:
 *         - permissionIds
 *       properties:
 *         permissionIds:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           example:
 *             - "550e8400-e29b-41d4-a716-446655440000"
 *             - "550e8400-e29b-41d4-a716-446655440001"
 *
 *     RolePermission:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         module:
 *           type: string
 *           example: budget
 *         action:
 *           type: string
 *           example: create
 *         name:
 *           type: string
 *           example: budget.create
 *         display_name:
 *           type: string
 *           example: Create Budget
 *         description:
 *           type: string
 *           example: Allows creating budgets
 *         created_at:
 *           type: string
 *           format: date-time
 */
