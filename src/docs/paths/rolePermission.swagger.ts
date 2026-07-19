/**
 * @swagger
 * tags:
 *   - name: Role Permissions
 *     description: APIs for assigning permissions to roles
 */

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   post:
 *     summary: Assign permissions to a role
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignPermissions'
 *     responses:
 *       200:
 *         description: Permissions assigned successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Role or permission not found
 */

/**
 * @swagger
 * /roles/{roleId}/permissions:
 *   get:
 *     summary: Get permissions assigned to a role
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RolePermission'
 *       404:
 *         description: Role not found
 */

/**
 * @swagger
 * /roles/{roleId}/permissions/{permissionId}:
 *   delete:
 *     summary: Remove a permission from a role
 *     tags: [Role Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Role ID
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission removed successfully
 *       404:
 *         description: Role or permission not found
 */
