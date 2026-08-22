/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI Analysis APIs
 */

/**
 * @swagger
 * /ai/analyze:
 *   post:
 *     summary: Analyze a question using AI
 *     description: Sends a natural language question to the AI service for analysis.
 *     tags:
 *       - AI
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 example: What departments exist in my organization?
 *     responses:
 *       200:
 *         description: AI analysis completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: AI analysis endpoint is working
 *                 question:
 *                   type: string
 *                   example: What departments exist in my organization?
 *       400:
 *         description: Question is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Question is required
 *       503:
 *         description: AI service is unavailable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: AI service is currently unavailable
 */

export {};
