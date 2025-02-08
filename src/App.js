import { useState } from 'react';
import './App.css';
import ImageUpload from "./components/ImageUpload";
import ImageGallery from "./components/ImageGallery";

function App() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="app-container">
      <header className="header">
        <button
          className={activeTab === "upload" ? "active" : ""}
          onClick={() => setActiveTab("upload")}
        >
          Upload Image
        </button>
        <button
          className={activeTab === "gallery" ? "active" : ""}
          onClick={() => setActiveTab("gallery")}
        >
          Fetch All Images
        </button>
      </header>

      <div className='main'>
        {activeTab === "upload" ? <ImageUpload /> : <ImageGallery />}
      </div>
    </div>
  );
}

export default App;
