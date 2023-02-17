import { Router } from "express";
import { todoController } from "./todo-controller";
import { validators } from "../../middleware/validation";
import { fullToDoDTO, partialToDoDTO } from "../todos/dto/todo.dto";

const todoRouter = Router();

todoRouter.post(
  "/",
  validators.toDoValidation(fullToDoDTO),
  todoController.save
);
todoRouter.get("/", validators.queryValidation, todoController.getAll);
todoRouter.get("/:id", todoController.getOne);
todoRouter.delete("/:id", todoController.delete);
todoRouter.patch(
  "/:id",
  validators.toDoValidation(partialToDoDTO),
  todoController.update
);

export default todoRouter;
