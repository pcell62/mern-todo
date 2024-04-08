import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(400).json({ error: "Authorization token required" });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    res.status(400).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
