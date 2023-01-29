const middleware = (req, res, next) => {
    if (!req.query.q) {
        res.sendStatus(401);
    } else {
        next()
    };
};

module.exports = middleware;