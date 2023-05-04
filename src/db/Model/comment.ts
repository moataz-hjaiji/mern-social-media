import { Schema,Document,model } from "mongoose";

export default interface comment extends Document{
  createdBy:string,
  content:string
}
const commentSchemma = new Schema({
  createdBy:String,
  content:String
})
export const commentModel = model<comment>('comment',commentSchemma)