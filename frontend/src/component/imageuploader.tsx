// components/ImageUploadForm.tsx

import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await axios.post('/api/upload', formData);

      // Handle the response, e.g., update state with the image path
      console.log(response.data.filePath);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default ImageUploadForm;
