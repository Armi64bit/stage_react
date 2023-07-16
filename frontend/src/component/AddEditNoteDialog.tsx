import { Button, Modal, Form } from "react-bootstrap";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";
import React, { ChangeEvent, useState } from "react";

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
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit note" : "Add Note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
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
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <div>{renderPreviewImages()}</div>
            <Button onClick={handleAddImages}>Add Images</Button>
          </Form.Group>
         
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button form="addEditNoteForm" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
