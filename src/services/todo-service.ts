import model, { ToDo } from "../models/todo-model";

export const insertToDo = async (toDo: ToDo): Promise<ToDo> => {
  return await model.create(toDo);
};

export const listAll = async (): Promise<ToDo[]> => {
  return await model.find();
};
