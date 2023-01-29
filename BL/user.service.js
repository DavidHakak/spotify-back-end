const userController = require("../DL/controller/user.controller");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const saltRounds = 10;

//וולידציה - שדות חובה, תוכן מתאימים לסוד שדה
async function register(userDetails) {
  if (!userDetails.email || !userDetails.password) throw "missing data";
  //אם קיים
  const userExisct = await userController.read({ email: userDetails.email });

  if (userExisct) throw "user is exist";
  //ליצור יוזר
  const userPass = userDetails.password;

  const hashedPass = await bcrypt.hash(userPass, saltRounds);

  userDetails.password = hashedPass;

  let newUser = await userController.create(userDetails);

  const token = await auth.createToken(newUser._id);

  newUser.password = undefined;

  return { newUser, token };
}

async function login(loginDetails) {
  if (!loginDetails.userName || !loginDetails.password) throw "missing data";

  const { userName, password } = loginDetails;

  const userExists = await userController.readUserForCheckPassword({
    userName,
  });

  if (!userExists) throw { code: 0, message: "user not exists" };

  const passValidated = await bcrypt.compare(password, userExists.password);

  if (!passValidated) throw { code: 0, message: "Password is incorrect" };

  const token = await auth.createToken(userExists._id);

  userExists.password = undefined;

  return { userExists, token };
}

module.exports = { register, login };
