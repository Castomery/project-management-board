import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICard extends Document{
    title: string;
    description?: string;
    position: number;
    list: Types.ObjectId;
    board: Types.ObjectId;
    assignedTo: Types.ObjectId;
    dueDate: Date;
    labels: string[];
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const CardSchema = new Schema<ICard>({
    title: {type: String, required:true, trim:true},
    description: {type: String,},
    position: {type: Number, required:true,},
    list:{type: Schema.Types.ObjectId, ref:"List", required:true},
    board:{type: Schema.Types.ObjectId, ref:"Board", required:true},
    assignedTo: {type:Schema.Types.ObjectId, ref:"User",},
    dueDate: {type:Date,},
    labels:[{type:String,}],
    createdAt:{type:Date,},
    createdBy:{type:Schema.Types.ObjectId, ref:"User", required:true,},
}, {timestamps:true});

export const Card = mongoose.model<ICard>("Card", CardSchema);