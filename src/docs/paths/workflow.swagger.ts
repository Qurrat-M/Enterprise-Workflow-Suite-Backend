/**
 * @swagger
 * tags:
 *   name: Workflows
 *   description: Workflow and workflow step management APIs
 */

/**
 * @swagger
 * /workflows:
 *   get:
 *     summary: Get all workflows
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, type, status, entity_type, created_at, updated_at]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Workflows fetched successfully
 *
 *   post:
 *     summary: Create workflow
 *     tags: [Workflows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - entityType
 *             properties:
 *               name:
 *                 type: string
 *                 example: Budget Approval Workflow
 *               description:
 *                 type: string
 *                 example: Standard budget approval workflow
 *               type:
 *                 type: string
 *                 enum: [serial, parallel, mixed]
 *                 example: serial
 *               entityType:
 *                 type: string
 *                 enum: [budget, asset]
 *                 example: budget
 *     responses:
 *       201:
 *         description: Workflow created successfully
 */

/**
 * @swagger
 * /workflows/{id}:
 *   get:
 *     summary: Get workflow by ID
 *     tags: [Workflows]
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
 *         description: Workflow fetched successfully
 *       404:
 *         description: Workflow not found
 *
 *   put:
 *     summary: Update workflow
 *     tags: [Workflows]
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [serial, parallel, mixed]
 *               entityType:
 *                 type: string
 *                 enum: [budget, asset]
 *     responses:
 *       200:
 *         description: Workflow updated successfully
 *
 *   delete:
 *     summary: Delete workflow
 *     tags: [Workflows]
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
 *         description: Workflow deleted successfully
 */

/**
 * @swagger
 * /workflows/{id}/activate:
 *   patch:
 *     summary: Activate workflow
 *     tags: [Workflows]
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
 *         description: Workflow activated successfully
 */

/**
 * @swagger
 * /workflows/{id}/deactivate:
 *   patch:
 *     summary: Deactivate workflow
 *     tags: [Workflows]
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
 *         description: Workflow deactivated successfully
 */

/**
 * @swagger
 * /workflows/{id}/steps:
 *   get:
 *     summary: Get workflow steps
 *     tags: [Workflow Steps]
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
 *         description: Workflow steps fetched successfully
 *
 *   post:
 *     summary: Create workflow step
 *     tags: [Workflow Steps]
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
 *             type: object
 *             required:
 *               - name
 *               - stepOrder
 *               - approverType
 *             properties:
 *               name:
 *                 type: string
 *                 example: Department Head Approval
 *               description:
 *                 type: string
 *                 example: First level budget approval
 *               stepOrder:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               approverType:
 *                 type: string
 *                 enum: [role, user, department_head]
 *                 example: role
 *               approverRoleId:
 *                 type: string
 *                 format: uuid
 *               isRequired:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Workflow step created successfully
 */

/**
 * @swagger
 * /workflows/{id}/steps/{stepId}:
 *   put:
 *     summary: Update workflow step
 *     tags: [Workflow Steps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               stepOrder:
 *                 type: integer
 *               approverType:
 *                 type: string
 *                 enum: [role, user, department_head]
 *               approverRoleId:
 *                 type: string
 *                 format: uuid
 *               isRequired:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Workflow step updated successfully
 *
 *   delete:
 *     summary: Delete workflow step
 *     tags: [Workflow Steps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: path
 *         name: stepId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Workflow step deleted successfully
 */
