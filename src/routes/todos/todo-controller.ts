import { Request, Response } from "express";
import { ToDo } from "../../models/todo-model";
import { insertToDo, listAll } from "../../services/todo-service";

export const saveToDo = async (req: Request<{}, {}, ToDo>, res: Response) => {
  const toDo = req.body;
  const newToDo = await insertToDo(toDo);
  if (newToDo) {
    res.status(200).json(newToDo);
  }
};

export const getToDos = async (req: Request, res: Response) => {
  const toDoList = await listAll();
  if (toDoList) {
    res.status(200).json(toDoList);
  }
};
