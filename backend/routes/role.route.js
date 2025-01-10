const express = require("express");
const { createRole, getRoles, updateRole, deleteRole } = require("../controllers/role.controller");

const route = express.Router();

route.post("/create", createRole);
route.get("/:id?", getRoles); 
route.patch("/:id", updateRole);
route.delete("/:id", deleteRole);

module.exports = route;
