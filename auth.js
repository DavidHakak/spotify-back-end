const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

async function createToken(data) {
  return jwt.sign({ data }, secret, { expiresIn: "29d" });
}

async function validToken(req, res, next) {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const result = jwt.verify(token, secret);
    if (result.data) {
      req.data = result.data;
      next();
    }
  } catch (error) {
    console.log("error:", error);
    res.send(error);
  }
}

module.exports = { createToken, validToken };
