const jwt = require('jsonwebtoken');

module.exports.auth = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(!token) {
        return res.status(403).send('Not provided access token');
    }

    try {
        const deocoded = await jwt.verify(token, process.env.TOKEN_SECRET);

        if(deocoded) {
            req.userId = deocoded._id;
            next();
        }
    } catch (error) {
        return res.status(403).send('Token Expired');
    }
};
