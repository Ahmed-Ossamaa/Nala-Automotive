const multer = require('multer');

// memory storage
const storage = multer.memoryStorage();

const limits = {
    fileSize: 5 * 1024 * 1024, // 5MB
};

//filter only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
