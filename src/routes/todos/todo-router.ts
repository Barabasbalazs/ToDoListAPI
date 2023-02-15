import { Router } from "express";
import { todoController } from "./todo-controller";

const todoRouter = Router();

todoRouter.post("/", todoController.saveToDo);
todoRouter.get("/", todoController.getAllToDos);
todoRouter.get("/:_id", todoController.getOneToDo);
todoRouter.delete("/:_id", todoController.deleteToDo);
todoRouter.patch("/:_id", todoController.updateToDo);

export default todoRouter;
