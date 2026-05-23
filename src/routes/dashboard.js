const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/taxa/:idUsuario", function (req, res) {
    dashboardController.buscarTaxaUsuario(req, res);
});

router.get("/setores/:idUsuario", function (req, res) {
    dashboardController.buscarSetoresUsuario(req, res);
});

// dados globais
router.get("/kpis", function (req, res) {
    dashboardController.buscarKpisGerais(req, res);
});

router.get("/ranking", function (req, res) {
    dashboardController.buscarRanking(req, res);
});

router.get("/recomendacoes", function (req, res) {
    dashboardController.buscarRecomendacoes(req, res);
});

router.get("/grafico", function (req, res) {
    dashboardController.buscarDadosGrafico(req, res);
});

module.exports = router;