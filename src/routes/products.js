const express = require("express");
const router = express.Router();

/* Controlador */
const productsController = require("../controllers/products");

/* Listado de productos */
router.get("/", productsController.list);

/* Detalle de un producto */
router.get("/detail/:id", productsController.detail);

/* Formulario de creación. */
router.get("/create", productsController.createForm);
router.post("/create", productsController.createProcess);

/* Formulario de edición */
router.get("/edit/:id", productsController.editForm);
router.put("/edit/:id", productsController.editProcess);

/* Eliminar producto */
router.delete("/delete/:id", productsController.delete);

module.exports = router;
