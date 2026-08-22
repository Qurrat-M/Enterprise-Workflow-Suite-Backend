/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Department:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         organization_id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: Finance
 *         code:
 *           type: string
 *           example: FIN
 *         description:
 *           type: string
 *           nullable: true
 *           example: Finance and accounting department
 *         status:
 *           type: string
 *           enum:
 *             - ACTIVE
 *             - INACTIVE
 *           example: ACTIVE
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateDepartment:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         name:
 *           type: string
 *           example: Finance
 *         code:
 *           type: string
 *           example: FIN
 *         description:
 *           type: string
 *           nullable: true
 *           example: Finance and accounting department
 *
 *     UpdateDepartment:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Finance & Accounts
 *         code:
 *           type: string
 *           example: FIN-ACC
 *         description:
 *           type: string
 *           nullable: true
 *           example: Finance and accounting department
 *
 *     UpdateDepartmentStatus:
 *       type: object
 *       required:
 *         - status
 *       properties:
 *         status:
 *           type: string
 *           enum:
 *             - ACTIVE
 *             - INACTIVE
 *           example: ACTIVE
 */

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Create a department
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartment'
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation failed
 *       403:
 *         description: User does not have department.create permission
 *       409:
 *         description: Department code already exists
 *
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         example: 10
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: finance
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - code
 *             - status
 *             - created_at
 *         example: created_at
 *
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *         example: desc
 *
 *     responses:
 *       200:
 *         description: Departments retrieved successfully
 *       403:
 *         description: User does not have department.read permission
 */

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
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
 *         description: Department retrieved successfully
 *       400:
 *         description: Invalid department UUID
 *       403:
 *         description: User does not have department.read permission
 *       404:
 *         description: Department not found
 *
 *   put:
 *     summary: Update department
 *     tags: [Departments]
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
 *             $ref: '#/components/schemas/UpdateDepartment'
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Validation failed
 *       403:
 *         description: User does not have department.update permission
 *       404:
 *         description: Department not found
 *       409:
 *         description: Department code already exists
 *
 *   delete:
 *     summary: Delete department
 *     tags: [Departments]
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
 *         description: Department deleted successfully
 *       400:
 *         description: Invalid department UUID
 *       403:
 *         description: User does not have department.delete permission
 *       404:
 *         description: Department not found
 */

/**
 * @swagger
 * /departments/{id}/status:
 *   patch:
 *     summary: Update department status
 *     tags: [Departments]
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
 *             $ref: '#/components/schemas/UpdateDepartmentStatus'
 *     responses:
 *       200:
 *         description: Department status updated successfully
 *       400:
 *         description: Invalid UUID or invalid status
 *       403:
 *         description: User does not have department.status.update permission
 *       404:
 *         description: Department not found
 */
