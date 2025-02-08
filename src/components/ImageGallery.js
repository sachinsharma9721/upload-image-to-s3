import React, { useState, useEffect } from "react";
import { fetchFromS3 } from "../utils/config";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFromS3(
      (imageUrls) => {
        setImages(imageUrls);
        setLoading(false);
      },
      (errorMsg) => {
        setError(errorMsg);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="gallery-container">
      <h2>Uploaded Images</h2>
      {loading && <p>Loading images...</p>}
      {error && <p className="error">{error}</p>}
      <div className="image-grid">
        {images.map((imgUrl, index) => (
          <div key={index} className="image-card">
            <img src={imgUrl} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
