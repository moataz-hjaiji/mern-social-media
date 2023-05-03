import { Schema, Document, model } from 'mongoose';

export default interface User extends Document {
  name: string;
  tasks?: [];
  deleteAT:Date | null,
}

const userSchema = new Schema({
  name: String,
  tasks: { type: Array, default: [] },
  deleteAT: { type: Date, default: null },
});
export const userModel = model<User>('User', userSchema);
