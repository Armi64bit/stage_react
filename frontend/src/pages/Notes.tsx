import React, { useState, useEffect } from "react";
import { Note as NoteModel } from "../models/note";
import Note from "../component/Note";
import { Button, Container, Row, Col } from "react-bootstrap";
import styles from "../styles/NotesPage.module.css";
import styleutils from "../styles/utilis.module.css";
import * as NoteApi from "../network/notes_api";
import AddNoteDialog from "../component/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

function Notes() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setshowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const [noteToEdit, setnoteToEdit] = useState<NoteModel | null>(null);
  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await axiosInstance.get("/api/notes");
        console.log(response.data); // Log the response data object

        const notes = response.data.notes;
        setNotes(notes);
      } catch (error) {
        console.log(error);
        setshowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(noteId: string) {
    try {
      await NoteApi.deleteNote(noteId);
      setNotes(notes.filter((existingNote) => existingNote._id !== noteId));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            onNoteClicked={setnoteToEdit}
            onDeleteNoteClicked={() => deleteNote(note._id)}
            note={note}
            className={styles.note}
          />
        </Col>
      ))}
    </Row>
  );
  return (
    <div className="App">
      <Container className={styles.notePage}>
        <Button
          className={`mb-4 ${styleutils.blockCenter} ${styleutils.flexCenter}`}
          onClick={() => setShowAddNoteDialog(true)}
        >
          <FaPlus /> add new note
        </Button>

        {notesLoading && <Spinner animation="border" variant="primary" />}
        {showNotesLoadingError && <div>Failed to load notes</div>}
        {!notesLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? (
              notesGrid
            ) : (
              <p>You don't have any notes yet </p>
            )}
          </>
        )}

        {showAddNoteDialog && (
          <AddNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setShowAddNoteDialog(false);
              // bugged doesnt close on submit choufilha 7all b3d
            }}
          />
        )}
        {noteToEdit && (
          <AddNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setnoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(
                notes.map((note) =>
                  note._id === updatedNote._id ? updatedNote : note
                )
              );
              setnoteToEdit(null);
            }}
          />
        )}
      </Container>
    </div>
    // <div></div>
  );
}

export default Notes;
