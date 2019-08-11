module.exports = (req, res, next) => {
    res.success = (json, code) => {
        return res.status(code || 200).json(json);
    };

    res.fail = (json, code) => {
        return res.status(code || 400).json(json);
    };

    next();
};
