const express = require('express');
const router = express.Router();

/* Controlador */
const indexController = require('../controllers/index');

/* Vista principal. */
router.get("/", indexController.index);

module.exports = router;
