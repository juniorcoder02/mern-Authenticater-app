const jwt = require("jsonwebtoken"); //require json web token 

// middleware to check user credentials
const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"]; //fetch authorization header
  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized , JWt token is required" });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET); //decode JWT token
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Unauthorized , JWt token wrong or required" });
  }
};
module.exports = ensureAuthenticated;
