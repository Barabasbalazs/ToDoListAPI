import { Request, Response, NextFunction } from "express";
import { ToDo } from "../../models/todo-model";
import { todoService } from "../../services/todo-service";
import { OrderType } from "../../types/order-type";
import { errors } from "../../utils/errors";
import { Query, ParamsDictionary } from "express-serve-static-core";

interface ToDoQuery extends Query {
  sort?: keyof ToDo;
  order?: OrderType;
  search?: string;
}

interface ToDoParams extends ParamsDictionary {
  id: string;
}

export const todoController = {
  save: async (
    req: Request<{}, {}, ToDo>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    const toDo = req.body;
    try {
      const newToDo = await todoService.insert(toDo);
      if (!newToDo) {
        return next(errors.unknown);
      }
      res.status(201).json(newToDo);
    } catch (e) {
      return next(errors.unknown);
    }
  },

  getAll: async (
    req: Request<{}, {}, {}, ToDoQuery>,
    res: Response<ToDo[]>,
    next: NextFunction
  ) => {
    try {
      const { sort, order, search } = req.query;
      const toDoList = await todoService.listAll(sort, order, search);
      if (!toDoList) {
        return next(errors.unknown);
      }
      res.status(200).json(toDoList);
    } catch (e) {
      console.log(e);
      return next(errors.unknown);
    }
  },

  getOne: async (
    req: Request<ToDoParams>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      if (!id) {
        return next(errors.invalidParameter("No id given for ToDo"));
      }
      const toDo = await todoService.findById(id);
      if (!toDo) {
        return next(errors.notFound("ToDo not found"));
      }
      res.status(200).json(toDo);
    } catch (e) {
      return next(errors.unknown);
    }
  },

  delete: async (
    req: Request<ToDoParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      if (!id) {
        return next(errors.invalidParameter("No id given for ToDo"));
      }
      const deleted = await todoService.remove(id);
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

  update: async (
    req: Request<ToDoParams, {}, Partial<ToDo>>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      if (!id) {
        return next(errors.invalidParameter("No id given for ToDo"));
      }
      const toDo = req.body;
      const updated = await todoService.update(id, toDo);
      if (!updated) {
        return next(errors.notFound("ToDo not found"));
      }
      res.status(200).json(updated);
    } catch (e) {
      return next(errors.unknown);
    }
  },
};
