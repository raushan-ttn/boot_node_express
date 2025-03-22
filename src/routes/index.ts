import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import path from "path";
import {
  readFileASyncExample,
  readFileSyncExample,
} from "../controllers/readFileController";

const router = Router();

/**
 * @swagger
 * /api/v1/:
 *   get:
 *     summary: homepage response
 *     description: Returns a sample response from the API
 *     tags:
 *       - Home page
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/", (req: Request, res: Response) => {
  const message = {
    message: "Welcome to the BootCamp Express TypeScript API!",
  };
  res.send(message);
});

/**
 * @swagger
 * /api/v1/read-file-sync:
 *   get:
 *     summary: Read text file sync response
 *     description: Returns a sample response from the API
 *     tags:
 *       - Home page
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/read-file-sync", (req: Request, res: Response) => {
  try {
    const fileName = "multilang.txt";
    const filePath = path.join(__dirname, "../../public", fileName); // Adjust path as needed
    const fileContent = readFileSyncExample(filePath);
    res.send(`<pre>${fileContent}</pre>`);
  } catch (error) {
    res.status(500).send("Error reading file: " + error);
  }
});

/**
 * @swagger
 * /api/v1/read-file-async:
 *   get:
 *     summary: Read pdf file async response
 *     description: Returns a sample response from the API
 *     tags:
 *       - Home page
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get("/read-file-async", async (req: Request, res: Response) => {
  try {
    const fileName = "dummy-1.5-MB.pdf";
    const filePath = path.join(__dirname, "../../public", fileName); // Adjust path as needed

    const fileContent = await readFileASyncExample(filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=" + fileName);
    res.send(fileContent);
  } catch (error) {
    res.status(500).send("Error reading file: " + (error as Error).message);
  }
});

export default router;
