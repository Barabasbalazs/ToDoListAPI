import { Router } from "express";
import { insertToDoIntoDb } from "./todo-controller";

const todoRouter = Router();

todoRouter.post("/", insertToDoIntoDb);

export default todoRouter;
