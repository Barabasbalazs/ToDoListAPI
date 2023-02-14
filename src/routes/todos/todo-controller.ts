import { Request, Response, NextFunction } from "express";
import { ToDo } from "../../models/todo-model";
import { insertToDo, listAll } from "../../services/todo-service";
import { errors } from "../../utils/errors";

export const saveToDo = async (
  req: Request<{}, {}, ToDo>,
  res: Response,
  next: NextFunction
) => {
  const toDo = req.body;
  try {
    const newToDo = await insertToDo(toDo);
    if (!newToDo) return next(errors.unknown);
    res.status(200).json(newToDo);
  } catch (e) {
    return next(errors.unknown);
  }
};

export const getToDos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const toDoList = await listAll();
    if (!toDoList) return next(errors.unknown);
    res.status(200).json(toDoList);
  } catch (e) {
    return next(errors.notFound);
  }
};
