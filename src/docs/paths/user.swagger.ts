/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

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
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *   delete:
 *     summary: Deactivate a user
 *     tags: [Users]
 * /users/{id}/status:
 *   patch:
 *     summary: Update user status
 *     tags: [Users]
 * /users/{id}/roles:
 *   patch:
 *     summary: Replace user roles
 *     tags: [Users]
 */
