import { PipelineStage } from "mongoose";
import model, { ToDo } from "../models/todo-model";
import { OrderType } from "../@types/order-type";
import { Types } from "mongoose";

export const todoService = {
  insert: async (toDo: ToDo): Promise<ToDo | void> => {
    return await model.create(toDo);
  },

  listAll: async (
    userId: string,
    sortBy?: keyof ToDo,
    order?: OrderType,
    searchString?: string
  ): Promise<ToDo[] | void> => {
    const stages: PipelineStage[] = [];
    const orderNumber = order === "asc" ? 1 : -1;
    const match = {
      ...{ userId: new Types.ObjectId(userId) },
      ...(searchString && {
        $or: [
          { title: { $regex: searchString, $options: "i" } },
          { text: { $regex: searchString, $options: "i" } },
        ],
      }),
    };

    stages.push({ $match: match });

    if (sortBy && orderNumber) {
      stages.push({
        $sort: {
          [sortBy]: orderNumber,
        },
      });
    } else {
      stages.push({
        $sort: {
          priority: -1,
        },
      });
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
