import AWS from "aws-sdk";

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
});

const s3 = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

export const uploadToS3 = (file, onSuccess, onError) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: `uploads/${Date.now()}_${file.name}`,
    Body: file,
    ACL: "public-read",
    ContentType: file.type,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Upload Error:", err);
      onError("Upload failed. Try again.");
    } else {
      onSuccess(data.Location);
    }
  });
};


export const fetchFromS3 = (onSuccess, onError) => {
  const params = {
    Bucket: S3_BUCKET,
    Prefix: "uploads/",
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error("Fetch Error:", err);
      onError("Failed to fetch images. Try again.");
    } else {
      const imageUrls = data.Contents.map((item) => `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${item.Key}`);
      onSuccess(imageUrls);
    }
  });
};
