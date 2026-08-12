/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: ABC Technologies
 *         code:
 *           type: string
 *           example: ABC-TECH
 *         logo_url:
 *           type: string
 *           nullable: true
 *           example: https://example.com/logo.png
 *         email:
 *           type: string
 *           nullable: true
 *           example: admin@abctech.com
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "+923001234567"
 *         website:
 *           type: string
 *           nullable: true
 *           example: https://abctech.com
 *         address:
 *           type: string
 *           nullable: true
 *           example: Main Shahrah
 *         city:
 *           type: string
 *           nullable: true
 *           example: Karachi
 *         country:
 *           type: string
 *           nullable: true
 *           example: Pakistan
 *         timezone:
 *           type: string
 *           example: Asia/Karachi
 *         currency:
 *           type: string
 *           example: PKR
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
 *     CreateOrganization:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         name:
 *           type: string
 *           example: ABC Technologies
 *         code:
 *           type: string
 *           example: ABC-TECH
 *         logo_url:
 *           type: string
 *           example: https://example.com/logo.png
 *         email:
 *           type: string
 *           example: admin@abctech.com
 *         phone:
 *           type: string
 *           example: "+923001234567"
 *         website:
 *           type: string
 *           example: https://abctech.com
 *         address:
 *           type: string
 *           example: Main Shahrah
 *         city:
 *           type: string
 *           example: Karachi
 *         country:
 *           type: string
 *           example: Pakistan
 *         timezone:
 *           type: string
 *           example: Asia/Karachi
 *         currency:
 *           type: string
 *           example: PKR
 *
 *     UpdateOrganization:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: ABC Technologies Pvt Ltd
 *         code:
 *           type: string
 *           example: ABC-TECH
 *         logo_url:
 *           type: string
 *           nullable: true
 *         email:
 *           type: string
 *           nullable: true
 *         phone:
 *           type: string
 *           nullable: true
 *         website:
 *           type: string
 *           nullable: true
 *         address:
 *           type: string
 *           nullable: true
 *         city:
 *           type: string
 *           nullable: true
 *         country:
 *           type: string
 *           nullable: true
 *         timezone:
 *           type: string
 *         currency:
 *           type: string
 *
 *     UpdateOrganizationStatus:
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
 * /api/v1/organizations:
 *   post:
 *     summary: Create an organization
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrganization'
 *     responses:
 *       201:
 *         description: Organization created successfully
 *       409:
 *         description: Organization code already exists
 *       422:
 *         description: Validation error
 *
 *   get:
 *     summary: Get all organizations
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizations retrieved successfully
 */

/**
 * @swagger
 * /api/v1/organizations/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags: [Organizations]
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
 *         description: Organization retrieved successfully
 *       404:
 *         description: Organization not found
 *
 *   put:
 *     summary: Update organization
 *     tags: [Organizations]
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
 *             $ref: '#/components/schemas/UpdateOrganization'
 *     responses:
 *       200:
 *         description: Organization updated successfully
 *       404:
 *         description: Organization not found
 *       409:
 *         description: Organization code already exists
 *
 *   delete:
 *     summary: Delete organization
 *     tags: [Organizations]
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
 *         description: Organization deleted successfully
 *       404:
 *         description: Organization not found
 */

/**
 * @swagger
 * /api/v1/organizations/{id}/status:
 *   patch:
 *     summary: Update organization status
 *     tags: [Organizations]
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
 *             $ref: '#/components/schemas/UpdateOrganizationStatus'
 *     responses:
 *       200:
 *         description: Organization status updated successfully
 *       404:
 *         description: Organization not found
 */
