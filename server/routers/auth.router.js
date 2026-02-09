const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/register", AuthController.signUp);
router.post("/login", AuthController.signIn);
router.post("/logout", AuthController.logout);

module.exports = router;