import { Router } from "express";
import { authenticateUser } from "../middleware/authMiddleware";
import { memberSignIn, memberSignUp } from "../controllers/memberController";
const router = Router();
/**
 * @swagger
 * /api/v1/members/verify-login:
 *   get:
 *     summary: show all members response
 *     description: Returns a sample response from the API
 *     tags:
 *       - Members
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/verify-login", authenticateUser, (req, res) => {
  res.json({ message: "Access granted!", user: req.user });
});
/**
 * @swagger
 * /api/v1/members/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with their credentials and return a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mypassword123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad request, missing or incorrect credentials.
 *       401:
 *         description: Unauthorized, invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post("/login", memberSignIn);

/**
 * @swagger
 * /api/v1/members/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with a hashed password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - confirm_password
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *               confirm_password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 64bffde7352b2a0012c5e27a
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: Bad request (validation error)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post("/register", memberSignUp);
export default router;
