const userController = require("../DL/controller/user.controller");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const saltRounds = 10;

const getUser = async (filter) => {
  const user = await userController.read(filter);
  if (!user) throw errMessage.USER_NOT_FOUND;
  const isActive = await userController.read({
    email: user.email,
    isActive: true,
  });
  if (!isActive) throw errMessage.USER_NOT_FOUND;
  return user;
};

async function register(data) {
  if (
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.password ||
    !data.phoneNumber
  )
    throw "missing data";

  const userExist = await userController.read({ email: data.email });

  if (userExist) throw "user is exist";

  const hashedPass = await bcrypt.hash(data.password, saltRounds);

  data.password = hashedPass;

  const newUser = await userController.create(data);

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
  if (!data.email || !data.password) throw "missing data";

  const userExists = await userController.read(
    { email: data.email },
    "+password"
  );

  if (!userExists) throw "user not exists";

  if (userExists.isActive === "false") throw "user not exists";

  const { password } = data;

  const passValidated = await bcrypt.compare(password, userExists.password);

  if (!passValidated) throw "Password is incorrect";

  const token = await auth.createToken({
    _id: userExists._id,
    email: userExists.email,
    permission: userExists.permission,
  });

  userExists.password = undefined;

  return {
    user: userExists.firstName,
    token,
  };
}

module.exports = { register, login, getUser };
