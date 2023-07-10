
import React, { useState,useEffect } from 'react';
import { Note as NoteModel } from '../models/note';
import Note from '../component/Note';
import { Button,Container,Row,Col } from 'react-bootstrap';
import styles from '../styles/NotesPage.module.css';
import styleutils from '../styles/utilis.module.css';
import * as NoteApi from '../network/notes_api';
import AddNoteDialog from '../component/AddEditNoteDialog';
import {FaPlus} from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';
function Notes() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
 
 
    const [notesLoading, setNotesLoading] = useState(true);
   const [showNotesLoadingError, setshowNotesLoadingError] = useState(false); 
   
   
   const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  
    const [noteToEdit, setnoteToEdit] = useState<NoteModel|null>(null);
    useEffect(() => {
  async function loadNotes() {
  
    try {
       
      const response = await fetch('/api/notes', {method : 'GET'});
      const notes = await response.json();
      
      if (Array.isArray(notes.notes)) {
        setNotes(notes.notes);
      } else {
        console.error('Invalid API response format:', notes);
        // Handle the case when the API response is not as expected
      }
    } catch (error) {
      console.log(error);
      setshowNotesLoadingError(true);
    } finally {
      setNotesLoading(false);
    }
  
  
  }
  loadNotes ();
  },[]);
  
  async function deleteNote (note:NoteModel) {
    try {
      await NoteApi.deleteNote (note._id);
      setNotes(notes.filter((existingnote) => existingnote._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  const notesGrid=<Row xs={1} md={2} xl={3} className={`g-4${styles.notesGrid}`}>
  
  {/* {JSON.stringify(notes)} */}
  {notes.map(note => (
    <Col key={note._id}>
    <Note onNoteClicked={setnoteToEdit} onDeleteNoteClicked={deleteNote} note={note} className={styles.note}/>
    </Col>
  ))
    }
    </Row>
    
  return (<div className='App'>
    <Container className={styles.notePage}>
         <Button className={`mb-4 ${styleutils.blockCenter} ${styleutils.flexCenter}`}
         onClick={()=>setShowAddNoteDialog(true)}>
         <FaPlus/> add new note 
        </Button>
    
    {notesLoading && <Spinner animation='border' variant='primary' />}
    {showNotesLoadingError && <div>Failed to load notes</div>}
    {!notesLoading && !showNotesLoadingError &&
    <>
    {
      notes.length > 0
       ? notesGrid 
       :<p>You don't have any notes yet </p>
    }
    </>
    
    
    }
    
          {showAddNoteDialog && 
          <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes,newNote]);
           setShowAddNoteDialog(false);
              // bugged doesnt close on submit choufilha 7all b3d 
          }}
          />}
          {noteToEdit &&
          <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setnoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(notes.map((note) => note._id === updatedNote._id ? updatedNote : note));
            setnoteToEdit(null);
          }}
          />
          }
      </Container>
      </div>
    // <div></div>
  )
}

export default Notes