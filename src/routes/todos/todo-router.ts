import { Router } from "express";
import { saveToDo, getToDos } from "./todo-controller";

const todoRouter = Router();

todoRouter.post("/", saveToDo);
todoRouter.get("/", getToDos);

export default todoRouter;
