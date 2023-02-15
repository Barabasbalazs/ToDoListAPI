import model, { ToDo } from "../models/todo-model";

export const todoService = {
  insertToDo: async (toDo: ToDo): Promise<ToDo | void> => {
    return await model.create(toDo);
  },

  listAll: async (): Promise<ToDo[] | void> => {
    return await model.find();
  },

  findToDoById: async (id: string): Promise<ToDo | null> => {
    return await model.findById(id);
  },

  removeToDo: async (id: string): Promise<ToDo | null> => {
    return await model.findByIdAndDelete(id);
  },

  updateToDo: async (id: string, toDo: Partial<ToDo>): Promise<ToDo | null> => {
    return await model.findOneAndUpdate({ _id: id }, toDo, {
      returnOriginal: false,
    });
  },
};
