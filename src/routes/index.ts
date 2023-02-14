import { Router } from "express";
import todoRouter from "../routes/todo/todo-router";

const router = Router();

router.use("/todos", todoRouter);

export default router;
