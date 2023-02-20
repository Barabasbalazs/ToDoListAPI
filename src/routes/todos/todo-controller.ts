import { Response, NextFunction } from "express";
import { ToDo } from "../../models/todo-model";
import { todoService } from "../../services/todo-service";
import { OrderType } from "../../@types/order-type";
import { errors } from "../../utils/errors";
import {
  BodyRequest,
  QueryRequest,
  ParamBodyRequest,
  ParamRequest,
} from "../../@types/request-types";

export const todoController = {
  save: async (
    req: BodyRequest<ToDo>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    try {
      const toDo = req.body;
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
    req: QueryRequest<{
      sort?: keyof ToDo;
      order?: OrderType;
      search?: string;
    }>,
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
      return next(errors.unknown);
    }
  },

  getOne: async (
    req: ParamRequest<{ id: string }>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
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
    req: ParamRequest<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
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

  updateOne: async (
    req: ParamBodyRequest<Partial<ToDo>, { id: string }>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
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
