import { Request, Response } from "express";
import { ToDo } from "../../models/todo-model";
import { insertToDo } from "../../services/todo-service";

export const insertToDoIntoDb = async (
  req: Request<{}, {}, ToDo>,
  res: Response
) => {
  const toDo = req.body;
  const newToDo = await insertToDo(toDo);
  if (newToDo) {
    res.status(200).json(newToDo);
  }
};
