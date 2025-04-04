const express = require("express");
const { userSignUp, userLogin, updateUserProfile } = require("../controllers/userController");
const upload = require("../middleware/multerConfig");
const verifyToken = require("../middleware/authMiddleware");
const sharpMiddleware = require("../middleware/sharpMiddleware");

const router = express.Router();

// Test Route (Just to ensure the server is working)
router.get("/", (req, res) => {
  res.send("ok ok");
});

// User Signup Route
router.post("/signup", userSignUp);

// User Login Route
router.post("/login", userLogin);

// User Profile Update Route (with Multer and Sharp for image optimization)
router.put(
  "/userUpdate",
  verifyToken,                  // Ensure user is authenticated
  upload.single("profilePic"),   // Handle file upload
  sharpMiddleware("webp", 80),   // Process the file (convert to WebP, 80% quality)
  updateUserProfile              // Update the user profile with the new picture
);

module.exports = router;
