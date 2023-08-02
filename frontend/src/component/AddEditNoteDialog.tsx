import { Button, Modal, Form } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";
import React, { ChangeEvent, useState } from "react";
import ImageUploadForm from './imageuploader';
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";



interface AddEditNoteDialogProps {
  noteToEdit?: Note;
  onDismiss: () => void;
  onNoteSaved: (note: Note) => void;
}

interface NoteInputWithImages extends NoteInput {
  images?: string[] | null;
}

const AddEditNoteDialog = ({
  noteToEdit,
  onDismiss,
  onNoteSaved
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    getValues
  } = useForm<NoteInputWithImages>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
      images: noteToEdit?.images || null
    }
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const files = Array.from(fileInput.files);
      const imageFiles = files.map((file) => URL.createObjectURL(file));
      setValue("images", imageFiles);
      setPreviewImages(imageFiles);
    }
  };

  const removeImage = (index: number) => {
    const images = getValues("images") || [];
    const updatedImages = images.filter((_, i) => i !== index);
    setValue("images", updatedImages);
    setPreviewImages(updatedImages);
  };

  const renderPreviewImages = () => {
    if (previewImages && previewImages.length > 0) {
      return previewImages.map((image, index) => (
        <div key={index}>
          <img
            style={{ width: "100px", height: "100px" }}
            src={image}
            alt={`Preview ${index + 1}`}
          />
          <Button onClick={() => removeImage(index)}>Remove</Button>
        </div>
      ));
    }
    return null;
  };
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(input: NoteInputWithImages) {
    try {

      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NoteApi.updateNote(noteToEdit._id, {
          ...input, // Include the updated `images` property
        });
      } else {
        noteResponse = await NoteApi.createNote({
          ...input, // Include the `images` property
        });
      }
      onNoteSaved(noteResponse);
      setTimeout(() => {
        setIsSubmitting2(false);
        navigate("/notes");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.addEventListener("change", handleImageChange as unknown as EventListener);
    input.click();
  };

  return (
    <Modal show onHide={onDismiss}
    >
      <Modal.Header closeButton
      style={{
        background: "#2f3439", // Set the background color to black for dark mode
        color: "white", // Set the text color to white for dark mode
      }}>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add Note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body
      style={{
        background: "#3a3d40", // Set the background color to black for dark mode
        color: "white", // Set the text color to white for dark mode
      }}
      >
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
            style={{
              background: "#5b5e61", // Set the background color to black for dark mode
              color: "white", // Set the text color to white for dark mode
            }}
              type="text"
              placeholder="Enter title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter Text"
              {...register("text")}
              style={{
                background: "#5b5e61", // Set the background color to black for dark mode
                color: "white", // Set the text color to white for dark mode
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <div>{renderPreviewImages()}</div>
            <Button onClick={handleAddImages}>Add Images</Button>
            {/* <ImageUploadForm /> */}

          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer
      style={{
        background: "#2f3439", // Set the background color to black for dark mode
        color: "white", // Set the text color to white for dark mode
      }}>
        {isSubmitting ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Submitting...</span>
          </Spinner>
        ) : (
          <Button form="addEditNoteForm" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        )}
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
