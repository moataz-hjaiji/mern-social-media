import Tasks from '../Model/tasks';
import User, { userModel } from '../Model/user';
interface createUser {
  name:String,
  email:String,
  password?:String,
}
export default class UserRepo {
  public static async findById(id: String): Promise<User | null> {
    return await userModel.findById(id);
  }
  public static async createUser(user:createUser){
    const newUser = await  userModel.create({
      ...user
    })
    return newUser
  }
  public static async findByObj(obj: {
    email:String,

  }): Promise<User | null> {
    return await userModel.findOne(obj);
  }
  public static async findUserTasks(id: String): Promise<Tasks[]|undefined> {
    const user = await userModel.findById(id);
    return user?.tasks;
  }
  public static async deleleteUser(id: String): Promise<void> {
    const user = await userModel.findById(id);
    user!.deleteAT = new Date();
  }
}
