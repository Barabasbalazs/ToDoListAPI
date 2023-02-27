import { Router } from "express";
import todoRouter from "./todos/todo-router";
import authRouter from "./auth/auth-router";
import { authorization } from "../middleware/authorization";

const router = Router();

router.use("/todos", authorization.authenticate, todoRouter);
router.use("/auth", authRouter);

export default router;
