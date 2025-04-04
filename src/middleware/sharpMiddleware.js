const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const sharpMiddleware = (outputFormat = "webp", quality = 80) => {
  return async (req, res, next) => {
    if (!req.file) return next(); // If no file is uploaded, skip

    try {
      const inputPath = req.file.path; // Path of the uploaded file
      const filenameWithoutExtension = req.file.filename.split(".").slice(0, -1).join(".");
      const outputPath = path.join("uploads", `${filenameWithoutExtension}.${outputFormat}`); // Define the output path

      // Process the image using Sharp
      await sharp(inputPath)
        .toFormat(outputFormat, { quality: quality })
        .toFile(outputPath);

      // Delete the original uncompressed file
      fs.unlink(inputPath, (err) => {
        if (err) {
          console.error("Error deleting original file:", err);
        } else {
          console.log("Original file deleted:", inputPath);
        }
      });

      // Replace the original file with the processed one
      req.file.processedPath = outputPath;
      req.file.mimetype = `image/${outputFormat}`;
      req.file.originalname = `${filenameWithoutExtension}.${outputFormat}`; // Update the name to the new format

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      console.error("Error processing image with Sharp:", err);
      res.status(500).json({ error: "Failed to process image" });
    }
  };
};

module.exports = sharpMiddleware;
