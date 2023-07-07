import { useState, useRef } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import styles from '../styles/Note.module.css';
import styleutils from '../styles/utilis.module.css';
import { formatDate } from '../utils/formatDate';
import { MdDelete } from 'react-icons/md';

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (noteId: NoteModel) => void;
  className?: string;
}

const Note = ({ onNoteClicked, onDeleteNoteClicked, note, className }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;
  let createdUpdatedText: string;
  const [isDone, setIsDone] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated: ` + formatDate(updatedAt);
  } else {
    createdUpdatedText = `Created: ` + formatDate(createdAt);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDone(event.target.checked);
  };

  const handleCardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target !== checkboxRef.current) {
      onNoteClicked(note);
    }
  };

  return (
    <Card
      className={`${styles.noteCard} ${className} ${isDone ? styles.greyedOut : ''}`}
      onClick={handleCardClick}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleutils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={`${styles.cardText} ${isDone ? styles.crossedOut : ''}`}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      <div className={styles.checkboxContainer}>
        <Form.Check
          ref={checkboxRef}
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxChange}
          className={styles.checkbox}
          id={`checkbox-${note._id}`}
          label={
            <div>
              {isDone ? (
                <AiFillCheckCircle className={`${styles.checkboxIcon} ${styles.checked}`} />
              ) : (
                <AiOutlineCheckCircle className={styles.checkboxIcon} />
              )}
            </div>
          }
        />
      </div>
    </Card>
  );
};

export default Note;
