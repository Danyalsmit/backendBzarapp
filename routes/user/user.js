
const express = require("express");
const router = express.Router();
const { signupcontroller, logincontroller } = require("../../controller/usercontrol");


router.post("/signup",signupcontroller );

router.post("/login", logincontroller);

module.exports = router;
