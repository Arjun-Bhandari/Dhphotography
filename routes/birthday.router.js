const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const mongoose = require("mongoose");
const {isLoggedIn, isOwner,validateImage} = require("../middleware.js");
const birthdayController = require("../controllers/birthday.controller.js");
const Image = require("../models/image.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
.get(wrapAsync(birthdayController.birthday));
  
router.route("/:id/edit")
  .get(wrapAsync(birthdayController.renderEditPage));
  
  
  router.route("/:id")
  .put(
    
    upload.single("Image[image]"), 
    validateImage, 
    wrapAsync(birthdayController.updateBirthdayImages),
    )
  .delete( wrapAsync(birthdayController.destroyBirthdayImages));

module.exports = router;