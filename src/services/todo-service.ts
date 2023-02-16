import model, { ToDo } from "../models/todo-model";
import { OrderType } from "../types/order-type";

export const todoService = {
  insert: async (toDo: ToDo): Promise<ToDo | void> => {
    return await model.create(toDo);
  },

  listAll: async (
    sortBy?: keyof ToDo,
    order?: OrderType,
    searchString?: string
  ): Promise<ToDo[] | void> => {
    const stages = [];
    if (searchString) {
      stages.unshift({
        $match: {
          $or: [
            { title: { $regex: searchString } },
            { text: { $regex: searchString } },
          ],
        },
      });
    } else {
      stages.unshift({ $match: { title: { $regex: "/*" } } });
    }
    if (sortBy && order) {
      return await model.aggregate(stages).sort({ [sortBy]: order });
    }
    return await model.aggregate(stages);
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
