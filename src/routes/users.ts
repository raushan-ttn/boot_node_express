import { Router, Request, Response } from "express";
import {
  getAllUsers,
  createUser,
  findAllUsers,
} from "../controllers/userController";

const router = Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Read text file sync response
 *     description: Returns a sample response from the API
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/", async (req: Request, res: Response) => {
  const users = await getAllUsers();
  if (users) {
    res.json({
      status: 200,
      message: "Record fetch successfully.",
      data: users,
    });
  } else {
    res.json({ status: 404, message: "No record found.", data: [] });
  }
});

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the database.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - mail
 *               - password
 *               - confirm_password
 *               - first_name
 *               - last_name
 *               - status
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               mail:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               confirm_password:
 *                 type: string
 *                 example: "securepassword"
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", async (req: Request, res: Response) => {
  const user = await createUser(req.body);
  if (user && user.success) {
    res.json({
      status: 201,
      message: "Record inserted successfully.",
      data: user,
    });
  } else {
    res.json({ status: 404, message: user?.message, data: [] });
  }
});

/**
 * @swagger
 * /api/v1/users/search-user:
 *   get:
 *     summary: AutoComplete search for users
 *     description: Returns a list of users matching the search query.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: false
 *         description: Partial search term for username or email
 *     responses:
 *       200:
 *         description: A list of matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   mail:
 *                     type: string
 *       400:
 *         description: Missing search query
 */
router.get("/search-user", async (req: Request, res: Response) => {
  const params = req.query.query as string;
  console.log(params);
  const user = await findAllUsers(params);
  if (user && user.success) {
    res.json({
      status: 200,
      message: "Record fetched successfully.",
      data: user?.data ?? [],
    });
  } else {
    res.json({ status: 404, message: user?.message, data: [] });
  }
});

export default router;

