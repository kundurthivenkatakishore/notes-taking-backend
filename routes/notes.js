import express from "express"
import { createNote, deleteNote, getNote, getNotes, updateNote } from "../controllers/notes.js";
import { verifToken } from "../controllers/user.js";

const router = express.Router();

router.get("/", verifToken, getNotes)
router.post("/create", verifToken, createNote);
router.delete("/:id", verifToken, deleteNote);
router.put("/:id", verifToken, updateNote)
router.get('/:id', verifToken, getNote)

export default router;