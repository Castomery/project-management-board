import { timeStamp } from "console";
import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  title: string;
  owner: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  lists: mongoose.Types.ObjectId[];
}

const BoardSchema: Schema<IBoard> = new Schema({
    title: {type: String, required:true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
}, {timestamps:true});

export default mongoose.model<IBoard>("Board", BoardSchema);