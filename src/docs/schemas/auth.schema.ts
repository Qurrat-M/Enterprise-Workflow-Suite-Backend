/**
 * @swagger
 * components:
 *   schemas:
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - password
 *       properties:
 *         firstName:
 *           type: string
 *           example: Qurrat
 *
 *         lastName:
 *           type: string
 *           example: Ain
 *
 *         email:
 *           type: string
 *           example: qurrat@example.com
 *
 *         password:
 *           type: string
 *           example: Password123
 *
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: qurrat@example.com
 *
 *         password:
 *           type: string
 *           example: Password123
 *
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 550e8400-e29b-41d4-a716-446655440000
 *
 *         first_name:
 *           type: string
 *           example: Qurrat
 *
 *         last_name:
 *           type: string
 *           example: Ain
 *
 *         email:
 *           type: string
 *           example: qurrat@example.com
 *
 *         phone:
 *           type: string
 *           nullable: true
 *           example: "03001234567"
 *
 *         profile_image:
 *           type: string
 *           nullable: true
 *           example: https://example.com/profile.jpg
 *
 *         is_active:
 *           type: boolean
 *           example: true
 *
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *
 *         message:
 *           type: string
 *           example: User registered successfully
 *
 *         data:
 *           $ref: '#/components/schemas/User'
 *
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *
 *         message:
 *           type: string
 *           example: Login successful
 *
 *         data:
 *           type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *
 *             user:
 *               $ref: '#/components/schemas/User'
 *
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *
 *         message:
 *           type: string
 *           example: Invalid email or password
 */
