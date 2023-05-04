import { Schema, Document, model } from 'mongoose';
import comment from './comment';

export default interface Tasks extends Document {
  title: string;
  description: string;
  comments?: comment[];
  madeById: string;
  sharedWith?:String[]
}
const tasksSchema = new Schema(
  {
    title: String,
    description: String,
    comments: Array,
    madeById: String,
    sharedWith:Array,
  },
  { timestamps: true }
);
export const tasksModel = model<Tasks>('tasks', tasksSchema);
