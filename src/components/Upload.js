import React, { useState } from 'react'

import './Upload.scss'

const Upload = () => {
  const [highlight, setHighlight] = useState(false);
  const [preview, setPreview] = useState("");
  const [drop, setDrop] = useState(false);

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter!");

    (preview === "") && setHighlight(true);
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over!");

    (preview === "") && setHighlight(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave!");
    setHighlight(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drop!");
    setHighlight(false);
    setDrop(true);

    const [file] = e.target.files || e.dataTransfer.files;

    uploadFile(file);
  };

  function uploadFile(file) {
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = () => {
      // this is the base64 data
      const fileRes = btoa(reader.result);
      console.log(`data:image/jpg;base64,${fileRes}`);
      setPreview(`data:image/jpg;base64,${fileRes}`);
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  }

  return (
    <>
      <div
        onDragEnter={(e) => handleEnter(e)}
        onDragLeave={(e) => handleLeave(e)}
        onDragOver={(e) => handleOver(e)}
        onDrop={(e) => handleUpload(e)}
        className={`upload${highlight ? " is-highlight" : drop ? " is-drop" : ""}`}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <form class="form">
          <p>Drag and Drop image here</p>
          <div className="upload-button-wrap">
            <input
              type="file"
              className="upload-file"
              accept="image/*"
              onChange={(e) => handleUpload(e)}
            />
            <button className="upload-button">Upload Here</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Upload;
