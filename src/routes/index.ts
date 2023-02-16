import { Router } from "express";
import todoRouter from "./todos/todo-router";
import authRouter from "./auth/auth-router";

const router = Router();

router.use("/todos", todoRouter);
router.use("/auth", authRouter);

export default router;
