const express = require("express");
const route = express.Router();
const { userSignUp, userLogin, getUser, updateUser, deleteUser } = require("../controllers/user.controller");

route.post("/signUp", userSignUp);
route.post("/login", userLogin);
route.get("/user/:id", getUser);
route.put("/user/update", updateUser);
route.delete("/user/delete", deleteUser);

module.exports = route;
