const Image = require("../models/image");
const mongoose = require("mongoose");

module.exports.postwedding = async (req, res) => {
    let allImages = await Image.find({ type: "postwedding" });
    res.render("images/post-wedding.ejs", { allImages });
  };

  module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      req.flash("error", " Listing You Requested does not exist!");
      res.redirect("/postwedding");
    }
    let originalImageUrl = image.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_200");
    res.render("edit_pages/postwedding.edit.ejs", { image, originalImageUrl });
  }

  module.exports.updatePostweddingImages = async (req, res, next) => {
    
      let { id } = req.params;
      // Ensure that id is a valid ObjectId
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid ObjectId');
      }
      let image = await Image.findByIdAndUpdate(
        id,
        { ...req.body.Image },
        { new: true, runValidators: true }
      );
      // Check if image is null (document not found)
      if (!image) {
        return res.status(404).send('Image not found');
      }
      // Check if req.file is defined before accessing its properties
      if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        image.image = { url, filename };
        await image.save();
      }
      console.log(image);
      req.flash("success", "Image Updated")
      res.redirect("/postwedding")
   
  };

  module.exports.destroyPostweddingImages = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Image.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Image Deleted");
    res.redirect("/postwedding");
  };