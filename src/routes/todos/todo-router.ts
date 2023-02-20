import { Router } from "express";
import { todoController } from "./todo-controller";
import { validators } from "../../middleware/validation";
import { fullToDoDTO, partialToDoDTO } from "../todos/dto/todo.dto";
import { idDTO } from "./dto/id.dto";
import { authorization } from "../../middleware/authorization";

const todoRouter = Router();

todoRouter.post(
  "/",
  authorization.authenticate,
  validators.bodyValidation(fullToDoDTO),
  todoController.save
);
todoRouter.get(
  "/",
  authorization.authenticate,
  validators.optionalQueryValidation,
  todoController.getAll
);
todoRouter.get(
  "/:id",
  authorization.authenticate,
  validators.parameterValidation(idDTO),
  todoController.getOne
);
todoRouter.delete(
  "/:id",
  authorization.authenticate,
  validators.parameterValidation(idDTO),
  todoController.delete
);
todoRouter.put(
  "/:id",
  authorization.authenticate,
  validators.parameterValidation(idDTO),
  validators.bodyValidation(partialToDoDTO),
  todoController.updateOne
);

export default todoRouter;
