import { Router } from "express";
import {
  getAllStudents,
  createStudent,
  updateStudentsInfo,
} from "../controllers/studentController";

const router = Router();
/**
 * @swagger
 * /api/v1/students:
 *   get:
 *     summary: show all students response
 *     description: Returns a sample response from the API
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/", getAllStudents);

/**
 * @swagger
 * /api/v1/students:
 *   post:
 *     summary: Create a new Student
 *     description: Adds a new Students to the database.
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - phone
 *               - date_of_birth
 *               - gender
 *               - address
 *               - enrollment_date
 *               - status
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "john"
 *               last_name:
 *                 type: string
 *                 example: "doe"
 *               email:
 *                 type: string
 *                 example: "securepassword@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "9990016321"
 *               date_of_birth:
 *                 type: string
 *                 example: "2025-03-23T15:30:00Z"
 *               gender:
 *                 type: string
 *                 example: "Male"
 *               address:
 *                 type: string
 *                 example: "Doe asd da"
 *               enrollment_date:
 *                 type: string
 *                 example: "2025-03-23T15:30:00Z"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createStudent);
/**
 * @swagger
 * /api/v1/students/{id}:
 *   patch:
 *     summary: Update a Student
 *     description: Updates an existing Student in the database.
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "securepassword@gmail.com"
 *               phone:
 *                 type: string
 *                 example: "9990016321"
 *               date_of_birth:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-23T15:30:00Z"
 *               gender:
 *                 type: string
 *                 enum: ["Male", "Female", "Other"]
 *                 example: "Male"
 *               address:
 *                 type: string
 *                 example: "123 Main St, NY"
 *               enrollment_date:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-23T15:30:00Z"
 *               status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */

router.patch("/:id", updateStudentsInfo);

export default router;
