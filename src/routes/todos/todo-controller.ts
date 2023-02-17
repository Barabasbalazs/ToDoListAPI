import { Request, Response, NextFunction, query } from "express";
import { ToDo } from "../../models/todo-model";
import { todoService } from "../../services/todo-service";
import { OrderType } from "../../types/order-type";
import { errors } from "../../utils/errors";

interface QueryRequest<T extends { [queryParam: string]: string }>
  extends Request {
  query: T;
}
interface BodyRequest<T> extends Request {
  body: T;
}
interface ParamRequest<
  T extends { [param: string]: string; [captureGroup: number]: string }
> extends Request {
  params: T;
}
interface ParamBodyRequest<
  U,
  T extends { [param: string]: string; [captureGroup: number]: string }
> extends Request {
  params: T;
  body: U;
}

export const todoController = {
  save: async (
    req: BodyRequest<ToDo>,
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
      console.log(e);
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
    req: ParamRequest<{ id: string }>,
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
    req: ParamBodyRequest<Partial<ToDo>, { id: string }>,
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
