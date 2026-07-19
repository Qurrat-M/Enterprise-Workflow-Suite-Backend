/**
 * @swagger
 * components:
 *   schemas:
 *
 *     AssignRoles:
 *       type: object
 *       required:
 *         - roleIds
 *       properties:
 *         roleIds:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *           example:
 *             - "550e8400-e29b-41d4-a716-446655440000"
 *             - "550e8400-e29b-41d4-a716-446655440001"
 *
 *     UserRole:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Super Admin
 *         description:
 *           type: string
 *           example: Full system access
 *         created_at:
 *           type: string
 *           format: date-time
 */
