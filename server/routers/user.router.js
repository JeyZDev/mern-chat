const express = require("express");
const { protectedRoute } = require("../middlewares/auth.middleware");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.put("/update-profile", protectedRoute, UserController.updateProfile);
router.get("/check", protectedRoute, UserController.checkAuth);

module.exports = router;