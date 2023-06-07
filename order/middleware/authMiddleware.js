const { default: axios } = require("axios");
const AUTH_VERIFY_URL = "http://auth:3002/api/v1/verify";
const authMiddleware = async (req, res, next) => {
  const token = req.headers?.token;
  if (!token) {
    return res.status(401).end();
  }
  const response = await axios.get(AUTH_VERIFY_URL, {
    headers: {
      token,
    },
  });

  if (response.status !== 200) {
    return res.status(401).end();
  }
  return next();
};

module.exports = authMiddleware;
