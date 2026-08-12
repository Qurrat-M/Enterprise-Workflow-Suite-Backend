/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Organization Management APIs
 */

/**
 * @swagger
 * /organizations:
 *   get:
 *     summary: Get all organizations
 *     description: Returns a paginated list of organizations with optional search and sorting.
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
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
 *         description: Search by organization name, code, email, city or country
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - code
 *             - city
 *             - country
 *             - status
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
 *         description: Organizations fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Organizations retrieved successfully
 *               data:
 *                 items:
 *                   - id: "550e8400-e29b-41d4-a716-446655440000"
 *                     name: "ABC Technologies"
 *                     code: "ABC-TECH"
 *                     logo_url: "https://example.com/logo.png"
 *                     email: "info@abctech.com"
 *                     phone: "+92-21-12345678"
 *                     website: "https://abctech.com"
 *                     address: "Shahrah-e-Faisal"
 *                     city: "Karachi"
 *                     country: "Pakistan"
 *                     timezone: "Asia/Karachi"
 *                     currency: "PKR"
 *                     status: "ACTIVE"
 *                     created_at: "2026-08-12T12:00:00.000Z"
 *                     updated_at: "2026-08-12T12:00:00.000Z"
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
 * /organizations/{id}:
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
 *         description: Organization fetched successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Organization not found
 */

/**
 * @swagger
 * /organizations:
 *   post:
 *     summary: Create a new organization
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
 *
 *       400:
 *         description: Validation failed
 *
 *       401:
 *         description: Unauthorized
 *
 *       409:
 *         description: Organization code already exists
 */

/**
 * @swagger
 * /organizations/{id}:
 *   put:
 *     summary: Update an organization
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
 *
 *       400:
 *         description: Validation failed
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Organization not found
 *
 *       409:
 *         description: Organization code already exists
 */

/**
 * @swagger
 * /organizations/{id}/status:
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
 *
 *       400:
 *         description: Validation failed
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Organization not found
 */

/**
 * @swagger
 * /organizations/{id}:
 *   delete:
 *     summary: Delete an organization
 *     description: Deactivates an organization by setting its status to INACTIVE.
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
 *         description: Organization deactivated successfully
 *
 *       401:
 *         description: Unauthorized
 *
 *       404:
 *         description: Organization not found
 */
