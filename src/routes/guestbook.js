var express = require("express");
var router = express.Router();

var guestbookController = require("../controllers/guestbookController");

router.post("/enviar", function (req, res) {
    guestbookController.enviar(req, res);
});

router.get("/listar", function (req, res) {
    guestbookController.listar(req, res);
});

module.exports = router;