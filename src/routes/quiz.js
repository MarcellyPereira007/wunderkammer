var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/categorias", function (req, res) {
    quizController.listarCategorias(req, res);
});

router.post("/salvarResultado", function (req, res) {
    quizController.salvarResultado(req, res);
});

router.post("/recomendacao", function (req, res) {
    quizController.enviarRecomendacao(req, res);
});

module.exports = router;