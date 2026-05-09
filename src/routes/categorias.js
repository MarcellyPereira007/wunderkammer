var express = require("express");
var router = express.Router();

var categoriaController = require("../controllers/categoriaController");

router.get("/buscar/:nomeCategoria", function (req, res) {
    categoriaController.buscarCategoria(req, res);
});

module.exports = router;