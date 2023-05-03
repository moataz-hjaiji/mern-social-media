import { Types } from 'mongoose';
import Tasks, { tasksModel } from './../Model/tasks';

export default class tasksRepo {
  public static getAllTasks(): Promise<Tasks[]> {
    return tasksModel.find();
  }
  public static async getTask(id: Types.ObjectId): Promise<Tasks|null> {
    return  tasksModel.findById(id);
  }
  public static async updateTask(
    task: Tasks
  ): Promise<Tasks|null> {
    return tasksModel.findByIdAndUpdate(
      { _id: task.id },
      { ...task },
      { new: true }
    );
  }
  public static async deleteTask(id:Types.ObjectId){
     await tasksModel.findByIdAndDelete(id)
  }
}
