const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middlewares/auth.middleware");
const {getUsersForSidebar, getMessage, sendMessage} = require("../controllers/message.controller");

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/:id", protectedRoute, getMessage);
router.post("/send/:id", protectedRoute, sendMessage);

module.exports = router;