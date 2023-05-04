import { Schema, Document, model } from 'mongoose';
import Tasks from './tasks';

export default interface User extends Document {
  name: string;
  email: String;
  password: String;
  tasks?: Tasks[];
  deleteAT: Date | null;
}

const userSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: String,
  tasks: { type: Array, default: [] },
  deleteAT: { type: Date, default: null },
});
export const userModel = model<User>('User', userSchema);
