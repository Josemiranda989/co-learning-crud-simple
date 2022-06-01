const path = require("path");
const fs = require("fs");

// variable con la ruta del archivo motos.json
let motosFilePath = path.join(__dirname, "../database/motos.json");
// lo convertimos en un objeto en base a motoFilePath
let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));

const productsController = {
  // Listado de productos
  list: (req, res) => {
    let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));
    res.render("products",{motos});
  },
  // Renderizado del formulario de creación
  createForm: (req, res) => {
    res.render("create");
  },
  // Proceso de creación
  createProcess: (req, res) => {
    let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));
    
    let nuevoProducto = {
      // tomamos el ultimo producto y le sumamos 1
      id: motos[motos.length - 1].id + 1,
      // agregamos a cada campo lo que viene del formulario
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      descuento: req.body.descuento,
      // por el momento agregamos una foto default
      imagen: "defaultImg.jpg",
    };

    // agregamos ese producto nuevo al array de productos
    motos.push(nuevoProducto);
    // escribimos nuevamente el archivo con el array de productos actualizado
    let nuevoProductoGuardar = JSON.stringify(motos, null, 2);
    fs.writeFileSync(motosFilePath, nuevoProductoGuardar, "utf-8");
    // redireccionamos al listado de productos
    res.redirect("/products");
  },

  detail: (req, res) => {
    let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));
    let id = req.params.id;

    let miMoto;
    motos.forEach((moto) => {
      if (moto.id == id) {
        miMoto = moto;
      }
    });
    res.render("detail", { miMoto });
  },

  editForm: (req, res) => {
    let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));

    const id = req.params.id;
    let motoEditar = motos.find((moto) => moto.id == id);
    res.render("edit", { motoEditar });
  },

  editProcess: (req, res) => {
    let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));

    req.body.id = req.params.id;
    req.body.imagen = req.file ? req.file.filename : req.body.oldImagen;
    let motosUpdate = motos.map((moto) => {
      if (moto.id == req.body.id) {
        return (moto = req.body);
      }
      return moto;
    });
    let motoActualizar = JSON.stringify(motosUpdate, null, 2);
    fs.writeFileSync(motosFilePath, motoActualizar, "utf-8");
    res.redirect(`/products/detail/${req.body.id}`);
  },

  delete: (req, res) => {
    /* borrar moto del listado json */
    let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));
    let id = req.params.id;
    let motosDelete = motos.filter((moto) => moto.id != id);
    let motoBorrar = JSON.stringify(motosDelete, null, 2);
    fs.writeFileSync(motosFilePath, motoBorrar, "utf-8");
    /* redireccionar al listado de motos */
    res.redirect("/products");
  },
};

module.exports = productsController;
