const jwt = require("jsonwebtoken");
const failler = require('../public/javascripts/failure')

exports.auth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = await jwt.verify(token, "secret");

        const _id = decodedToken.data;
        if (!_id) {
            const failer_401 = failler.failure_range_400.failure_401;
            return res.status(failer_401.code).send(failer_401)
        } else {
            req.query.id = _id;
            next();
        }
    } catch(error) {
        console.log("Error:::::::::::::::: ", error)
        const failer_400 = failler.failure_range_400.failure_400;
        failer_400.message = "Invalid token!";
        return res.status(failer_400.code).send(failer_400)
    }
}