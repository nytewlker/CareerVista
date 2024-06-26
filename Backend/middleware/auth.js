const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  

  // Check if not token
  if (!token) {
    return res.json({status:401, msg: "No token, authorization denied" });
  }
  // Verify token
  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.recruiter || decoded.employee;
    next();
  } catch (err) {
    res.json({status: 401, msg: "Token is not valid" });
  }
};
