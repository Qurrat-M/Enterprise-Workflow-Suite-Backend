/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: Asset management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Asset:
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
 *           example: Dell Latitude Laptop
 *         asset_code:
 *           type: string
 *           example: AST-IT-001
 *         category:
 *           type: string
 *           nullable: true
 *           example: Laptop
 *         description:
 *           type: string
 *           nullable: true
 *           example: Dell Latitude 5440 assigned to IT department
 *         purchase_date:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: 2026-08-31
 *         purchase_cost:
 *           type: number
 *           format: double
 *           nullable: true
 *           example: 250000.00
 *         status:
 *           type: string
 *           enum:
 *             - available
 *             - assigned
 *             - returned
 *             - transferred
 *             - disposed
 *           example: available
 *         assigned_to:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateAsset:
 *       type: object
 *       required:
 *         - name
 *         - asset_code
 *       properties:
 *         name:
 *           type: string
 *           example: Dell Latitude Laptop
 *         asset_code:
 *           type: string
 *           example: AST-IT-001
 *         category:
 *           type: string
 *           example: Laptop
 *         description:
 *           type: string
 *           example: Dell Latitude 5440
 *         purchase_date:
 *           type: string
 *           format: date
 *           example: 2026-08-31
 *         purchase_cost:
 *           type: number
 *           format: double
 *           minimum: 0
 *           example: 250000.00
 *
 *     UpdateAsset:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Dell Latitude 5440 Laptop
 *         asset_code:
 *           type: string
 *           example: AST-IT-001
 *         category:
 *           type: string
 *           example: Laptop
 *         description:
 *           type: string
 *           example: Updated asset description
 *         purchase_date:
 *           type: string
 *           format: date
 *           example: 2026-08-31
 *         purchase_cost:
 *           type: number
 *           format: double
 *           minimum: 0
 *           example: 260000.00
 *
 *     AssignAsset:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           example: 5ddb15c5-76fc-42bd-bbcf-ecf59d5a356e
 *
 *     TransferAsset:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           example: 5ddb15c5-76fc-42bd-bbcf-ecf59d5a356e
 */

/**
 * @swagger
 * /assets:
 *   post:
 *     summary: Create an asset
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAsset'
 *     responses:
 *       201:
 *         description: Asset created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.create permission
 *
 *   get:
 *     summary: Get all assets
 *     tags: [Assets]
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
 *         example: Laptop
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - asset_code
 *             - category
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
 *         description: Assets fetched successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.read permission
 */

/**
 * @swagger
 * /assets/{id}:
 *   get:
 *     summary: Get asset by ID
 *     tags: [Assets]
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
 *         description: Asset fetched successfully
 *       400:
 *         description: Invalid asset UUID
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.read permission
 *       404:
 *         description: Asset not found
 *
 *   put:
 *     summary: Update asset
 *     tags: [Assets]
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
 *             $ref: '#/components/schemas/UpdateAsset'
 *     responses:
 *       200:
 *         description: Asset updated successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.update permission
 *       404:
 *         description: Asset not found
 *
 *   delete:
 *     summary: Delete asset
 *     tags: [Assets]
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
 *         description: Asset deleted successfully
 *       400:
 *         description: Asset cannot be deleted
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.delete permission
 *       404:
 *         description: Asset not found
 */

/**
 * @swagger
 * /assets/{id}/assign:
 *   patch:
 *     summary: Assign an asset
 *     description: Assigns an available asset to a user.
 *     tags: [Assets]
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
 *             $ref: '#/components/schemas/AssignAsset'
 *     responses:
 *       200:
 *         description: Asset assigned successfully
 *       400:
 *         description: Only available assets can be assigned
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.assign permission
 *       404:
 *         description: Asset not found
 */

/**
 * @swagger
 * /assets/{id}/return:
 *   patch:
 *     summary: Return an asset
 *     description: Returns an assigned asset and makes it available again.
 *     tags: [Assets]
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
 *         description: Asset returned successfully
 *       400:
 *         description: Only assigned assets can be returned
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.return permission
 *       404:
 *         description: Asset not found
 */

/**
 * @swagger
 * /assets/{id}/transfer:
 *   patch:
 *     summary: Transfer an asset
 *     description: Transfers an assigned asset to another user.
 *     tags: [Assets]
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
 *             $ref: '#/components/schemas/TransferAsset'
 *     responses:
 *       200:
 *         description: Asset transferred successfully
 *       400:
 *         description: Only assigned assets can be transferred
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.transfer permission
 *       404:
 *         description: Asset not found
 */

/**
 * @swagger
 * /assets/{id}/dispose:
 *   patch:
 *     summary: Dispose an asset
 *     description: Marks an asset as disposed.
 *     tags: [Assets]
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
 *         description: Asset disposed successfully
 *       400:
 *         description: Asset is already disposed
 *       401:
 *         description: Authentication required
 *       403:
 *         description: User does not have asset.dispose permission
 *       404:
 *         description: Asset not found
 */
