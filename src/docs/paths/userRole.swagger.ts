/**
 * @swagger
 * tags:
 *   - name: User Roles
 *     description: APIs for assigning roles to users
 */

/**
 * @swagger
 * /users/{userId}/roles:
 *   post:
 *     summary: Assign roles to a user
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignRoles'
 *
 *     responses:
 *       200:
 *         description: Roles assigned successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Roles assigned successfully
 *               data:
 *                 - id: "550e8400-e29b-41d4-a716-446655440000"
 *                   name: Super Admin
 *                   description: Full system access
 *
 *       400:
 *         description: Validation failed
 *
 *       404:
 *         description: User or Role not found
 */

/**
 * @swagger
 * /users/{userId}/roles:
 *   get:
 *     summary: Get roles assigned to a user
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *
 *     responses:
 *       200:
 *         description: Roles fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Roles fetched successfully
 *               data:
 *                 - id: "550e8400-e29b-41d4-a716-446655440000"
 *                   name: Super Admin
 *                   description: Full system access
 *                 - id: "550e8400-e29b-41d4-a716-446655440001"
 *                   name: Finance Manager
 *                   description: Finance approvals
 *
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /users/{userId}/roles/{roleId}:
 *   delete:
 *     summary: Remove a role from a user
 *     tags: [User Roles]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *
 *     responses:
 *       200:
 *         description: Role removed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Role removed successfully
 *
 *       404:
 *         description: User or Role not found
 */
