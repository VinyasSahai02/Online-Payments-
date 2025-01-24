const jwt = require('jsonwebtoken');

//decrypt the token
module.exports = function (req, res, next) {
    try {
      // in axios instance we have set the token in the header as 'Bearer ${localStorage.getItem('token')'
      // split of [0] is Bearer and [1] is the actual token
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.body.userId = decoded.userId;
        next()
    } catch (error) {
        res.send({
          message: error.message,
          success: false,
        });
    }
}