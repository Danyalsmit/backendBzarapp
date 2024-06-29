const multer = require("multer");

// Multer disk storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now()); // Unique filename logic
  },
});

// Create multer instance with storage options
const upload = multer({ storage: storage });

module.exports = upload;
