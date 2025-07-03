import React, { useRef, useState } from 'react';

export default function App() {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const handleFiles = fileList => {
    setFiles(Array.from(fileList));
  };

  const handleDrop = e => {
    e.preventDefault();
    setHighlight(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!files.length) return;
    setLoading(true);
    setUrls([]);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('images', f));
      formData.append('topBorder', e.target.topBorder.value);
      formData.append('bottomBorder', e.target.bottomBorder.value);
      formData.append('leftBorder', e.target.leftBorder.value);
      formData.append('rightBorder', e.target.rightBorder.value);
      formData.append('borderColor', e.target.borderColor.value);
      const res = await fetch('/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setUrls(data.urls);
      } else {
        alert('Processing failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Upload Photo</h1>
      <div
        id="drop-area"
        className={`border-2 border-dashed p-4 mb-4 cursor-pointer ${
          highlight ? 'border-gray-600' : 'border-gray-300'
        }`}
        onClick={() => inputRef.current.click()}
        onDragEnter={e => {
          e.preventDefault();
          setHighlight(true);
        }}
        onDragOver={e => e.preventDefault()}
        onDragLeave={() => setHighlight(false)}
        onDrop={handleDrop}
      >
        Drag and drop multiple images here or click to select them
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" id="upload-form">
        <input
          type="file"
          multiple
          accept="image/*"
          ref={inputRef}
          onChange={e => handleFiles(e.target.files)}
          className="hidden"
          name="image"
        />
        <div className="flex flex-wrap justify-center gap-2" id="options">
          <label className="flex items-center gap-1">
            Top
            <input type="number" name="topBorder" defaultValue="200" className="border p-1 w-20" />
          </label>
          <label className="flex items-center gap-1">
            Bottom
            <input type="number" name="bottomBorder" defaultValue="500" className="border p-1 w-20" />
          </label>
          <label className="flex items-center gap-1">
            Left
            <input type="number" name="leftBorder" defaultValue="200" className="border p-1 w-20" />
          </label>
          <label className="flex items-center gap-1">
            Right
            <input type="number" name="rightBorder" defaultValue="200" className="border p-1 w-20" />
          </label>
          <label className="flex items-center gap-1">
            Color
            <input type="color" name="borderColor" defaultValue="#ffffff" className="border p-1" />
          </label>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow">
          Process
        </button>
      </form>
      {loading && <div className="font-bold mt-4 animate-pulse">Processing...</div>}
      <div id="preview-container" className="flex flex-wrap justify-center gap-4 mt-4">
        {urls.map(url => (
          <div key={url} className="flex flex-col items-center max-w-xs">
            <img src={url} className="mt-4 shadow" />
            <a href={url} download className="bg-blue-500 text-white px-4 py-2 rounded mt-2 shadow">
              Download
            </a>
          </div>
        ))}
      </div>
      {urls.length > 0 && (
        <button
          id="download-all"
          onClick={() => (window.location = '/download-zip')}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4 shadow"
        >
          Download All
        </button>
      )}
    </div>
  );
}
