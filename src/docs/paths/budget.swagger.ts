/**
 * @swagger
 * tags:
 *   name: Budgets
 *   description: Budget management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Budget:
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
 *           example: Annual IT Budget
 *         amount:
 *           type: number
 *           format: double
 *           example: 500000.00
 *         status:
 *           type: string
 *           enum:
 *             - draft
 *             - pending
 *             - approved
 *             - rejected
 *             - closed
 *           example: draft
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateBudget:
 *       type: object
 *       required:
 *         - name
 *         - amount
 *       properties:
 *         name:
 *           type: string
 *           example: Annual IT Budget
 *         amount:
 *           type: number
 *           format: double
 *           minimum: 0
 *           example: 500000.00
 *
 *     UpdateBudget:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Updated IT Budget
 *         amount:
 *           type: number
 *           format: double
 *           minimum: 0
 *           example: 600000.00
 */

/**
 * @swagger
 * /budgets:
 *   post:
 *     summary: Create a budget
 *     tags: [Budgets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBudget'
 *     responses:
 *       201:
 *         description: Budget created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.create permission
 *
 *   get:
 *     summary: Get all budgets
 *     tags: [Budgets]
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
 *         example: IT
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - amount
 *             - status
 *             - created_at
 *             - updated_at
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
 *         description: Budgets fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.read permission
 */

/**
 * @swagger
 * /budgets/{id}:
 *   get:
 *     summary: Get budget by ID
 *     tags: [Budgets]
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
 *         description: Budget fetched successfully
 *       400:
 *         description: Invalid budget UUID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.read permission
 *       404:
 *         description: Budget not found
 *
 *   put:
 *     summary: Update budget
 *     tags: [Budgets]
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
 *             $ref: '#/components/schemas/UpdateBudget'
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *       400:
 *         description: Validation failed or budget cannot be updated in its current status
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.update permission
 *       404:
 *         description: Budget not found
 *
 *   delete:
 *     summary: Delete budget
 *     tags: [Budgets]
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
 *         description: Budget deleted successfully
 *       400:
 *         description: Invalid budget UUID or budget cannot be deleted in its current status
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.delete permission
 *       404:
 *         description: Budget not found
 */

/**
 * @swagger
 * /budgets/{id}/submit:
 *   patch:
 *     summary: Submit a budget
 *     description: Changes a budget from draft to pending.
 *     tags: [Budgets]
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
 *         description: Budget submitted successfully
 *       400:
 *         description: Only draft budgets can be submitted
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.submit permission
 *       404:
 *         description: Budget not found
 */

/**
 * @swagger
 * /budgets/{id}/approve:
 *   patch:
 *     summary: Approve a budget
 *     description: Changes a budget from pending to approved.
 *     tags: [Budgets]
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
 *         description: Budget approved successfully
 *       400:
 *         description: Only pending budgets can be approved
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.approve permission
 *       404:
 *         description: Budget not found
 */

/**
 * @swagger
 * /budgets/{id}/reject:
 *   patch:
 *     summary: Reject a budget
 *     description: Changes a budget from pending to rejected.
 *     tags: [Budgets]
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
 *         description: Budget rejected successfully
 *       400:
 *         description: Only pending budgets can be rejected
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.reject permission
 *       404:
 *         description: Budget not found
 */

/**
 * @swagger
 * /budgets/{id}/return:
 *   patch:
 *     summary: Return a budget
 *     description: Changes a budget from rejected back to pending.
 *     tags: [Budgets]
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
 *         description: Budget returned successfully
 *       400:
 *         description: Only rejected budgets can be returned
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have budget.return permission
 *       404:
 *         description: Budget not found
 */
