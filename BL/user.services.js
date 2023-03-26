const userController = require("../DL/controller/user.controller");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const saltRounds = Number(process.env.SALT_ROUNDS);
const { errController } = require("../errController");

const getUser = async (filter) => {
  const user = await userController.read(filter);
  if (!user) throw errController.USER_NOT_FOUND;
  const isActive = await userController.read({
    email: user.email,
    isActive: true,
  });
  if (!isActive) throw errController.USER_NOT_FOUND;
  return user;
};

async function register(data) {
  const userExist = await userController.read({ email: data.email });

  if (userExist) throw errController.USER_ALREADY_REGISTERED;

  const hashedPass = await bcrypt.hash(data.password, saltRounds);

  data.password = hashedPass;

  const newUser = await userController.create({
    userFirstName: data.firstName,
    userLastName: data.lastName,
    email: data.email,
    password: data.password,
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

  if (userExists.isActive === "false") throw errController.USER_NOT_FOUND;

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
    user: userExists.firstName,
    token,
  };
}

module.exports = { register, login, getUser };
