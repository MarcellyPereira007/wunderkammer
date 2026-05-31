var guestbookModel = require("../models/guestbookModel");

function listar(req, res) {
    guestbookModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function enviar(req, res) {
    var nome = req.body.nome;
    var mensagem = req.body.mensagem;

    guestbookModel.enviar(nome, mensagem).then(function (resultado) {
        res.status(201).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listar,
    enviar
};