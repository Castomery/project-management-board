import mongoose, { Document, Schema } from "mongoose";

export interface IList extends Document{
    title: string;
    board: mongoose.Types.ObjectId;
    position: number;
}

const ListSchema : Schema<IList> = new Schema({
    title: {type: String, required: true},
    board: {type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true},
    position: {type: Number, default:0},
}, { timestamps: true});

export default mongoose.model<IList>("List", ListSchema);