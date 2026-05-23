const dashboardModel = require("../models/dashboardModel");

// Usuario
function buscarTaxaUsuario(req, res) {
    let idUsuario = req.params.idUsuario;

    dashboardModel.buscarDadosUsuario(idUsuario)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarSetoresUsuario(req, res) {
    let idUsuario = req.params.idUsuario;

    dashboardModel.buscarSetoresUsuario(idUsuario)
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// Geral
function buscarKpisGerais(req, res) {
    dashboardModel.buscarKpisGerais()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRanking(req, res) {
    dashboardModel.buscarRanking()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRecomendacoes(req, res) {
    dashboardModel.buscarRecomendacoes()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDadosGrafico(req, res) {
    dashboardModel.buscarDadosGrafico()
        .then(function(resultado) {
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarTaxaUsuario,
    buscarSetoresUsuario,
    buscarKpisGerais,
    buscarRanking,
    buscarRecomendacoes,
    buscarDadosGrafico
};