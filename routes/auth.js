import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/usersLogin.js";
import validation from "../configs/validation.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validation.registerValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ status: res.statusCode, message: error.details[0].message });

  const userExist = await Users.findOne({ username: req.body.username });
  if (userExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "username sudah digunakan!",
    });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const userRegister = new Users({
    username: req.body.username,
    password: hashPassword,
  });

  try {
    const saveUser = await userRegister.save();
    res.json(saveUser);
  } catch (e) {
    res.status(400).json({
      status: res.statusCode,
      message: "gagal membuat user baru",
    });
  }
});

router.post("/login", async (req, res) => {
  const userExist = await Users.findOne({ username: req.body.username });
  if (!userExist)
    return res.status(400).json({
      status: res.statusCode,
      message: "username does not exist",
    });

  const validPass = await bcrypt.compare(req.body.password, userExist.password);
  if (!validPass)
    return res.status(400).json({
      status: res.statusCode,
      message: "your password is incorrect",
    });

  const token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).json({ status: res.statusCode, token });
});

export default router;
