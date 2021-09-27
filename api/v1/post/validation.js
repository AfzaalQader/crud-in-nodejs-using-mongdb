const Joi = require("joi");

exports.getPostByIdValidation = Joi.object({
    id: Joi.string().required("Post Id required!")
})

exports.postCreateValidation = Joi.object({
    title: Joi.string().required("Title is required!"),
    text: Joi.string().required("Text is required!"),
    image: Joi.string().allow(''),
    user_id: Joi.string().required('User id requires'),
});

exports.deletePostValidation = Joi.object({
    id: Joi.string().required("Post Id required!"),
    user_id: Joi.string().required("User Id required!")
})