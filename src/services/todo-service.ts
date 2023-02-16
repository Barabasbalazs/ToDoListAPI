import model, { ToDo } from "../models/todo-model";
import { OrderType } from "../types/order-type";

export const todoService = {
  insert: async (toDo: ToDo): Promise<ToDo | void> => {
    return await model.create(toDo);
  },

  listAll: async (
    sortBy?: keyof ToDo,
    order?: OrderType
  ): Promise<ToDo[] | void> => {
    if (sortBy && order) {
      return await model.find().sort({ [sortBy]: order });
    }
    return await model.find();
  },

  findById: async (id: string): Promise<ToDo | null> => {
    return await model.findById(id);
  },

  remove: async (id: string): Promise<ToDo | null> => {
    return await model.findByIdAndDelete(id);
  },

  update: async (id: string, toDo: Partial<ToDo>): Promise<ToDo | null> => {
    return await model.findOneAndUpdate({ _id: id }, toDo, {
      new: true,
    });
  },
};
