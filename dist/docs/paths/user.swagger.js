"use strict";
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: string, format: uuid }
 *         organization_id: { type: string, format: uuid }
 *         name: { type: string }
 *         email: { type: string, format: email }
 *         status: { type: string, enum: [ACTIVE, INACTIVE] }
 *         created_at: { type: string, format: date-time }
 *         updated_at: { type: string, format: date-time }
 *     CreateUser:
 *       required: [organization_id, name, email, password]
 *       properties:
 *         organization_id: { type: string, format: uuid }
 *         name: { type: string }
 *         email: { type: string, format: email }
 *         password: { type: string, format: password }
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200: { description: Users retrieved successfully }
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/CreateUser' }
 *     responses:
 *       201: { description: User created successfully }
 */
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *   delete:
 *     summary: Deactivate a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User deactivated successfully
 *       404:
 *         description: User not found
 * /users/{id}/status:
 *   patch:
 *     summary: Update user status
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       404:
 *         description: User not found
 * /users/{id}/roles:
 *   patch:
 *     summary: Replace user roles
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: User roles replaced successfully
 *       404:
 *         description: User not found
 */
