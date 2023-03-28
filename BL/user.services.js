const userController = require("../DL/controller/user.controller");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const saltRounds = Number(process.env.SALT_ROUNDS);
const { errController } = require("../errController");
const {
  htmlPageForResetPass,
} = require("../BL/helpers/nodeMailer/views/htmlPages");

const sendEmail = require("./helpers/nodeMailer/nodeMailer");

async function getUser(filter, select) {
  const user = await userController.read(filter, select);
  if (!user) throw errController.USER_NOT_FOUND;
  return { _id: user._id, image: user.imageData };
}

async function register(data) {
  const userExist = await userController.read({ email: data.email });

  if (userExist) throw errController.USER_ALREADY_REGISTERED;

  const hashedPass = await bcrypt.hash(data.password, saltRounds);

  const newUser = await userController.create({
    userFirstName: data.firstName,
    userLastName: data.lastName,
    email: data.email,
    password: hashedPass,
    phoneNumber: data.phoneNumber,
  });

  const token = await auth.createToken({
    _id: newUser._id,
    email: newUser.email,
    permission: newUser.permission,
  });

  newUser.password = undefined;

  return {
    user: newUser.firstName,
    token,
  };
}

async function login(data) {
  const userExists = await userController.read(
    { email: data.email },
    "+password"
  );

  if (!userExists) throw errController.USER_NOT_FOUND;

  const { password } = data;

  const passValidated = await bcrypt.compare(password, userExists.password);

  if (!passValidated) throw errController.PASSWORDS_ARE_NOT_CORRECT;

  const token = await auth.createToken({
    _id: userExists._id,
    email: userExists.email,
    permission: userExists.permission,
  });

  userExists.password = undefined;

  return {
    image: userExists.imageData,
    user: userExists.userFirstName,
    token,
  };
}

async function deleteUser(data) {
  const user = await userController.read(data);
  if (!user) throw errController.USER_NOT_FOUND;
  userController.del(data);
  return true;
}

async function getUserForResetPass(email) {
  console.log(email);
  const user = await getUser({ email });
  const token = bcrypt.hashSync(String(Math.random() * 2345), saltRounds);
  const done = await userController.update(user._id, {
    resetPass: token,
  });

  if (!done) throw "create token for change pass failed";

  const url = `${process.env.BASE_URL}/renew/?token=${token}`;

  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "My Playlist reset password",
    text: "You have requested to reset your password",
    html: htmlPageForResetPass(url),
  };

  await sendEmail(emailOptions);

  return "email send to reset password";
}

async function changePasswordByToken(data) {
  const equalPass = data.secondPassword === data.firstPassword;
  if (!equalPass) throw errController.PASSWORDS_ARE_NOT_EQUAL;

  const userExist = await getUser({ resetPass: data.token }, "imageData");

  const hashedPass = await bcrypt.hash(data.firstPassword, saltRounds);

  await userController.update(userExist._id, {
    password: hashedPass,
    resetPass: null,
  });

  const token = await auth.createToken({
    _id: userExist._id,
    email: userExist.email,
    permission: userExist.permission,
  });

  return {
    userExist,
    userToken: token,
  };
}

module.exports = {
  register,
  login,
  getUser,
  deleteUser,
  getUserForResetPass,
  changePasswordByToken,
};
