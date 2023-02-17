import { Router } from "express";
import { todoController } from "./todo-controller";
import { validators } from "../../middleware/validation";
import { fullToDoDTO, partialToDoDTO } from "../todos/dto/todo.dto";
import { idDTO } from "./dto/id.dto";

const todoRouter = Router();

todoRouter.post(
  "/",
  validators.bodyValidation(fullToDoDTO),
  todoController.save
);
todoRouter.get("/", validators.optionalQueryValidation, todoController.getAll);
todoRouter.get(
  "/:id",
  validators.parameterValidation(idDTO),
  todoController.getOne
);
todoRouter.delete(
  "/:id",
  validators.parameterValidation(idDTO),
  todoController.delete
);
todoRouter.put(
  "/:id",
  validators.parameterValidation(idDTO),
  validators.bodyValidation(partialToDoDTO),
  todoController.updateOne
);

export default todoRouter;
