// const User = require("../../../model/user");
const { User } = require("../../../model");
const failure = require('../../../public/javascripts/failure');
const success = require('../../../public/javascripts/success');
const { createJWT } = require("../../../utils/create-token");
const userValidation = require('./validation');

exports.getAllUsers = async (req, res) => {
    try {
        let { limit, page } = req.query;
        const user_res = await User.find().
            limit(limit * 1).
            skip((page - 1) * limit).
            sort({ "createdAt": -1 });

        if (user_res.length <= 0) {
            console.log("User_res", user_res)
            const success_204 = success.success_range_200.success_204;
            success_204.items = [];
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = user_res;
        return res.status(success_200.code).send(success_200)

    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.getUserById = async (req, res) => {
    try {
        let id
        const body = ({ id } = req.query);
        const { error } = userValidation.getUserByIdValidation.validate(body, {
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

        const user_res = await User.findById(id);
        if (!user_res) {
            const success_204 = success.success_range_200.success_204;
            success_204.items = [];
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = [user_res];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.createUser = async (req, res) => {
    try {
        let first_name, last_name, father_name, student_class;
        const body = ({ first_name, last_name, father_name, student_class } = req.body);
        const { error } = userValidation.userCreateValidation.validate(body, {
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

        const user_res = await User.create(body);

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

exports.updateUser = async (req, res) => {
    try {
        const user_res = await User.findByIdAndUpdate(req.body._id, req.body);

        if (!user_res) {
            const success_204 = success.success_range_200.succes_204;
            success_204.items = null;
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.items = [user_res];
        return res.status(success_200.code).send(success_200)

    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let _id
        const body = ({ _id } = req.body);
        const { error } = userValidation.deleteUserValidation.validate(body, {
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

        const user_res = await User.deleteOne({
            _id: body._id
        })

        if (!user_res) {
            const success_204 = success.success_range_200.succes_204;
            success_204.message = "No record deleted!"
            success_204.items = null;
            return res.status(success_204.code).send(success_204);
        }

        const success_200 = success.success_range_200.success_200;
        success_200.message = "Record Deleted successfully!";
        success_200.items = [user_res];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}

exports.loginUser = async (req, res) => {
    try {
        let email, password, token;
        const body = ({ email, password } = req.body);
        const { error } = userValidation.loginUserValidation.validate(body, {
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

        const user_res = await User.findOne({
            email: email,
            password: password
        });

        if (!user_res) {
            const failure_400 = failure.failure_range_400.failure_400;
            failure_400.message = "Email or password invalid!"
            return res.status(failure_400.code).send(failure_400);
        }

        token = await createJWT(user_res);

        const success_200 = success.success_range_200.success_200;
        success_200.message = "Login successfully!";
        success_200.items = [{ token: token }];
        return res.status(success_200.code).send(success_200)
    } catch (error) {
        console.log("Error::::::::: ", error);
        const failure_500 = failure.failure_range_500.failure_500;
        failure_500.items = error;
        return res.status(failure_500.code).send(failure_500);
    }
}