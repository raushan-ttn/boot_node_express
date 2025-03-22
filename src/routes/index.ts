import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express TypeScript API!");
});

export default router;
