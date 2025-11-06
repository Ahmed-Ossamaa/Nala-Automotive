const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv');

dotenv.config();
cloudinary.config({
    url: process.env.CLOUDINARY_URL,
    // cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    // api_key:process.env.CLOUDINARY_API_KEY,
    // api_secret:process.env.CLOUDINARY_API_SECRET

});

module.exports = cloudinary;