import { InferSchemaType, Schema, model } from 'mongoose';

const noteSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String },
    images: [{ type: String }] // Array of strings representing image URLs or paths

},{timestamps: true});

type Note = InferSchemaType<typeof noteSchema>;


export default model<Note>("Note", noteSchema);