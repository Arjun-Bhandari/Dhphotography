const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema (
    {
        image:
            {
            url:String,
            filename:String,
        },
        type:{
            type:String,
            require:true,
        },
    }
    )
const Image = mongoose.model("Image",imageSchema);
    module.exports = Image;