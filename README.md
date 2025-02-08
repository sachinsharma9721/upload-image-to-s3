# React S3 Image Gallery

## Getting Started

### 1. Clone the Repository
```sh
git clone <https://github.com/sachinsharma9721/upload-image-to-s3.git>
cd <demo>
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the **root** directory (not inside `src/`) and add the following keys:
```
REACT_APP_S3_BUCKET=your-s3-bucket-name
REACT_APP_REGION=your-region
REACT_APP_ACCESS_KEY=your-access-key
REACT_APP_SECRET_KEY=your-secret-key
```

### 4. Start the Development Server
```sh
npm start
```

## Features
- Fetches images from an AWS S3 bucket.
- Displays images in a responsive grid layout.
- Handles loading and error states.

