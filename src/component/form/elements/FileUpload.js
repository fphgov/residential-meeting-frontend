import React, { useState } from "react";

export default function FileUpload({ id, name, label, buttonLabel = "Tallózás", acceptedExtensions, onChange, info, longInfo, maximalImageCount = 2 }) {
  const [previewImages, setPreviewImages] = useState([]);
  const isAcceptedExtentionPatternValid = extentionListValidator(acceptedExtensions)

  const handleFileChange = (event) => {

    let images = [...event.target.files];

    if (isAcceptedExtentionPatternValid) {
      images = images.filter(image =>
        acceptedExtensions.includes(image.name.slice(image.name.lastIndexOf('.')).toLowerCase())
      );
    }

    const existingPreviewImageNames = previewImages.map(image => image.name);
    images = images.filter(image => !existingPreviewImageNames.includes(image.name));

    const existingAndNewImages = [...previewImages, ...images ].slice(0, maximalImageCount)
    setPreviewImages(existingAndNewImages)
    onChange(existingAndNewImages); 

    event.target.value = null;
  };

  const removeImage = (index) => {
    let newImages = [...previewImages];
    newImages.splice(index, 1);
    setPreviewImages(newImages);
  };

  function extentionListValidator(extentionArray) {
    if (!acceptedExtensions || acceptedExtensions.length === 0) {
      return false
    }

    const extensionPattern = /^\.[^.]+$/;
    return extentionArray.every(str => extensionPattern.test(str));
  }

  return (
    <div className="file-upload-container">
      <div className="file-upload-label">{label}</div>
      {longInfo ? <div className="long-info">{longInfo}</div> : ''}
      <label htmlFor={id} className="file-upload-button-label">{buttonLabel}</label>
      <input
        type="file"
        accept={isAcceptedExtentionPatternValid ? acceptedExtensions : ''}
        id={id}
        name={name}
        onChange={handleFileChange}
        multiple
        className="file-upload-input"
      />
      {info ? <div className="info">{info}</div> : ''}

      <div className="image-thumbnail-wrapper">
      {previewImages.map((image, index) => (
        <div key={index} className="file-upload-image-thumbnail-info">
          <img src={URL.createObjectURL(image)} alt="Preview" width="32" height="32" />
          <div>
            <div>{image.name}</div>
            <div>{(image.size / 1024).toFixed(2)} KB</div>
          </div>
          <button className="remove-image-button" onClick={() => removeImage(index)}>x</button>
        </div>
      ))}
      </div>
    </div>
  );
}
