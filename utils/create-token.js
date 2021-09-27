const jwt = require('jsonwebtoken');

exports.createJWT = async({_id}) => {
    const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 10),
        data: _id
      }, 'secret');
      return token;
}