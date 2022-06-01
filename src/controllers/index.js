const path = require("path");
const fs = require("fs");

// variable con la ruta del archivo motos.json
let motosFilePath = path.join(__dirname, "../database/motos.json");
// lo convertimos en un objeto en base a motoFilePath
let motos = JSON.parse(fs.readFileSync(motosFilePath, "utf-8"));

const indexController = {
    index: function (req, res) {
    //res.sendFile(path.resolve(__dirname, '..', 'views','web','index.html'));
    res.render("index", {motos});
  },
};

module.exports = indexController;