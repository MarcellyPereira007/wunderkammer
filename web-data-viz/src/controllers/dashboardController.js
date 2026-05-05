var dashboardModel = require("../models/dashboardModel");

function buscarKpis(req, res) {
    let dadosDashboard = {};

    dashboardModel.buscarDadosDashboard()
        .then(function (resultadoKpi) {
            dadosDashboard.totalUsuarios = resultadoKpi[0].totalUsuarios;
            dadosDashboard.totalPosts = resultadoKpi[0].totalPosts;
            return dashboardModel.buscarUltimosUsuarios();
        })
        .then(function (resultadoUsuarios) {
            dadosDashboard.ultimosCadastros = resultadoUsuarios;
            res.status(200).json(dadosDashboard);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarKpis
};