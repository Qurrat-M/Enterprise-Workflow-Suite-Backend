/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission Management APIs
 */

/**
 * @swagger
 * /permissions:
 *   get:
 *     summary: Get all permissions
 *     description: Returns a paginated list of permissions with optional search and sorting.
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by module, action, display name or description
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - module
 *             - action
 *             - display_name
 *             - created_at
 *         description: Field to sort by
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Permissions fetched successfully
 *               data:
 *                 items:
 *                   - id: "550e8400-e29b-41d4-a716-446655440000"
 *                     module: Budget
 *                     action: Create
 *                     name: budget.create
 *                     display_name: Create Budget
 *                     description: Allows users to create budgets
 *                     created_at: "2026-07-19T12:00:00.000Z"
 *                 pagination:
 *                   page: 1
 *                   limit: 10
 *                   totalRecords: 25
 *                   totalPages: 3
 *
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Permission fetched successfully
 *       404:
 *         description: Permission not found
 */

/**
 * @swagger
 * /permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePermission'
 *     responses:
 *       201:
 *         description: Permission created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Permission already exists
 */

/**
 * @swagger
 * /permissions/{id}:
 *   put:
 *     summary: Update a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePermission'
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       404:
 *         description: Permission not found
 */

/**
 * @swagger
 * /permissions/{id}:
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 */
