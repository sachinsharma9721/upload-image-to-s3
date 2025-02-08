import React, { useState } from "react";
import { uploadToS3 } from "../utils/config";
import uploadIcon from "../assets/images/upload_image.webp";
import "../App.css";

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            setMessage("File size must be less than 2MB");
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width > 1280 || img.height > 720 ) {
                setMessage("Image dimensions must be below 1280x720");
            } else {
                setSelectedFile(file);
                setMessage("");
            }
        };
    };

    const uploadFile = () => {
        if (!selectedFile) {
            setMessage("Please select a image");
            return;
        }

        setUploading(true);
        uploadToS3(
            selectedFile,
            (url) => {
                setUploading(false);
                setMessage(`Upload successful! Image URL: ${url}`);
                console.log("File URL:", url);
            },
            (errorMsg) => {
                setUploading(false);
                setMessage(errorMsg);
            }
        );
    };

    return (
        <div className="upload-container">
            <div>
                <img src={uploadIcon} width={100} alt="upload icon" />
                <div>
                    <h2>Choose a file & upload it here</h2>
                    <span className="small-grey-text">
                        Image size should be up to 2MB, with dimensions not exceeding 1280x720 pixels.
                    </span>
                </div>
            </div>
            <div style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap"
            }}>
                <div className="file-upload-container">
                    <input
                        type="file"
                        accept="image/*"
                        id="fileInput"
                        className="hidden-input"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput" className="browse-btn">
                        Browse
                    </label>
                    {selectedFile && <span className="file-name">{selectedFile.name}</span>}
                </div>
                <button onClick={uploadFile} disabled={uploading} className="upload-btn">
                    {uploading ? "Uploading..." : "Upload Image"}
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default ImageUpload;
