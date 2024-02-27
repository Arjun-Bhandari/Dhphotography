const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateImage} = require("../middleware.js");

const preweddingController = require("../controllers/prewedding.controller.js");
const Image = require("../models/image.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(preweddingController.prewedding));
  
router.route("/:id/edit")
  .get( wrapAsync(preweddingController.renderEditForm));
  
  
  router.route("/:id")
.put( 
  
  upload.single("Image[image]"),
   validateImage, 
   wrapAsync( preweddingController.updatePreweddingImages),
   )
  .delete(wrapAsync( preweddingController.destroyPreweddingImages));
 
module.exports = router;