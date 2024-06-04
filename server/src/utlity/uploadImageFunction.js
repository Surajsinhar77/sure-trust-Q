const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config(); // Load environment variables from a .env file into process.env


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// Directory where files will be uploaded
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Set up storage for uploaded files locally
const localDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("file path is not provided", file)
        cb(null, UPLOADS_DIR); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Set up multer with local storage
const upload = multer({
    storage: localDiskStorage,
    fileFilter: (req, file, cb) => {
        console.log("file path is not provided", file)
        const allowedFileTypes = /jpeg|jpg|png/;
        const mimetype = allowedFileTypes.test(file.mimetype);
        const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only JPEG, JPG, and PNG files are allowed'));
    }
}).single('file');


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("file path is not provided");
            fs.unlinkSync(localFilePath);
            return null;
        }

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { folder: '/uploads/profile-images' });

        if (!response) {
            fs.unlinkSync(localFilePath);
            return null;
        }
        // remove the local file
        fs.unlinkSync(localFilePath);
        return {public_id : response.public_id, image_url:response.secure_url};
    } catch (error) {
        // remove the local file in case of error
        fs.unlinkSync(localFilePath);
        console.error("Error uploading to Cloudinary:", error);
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            console.log("publicId is not provided");
            return null;
        }

        // delete the file from cloudinary
        const response = await cloudinary.uploader.destroy(publicId);

        if (!response) {
            return null;
        }
        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
}



module.exports = { uploadOnCloudinary, upload , deleteFromCloudinary}