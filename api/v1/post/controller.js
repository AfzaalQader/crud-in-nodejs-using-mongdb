const { Post } = require("../../../model");
const failure = require('../../../public/javascripts/failure');
const success = require('../../../public/javascripts/success');
const postValidation = require('./validation');

exports.getAllPost = async (req, res) => {
    try {
        let { limit, page } = req.query;
        const post_res = await Post.find().
            populate("user_id", "first_name last_name _id").
            limit(limit * 1).
            skip((page - 1) * limit).
            sort({ "createdAt": -1 });

        if (post_res.length <= 0) {
            console.log("User_res", post_res)
            const success_204 = success.success_range_200.success_204;
            success_204.items = [];
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = post_res;
        return res.status(success_200.code).send(success_200)

    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.createPost = async (req, res) => {
    try {
        let title, image, text, user_id;
        const body = ({ title, image, text } = req.body);
        body.user_id = req.query.id
        const { error } = postValidation.postCreateValidation.validate(body, {
            abortEarly: false,
        })

        if (error) {
            let err = [];
            for (let i = 0; i < error.details.length; i++) {
                err.push(error.details[i].message);
            }
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.items = err;
            return res.status(failure_400.code).send(failure_400);
        }

        const user_res = await Post.create(body);

        if (!user_res) {
            const success_204 = success.success_range_200.succes_204;
            success_204.items = null;
            return res.status(success_204.code).send(success_204);
        }

        const success_201 = success.success_range_200.success_201;
        success_201.items = [user_res];
        return res.status(success_201.code).send(success_201)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.getPostById = async (req, res) => {
    try {
        let id
        const body = ({ id } = req.params);
        const { error } = postValidation.getPostByIdValidation.validate(body, {
            abortEarly: false
        });

        if (error) {
            let err = [];
            for (let i = 0; i < error.details.length; i++) {
                err.push(error.details[i].message);
            }
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.items = [error];
            return res.status(failure_400.code).send(failure_400);
        }

        const post_res = await Post.findById(id).populate("user_id", "first_name last_name _id");
        if (!post_res) {
            const success_204 = success.success_range_200.success_204;
            success_204.items = [];
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = [post_res];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.updatePost = async (req, res) => {
    try {
        const post_res = await Post.findOneAndUpdate({
            _id: req.body.id,
            user_id: req.query.id
        }, req.body);

        if (!post_res) {
            const success_204 = success.success_range_200.succes_204;
            success_204.items = null;
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = [post_res];
        return res.status(success_200.code).send(success_200)

    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.deletePost = async (req, res) => {
    try {
        let id
        const body = ({ id } = req.body);
        body.user_id = req.query.id;
        const { error } = postValidation.deletePostValidation.validate(body, {
            abortEarly: false
        });

        if (error) {
            let err = [];
            for (let i = 0; i < error.details.length; i++) {
                err.push(error.details[i].message);
            }
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.items = err;
            return res.status(failure_400.code).send(failure_400);
        }

        const post_res = await Post.deleteOne({
            _id: body.id,
            user_id: body.user_id
        })

        if (post_res.deletedCount <= 0) {
            const success_204 = success.success_range_200.success_204;
            success_204.message = "No record deleted!"
            success_204.items = null;
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.message = "Record Deleted successfully!";
        success_200.items = [post_res];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}
