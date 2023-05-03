import { Schema, Document, model } from 'mongoose';

export default interface Tasks extends Document {
  title: string;
  description: string;
  comments?: [];
  madeById: string;
}
const tasksSchema = new Schema(
  {
    title: String,
    description: String,
    comments: Array,
    madeById: String,
  },
  { timestamps: true }
);
export const tasksModel = model<Tasks>('tasks', tasksSchema);
