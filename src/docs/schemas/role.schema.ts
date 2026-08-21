/**
 * @swagger
 * components:
 *   schemas:
 *     CreateRole:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Finance Manager
 *         description:
 *           type: string
 *           example: Responsible for finance approvals
 *
 *     UpdateRole:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Asset Manager
 *         description:
 *           type: string
 *           example: Responsible for asset management
 *
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 8d5c6e2f-7b11-4d26-8c98-6f58f75eab10
 *         name:
 *           type: string
 *           example: Finance Manager
 *         description:
 *           type: string
 *           example: Responsible for finance approvals
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2026-07-20T12:30:00.000Z
 *
 *     ReplaceRolePermissions:
 *       type: object
 *       required:
 *         - permissionIds
 *       properties:
 *         permissionIds:
 *           type: array
 *           description: Permission IDs to assign to the role. Existing permissions will be replaced.
 *           items:
 *             type: string
 *             format: uuid
 *           example:
 *             - 1c4a9b71-c8b2-4942-b36f-d8ece99d1dc6
 *             - d7c0baea-d16a-4822-b5be-7d444b6edfcb
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     UpdateRoleStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - ACTIVE
 *             - INACTIVE
 *           example: INACTIVE
 */
