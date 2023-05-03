import { Types } from 'mongoose';
import User, { userModel } from '../Model/user';

export default class UserRepo {
  public static async findById(id: Types.ObjectId): Promise<User | null> {
    return await userModel.findById(id);
  }
  public static async findUserTasks(id: Types.ObjectId): Promise<[]> {
    const user = await userModel.findById(id);
    return user.tasks;
  }
  public static async deleleteUser(id: Types.ObjectId): Promise<any> {
    const user = await userModel.findById(id);
    user.deleteAT = new Date();
  }
}
