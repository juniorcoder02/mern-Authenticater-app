const UserModel = require("../models/user"); //require usermodel
const bcrypt = require("bcrypt"); //require bcrypt
const jwt = require("jsonwebtoken"); //require jsonwebtoken

const signup = async (req, res) => {
  //signup route
  try {
    const { name, email, password } = req.body; //fetch data from server
    const user = await UserModel.findOne({ email }); //find if user already exists
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exists", success: false });
    }
    const newUser = new UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10); // hash password with random salt
    await newUser.save(); // save new user in database
    res.status(201).json({ message: "signup successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
const login = async (req, res) => {
  //login route
  try {
    const { email, password } = req.body; //fetch data from server
    const user = await UserModel.findOne({ email }); //find if user already exists
    const errorMsg = "Auth failed email or password is wrong";
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password); //compare password
    if (!isMatch) { //if password is wrong
      return res.status(403).json({ message: errorMsg, success: false });
    }
    // create jwt token
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({
        message: "login successfully",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
module.exports = {
  signup,
  login,
};
