const express = require("express");
const router = express.Router();
const cloudinary = require("../../utils/cloudinary");
const upload = require("../../middleware/multer");
const {
  signupcontroller,
  logincontroller,
  uploadcontroller,
} = require("../../controller/usercontrol");

router.post("/signup", signupcontroller);

router.post("/login", logincontroller);

router.post("/upload", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});
module.exports = router;
