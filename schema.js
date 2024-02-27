const Joi = require("joi");

module.exports.imageSchema = Joi.object({
    Image:Joi.object({
        type:Joi.string().required(),
        image: Joi.string().allow("",null),
    })
    }).required()
    
    

