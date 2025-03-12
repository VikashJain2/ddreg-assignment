import userModel from "../models/user.model.js";
import userServices from "../services/user.service.js";
import jwt from "jsonwebtoken";
const generateToken = async (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const response = await userServices.createUser({
      username,
      email,
      password,
    });

    if (response.success === false) {
      return res
        .status(400)
        .json({ success: false, message: response.message });
    }

    delete response.newUser._doc.password;
    const token = await generateToken(response.newUser);

    return res
      .cookie("token", token, { httpOnly: true, secure: true })
      .status(201)
      .json({
        // newUser: response.newUser,
        token,
        success: true,
        message: response.message,
      });
  } catch (error) {
    // console.log(error);

    return res
      .status(500)
      .json({ success: false, message: error.message || error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const response = await userServices.loginUser({ email, password });
    if (response.success === false) {
      return res
        .status(400)
        .json({ success: false, message: response.message });
    }

    const token = await generateToken(response.user);
    // console.log("token--->", token)
    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
        // user: response.user,
        token
      });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message || error,
    });
  }
};

const fetchUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;

    const fetchUser = await user.findById(userId).select("-password");

    if (!fetchUser) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, fetchUser });
  } catch (error) {
    console.log(error);

    return res.json({ success: false, message: "Something went wrong" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during logout",
      error: error.message || error,
    });
  }
};

export { registerUser, loginUser, fetchUserInfo, logoutUser };
