const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

async function createToken(data) {
    return jwt.sign({ data }, secret, { expiresIn: "1000d" })
}


async function validToken(req, res, next) {
    try {

        let token = req.headers.authorization.replace('Beare ', "")
        let trueToken = jwt.verify(token, secret);
        console.log(trueToken);
        if (trueToken.data) {
            req._id = trueToken.data;
            next();
        };
    } catch (error) {
        console.log("error:", error);
        res.send(error);

    }
}

module.exports = { createToken, validToken };