import { Router } from "express";
import { todoController } from "./todo-controller";

const todoRouter = Router();

todoRouter.post("/", todoController.save);
todoRouter.get("/", todoController.getAll);
todoRouter.get("/:_id", todoController.getOne);
todoRouter.delete("/:_id", todoController.delete);
todoRouter.patch("/:_id", todoController.update);

export default todoRouter;
