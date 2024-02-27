const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner,validateImage} = require("../middleware.js");

const fashionController = require("../controllers/fashion.controller.js");
const Image = require("../models/image.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });
router.route("/")
.get( wrapAsync(fashionController.fashion ));
  
router.route("/:id/edit")
  .get(wrapAsync(fashionController.renderEditPage));
  
  
  router.route("/:id")
  .put( 
   
    upload.single("Image[image]"), 
    validateImage, 
    wrapAsync(fashionController.updateFashionImage),
    )
.delete(wrapAsync( fashionController.destroyFashionImages));

module.exports = router;