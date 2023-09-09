const express = require("express");
const userRouter = express.Router();
const { registerUser, login } = require("../controllers/users.controllers");

userRouter.post("/register", registerUser);
userRouter.post("/login", login);

module.exports = userRouter;
