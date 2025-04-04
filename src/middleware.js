const multer = require("multer");
const path = require("path");

// Configure storage options for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure the 'uploads' directory exists or create it manually
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Use current timestamp + original file name to avoid conflicts
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Multer upload middleware configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    // Accept image files only
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Invalid file type!");
    }
  },
});

module.exports = upload;
