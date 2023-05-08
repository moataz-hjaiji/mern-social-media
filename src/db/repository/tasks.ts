import { Types } from 'mongoose';
import comment from '../Model/comment';
import Tasks, { tasksModel } from './../Model/tasks';

export default class tasksRepo {
  public static async getAllTasks(): Promise<Tasks[]> {
    return await tasksModel.find();
  }
  public static async getTask(id: String): Promise<Tasks | null> {
    return tasksModel.findById(id);
  }
  public static async createTask(task: Tasks) {
    const newTask = await tasksModel.create(task);
    return newTask;
  }
  public static async updateTask(
    id: String,
    task: Partial<Tasks>
  ): Promise<Tasks | null> {
    return tasksModel.findByIdAndUpdate(
      { _id: id },
      { ...task },
      { new: true }
    );
  }
  public static async deleteTask(id: String) {
    await tasksModel.findByIdAndDelete(id);
  }
  public static async getAllCommentsTask(
    id: String
  ): Promise<comment[] | undefined> {
    const task = await this.getTask(id);
    return task?.comments;
  }
  public static async getTaksSharedWith(id: string): Promise<Tasks[] | null> {
    const tasks = await tasksModel.find({ sharedWith: { $in: [id] } });
    console.log({ task: tasks });
    return tasks;
  }
}
