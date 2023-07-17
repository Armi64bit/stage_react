
import * as NotesController from "../controllers/notes"; 
import express  from "express";
import auth from '../middleware/auth';

const router= express.Router();
router.get("/",auth, NotesController.getNotes);
router.get("/:noteId",auth, NotesController.getNote);
router.post("/",auth, NotesController.createNote);
router.patch("/:noteId", NotesController.updateNote);
router.delete("/:noteId",auth, NotesController.deleteNote);

export default router;
