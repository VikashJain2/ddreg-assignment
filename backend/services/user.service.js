import userModel from "../models/user.model.js";

const createUser = async ({ username, email, password }) => {
  try {
    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }
    const newUser = await userModel.create({
      username,
      email,
      password,
    });
    return { newUser, success: true, message: "User Resgistred successfully" };
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const findUser = await userModel.findOne({ email });

    if (!findUser) {
      return {
        success: false,
        message: "User with this email doesn't exist",
      };
    }
    const comparedPassword = await findUser.comparePassword(password);

    if (!comparedPassword) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    return {
      success: true,
      message: "User logged in successfully",
      user: findUser,
    };
  } catch (error) {
    throw new Error(error);
  }
};
export default { createUser, loginUser };
