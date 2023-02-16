import model, { ToDo } from "../models/todo-model";

export const todoService = {
  insert: async (toDo: ToDo): Promise<ToDo | void> => {
    return await model.create(toDo);
  },

  listAll: async (): Promise<ToDo[] | void> => {
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
