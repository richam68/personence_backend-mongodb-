var jwt = require('jsonwebtoken');
const JWT_SECRET = 'jasvant';

const verify = (req, res, next) => {
    const token = req.header('authtoken');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = verify;
