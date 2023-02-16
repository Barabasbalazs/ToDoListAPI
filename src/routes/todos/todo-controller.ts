import { Request, Response, NextFunction } from "express";
import todoModel, { ToDo } from "../../models/todo-model";
import { todoService } from "../../services/todo-service";
import { OrderType } from "../../types/order-type";
import { errors } from "../../utils/errors";

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
    req: Request<{}, {}, {}, { sort?: keyof ToDo; order?: OrderType }>,
    res: Response<ToDo[]>,
    next: NextFunction
  ) => {
    try {
      const sortBy = req.query.sort;
      const order = req.query.order;
      const toDoList = await todoService.listAll(sortBy, order);
      if (!toDoList) {
        // console.log("Called here");
        return next(errors.unknown);
      }
      res.status(200).json(toDoList);
    } catch (e) {
      // console.log("Thrown here");
      // console.log(e);
      return next(errors.unknown);
    }
  },

  getOne: async (
    req: Request<{ id: string }>,
    res: Response<ToDo>,
    next: NextFunction
  ) => {
    console.log("One");
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
    req: Request<{ id: string }>,
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
    req: Request<{ id: string }, {}, Partial<ToDo>>,
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
