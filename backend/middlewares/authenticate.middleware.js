const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/users.model");
const { redisClient } = require("../server/redis");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // verify our token with decoded token by userID
    const decodedtoken = await jwt.verify(token, "refreshtokensecret");
    const { userID } = decodedtoken;

    // check if user is exists
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(401).json({ msg: "Unauthorised User" });
    }

    if (!decodedtoken)
      return res
        .status(403)
        .send({ msg: "authentication failed, please login again" });

    const isTokenBlacklisted = await redisClient.get(decodedtoken.userID);

    if (isTokenBlacklisted)
      return res.status(403).send({ msg: "token logout , Please login again" });

    req.body.userID = decodedtoken.userID;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "unauthorized" });
  }

};

module.exports = {
  authMiddleware,
};
