import { Router } from "express";
import { testFunc } from "./todo-controller";

const todoRouter = Router();

todoRouter.get("/", testFunc);

export default todoRouter;
