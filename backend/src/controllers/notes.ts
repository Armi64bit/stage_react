import { RequestHandler , Request, Response, NextFunction } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose  from "mongoose";

export const getNotes: RequestHandler = async (req:AuthRequest, res, next) => {
  const userId = req.userId; // Get the authenticated user's ID

  try {
    const notes = await NoteModel.find({ user: userId }).exec(); // Fetch notes associated with the user
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
  images?: string[]; // Array of strings representing image URLs or paths
}

interface AuthRequest<T = unknown, P = unknown, ReqBody = any, ResBody = any> extends Request<T, P, ReqBody, ResBody> {
  userId?: string;
}

export const createNote: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (
  req: AuthRequest<unknown, unknown, CreateNoteBody>,
  res: Response,
  next: NextFunction
) => {
  const { title, text, images } = req.body;
  const userId = req.userId; // Get the authenticated user's ID

  try {
    if (!title) {
      throw createHttpError(400, 'Title is required');
    }

    const newNote = await NoteModel.create({ title, text, images, user: userId }); // Associate the note with the user ID
    res.status(201).json({ message: 'Note created', note: newNote });
  } catch (error) {
    next(error);
  }
};
interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
  images?: string[]; // Array of strings representing image URLs or paths
}

interface UpdateNoteBody {
  title?: string;
  text?: string;
  images?: string[]; // Array of strings representing image URLs or paths
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, text, images } = req.body;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }
    if (!title) {
      throw createHttpError(400, "Title is required");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    note.title = title;
    note.text = text;
    note.images = images || []; // Set images to an empty array if not provided
    const updatedNote = await note.save();
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