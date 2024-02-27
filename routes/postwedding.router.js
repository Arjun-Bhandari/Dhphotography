const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateImage } = require("../middleware.js");

const postweddingController = require("../controllers/postwedding.controller.js")

const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(wrapAsync(postweddingController.postwedding));

router.route("/:id/edit",)
  .get(wrapAsync(postweddingController.renderEditForm));


router.route("/:id")
  .put(
   
    upload.single("Image[image]"),
    validateImage,
    wrapAsync(postweddingController.updatePostweddingImages),
    )
  .delete(wrapAsync(postweddingController.destroyPostweddingImages));


module.exports = router;