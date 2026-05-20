var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/usuario/:idUsuario", function (req, res) {
    dashboardController.buscarDadosDoUsuario(req, res);
});

router.get("/global", function (req, res) {
    dashboardController.buscarDadosGlobais(req, res);
});

module.exports = router;