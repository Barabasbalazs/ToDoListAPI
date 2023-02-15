import { Request, Response, NextFunction } from "express";
import { ToDo } from "../../models/todo-model";
import { todoService } from "../../services/todo-service";
import { errors } from "../../utils/errors";

export const todoController = {
  saveToDo: async (
    req: Request<{}, {}, ToDo>,
    res: Response,
    next: NextFunction
  ) => {
    const toDo = req.body;
    try {
      const newToDo = await todoService.insertToDo(toDo);
      if (!newToDo) {
        return next(errors.unknown);
      }
      res.status(201).json(newToDo);
    } catch (e) {
      return next(errors.unknown);
    }
  },

  getAllToDos: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toDoList = await todoService.listAll();
      if (!toDoList) {
        return next(errors.unknown);
      }
      res.status(200).json(toDoList);
    } catch (e) {
      return next(errors.unknown);
    }
  },

  getOneToDo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const toDo = await todoService.findToDoById(req.params._id);
      if (!toDo) {
        return next(errors.notFound("ToDo not found"));
      }
      res.status(200).json(toDo);
    } catch (e) {
      return next(errors.unknown);
    }
  },

  deleteToDo: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleted = await todoService.removeToDo(req.params._id);
      if (!deleted) {
        next(errors.notFound("ToDo not found"));
      }
      res.status(200).json({
        deleted: true,
      });
    } catch (e) {
      return next(errors.unknown);
    }
  },

  updateToDo: async (
    req: Request<{ _id: string }, {}, Partial<ToDo>>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log(req.params._id);
      const toDo = req.body;
      const updated = await todoService.updateToDo(req.params._id, toDo);
      console.log(updated);
      if (!updated) {
        return next(errors.notFound("ToDo not found"));
      }
      res.status(200).json(updated);
    } catch (e) {
      return next(errors.unknown);
    }
  },
};
