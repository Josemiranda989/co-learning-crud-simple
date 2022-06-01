const express = require("express");
const router = express.Router();

/* Controlador */
const usersController = require("../controllers/users");

/* Vista principal. */
router.get("/login", usersController.login);

/* Registro */
router.get("/register", usersController.register);

module.exports = router;
