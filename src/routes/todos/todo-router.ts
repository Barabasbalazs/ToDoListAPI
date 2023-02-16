import { Router } from "express";
import { todoController } from "./todo-controller";
import { validateToDo } from "../../middleware/validation";

const todoRouter = Router();

todoRouter.post("/", validateToDo.fullValidation, todoController.save);
todoRouter.get("/", validateToDo.queryValidation, todoController.getAll);
todoRouter.get("/:id", todoController.getOne);
todoRouter.delete("/:id", todoController.delete);
todoRouter.patch("/:id", validateToDo.partialValidation, todoController.update);

export default todoRouter;
