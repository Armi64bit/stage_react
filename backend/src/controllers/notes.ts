import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose  from "mongoose";

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    // throw Error("Something went wrong");
    const notes = await NoteModel.find().exec();
    res.status(200).json({ notes });
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
if(!mongoose.isValidObjectId(noteId)){
  throw createHttpError(400,"Invalid note id");
}

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    res.status(200).json({ note });
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;

  try {
    if (!title) {
      throw createHttpError(400, "Title is required");
    }
    const newNote = await NoteModel.create({ title: title, text: text });
    res.status(201).json({ message: "Note created", note: newNote });
  } catch (error) {
    next(error);
  }
};
interface UpdateNoteParams{
noteId:string;

}

interface UpdateNoteBody {
  title?: string,
  text?: string,
}
export const updateNote: RequestHandler<UpdateNoteParams,unknown,UpdateNoteBody,unknown> = async (req, res, next) => {

  const noteId = req.params.noteId;
  const newtitle = req.body.title;
  const newtext = req.body.text;

  try {
    if(!mongoose.isValidObjectId(noteId)){
      throw createHttpError(400,"Invalid note id");
    }
    if (!newtitle) {
      throw createHttpError(400, "Title is required");
    }

    const note = await NoteModel.findById(noteId).exec();
    
    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    note.title = newtitle;
    note.text = newtext;
    const updatedNote =await note.save();
    res.status(200).json(updatedNote);



  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {

const noteId = req.params.noteId;


  try {if(!mongoose.isValidObjectId(noteId)){
    throw createHttpError(400,"Invalid note id");
  }
  const note = await NoteModel.findById(noteId).exec();
  if (!note) {
    throw createHttpError(404, "Note not found");
  }
await NoteModel.findByIdAndDelete(noteId).exec();
// await note.remove();

res.sendStatus(204);
  }
  catch (error) {
    next(error);

  }

};