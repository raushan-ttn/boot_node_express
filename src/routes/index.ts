import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import path from "path";
import {
  readFileASyncExample,
  readFileSyncExample,
} from "../controllers/readFileController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express TypeScript API!");
});

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
