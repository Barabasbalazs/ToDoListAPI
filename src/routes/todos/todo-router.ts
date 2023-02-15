import { Router } from "express";
import { todoController } from "./todo-controller";
import { validateToDo } from "../../middleware/validation";

const todoRouter = Router();

todoRouter.post("/", validateToDo.fullValidation, todoController.save);
todoRouter.get("/", todoController.getAll);
todoRouter.get("/:_id", todoController.getOne);
todoRouter.delete("/:_id", todoController.delete);
todoRouter.patch(
  "/:_id",
  validateToDo.partialValidation,
  todoController.update
);

export default todoRouter;
