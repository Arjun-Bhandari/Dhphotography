const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateImage } = require("../middleware.js");

const weddingController = require("../controllers/wedding.controller.js");
const Image = require("../models/image.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(  wrapAsync(weddingController.wedding));

router.route("/:id/edit")
  .get( wrapAsync(weddingController.renderEditFrom));

router.route("/:id")
  .put(
    
    upload.single("Image[image]"),
    validateImage,
    wrapAsync(weddingController.updateWeddingImages),
    )
  .delete(wrapAsync(weddingController.destroyWeddingImages));


module.exports = router;