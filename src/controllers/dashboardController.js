var dashboardModel = require("../models/dashboardModel");

function buscarDadosDoUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    Promise.all([
        dashboardModel.buscarDadosUsuario(idUsuario),
        dashboardModel.buscarSetoresUsuario(idUsuario)
    ])
    .then(function(resultados) {
        
        var taxa = resultados[0].length > 0 ? resultados[0][0].taxa_compatibilidade : null;
        var categorias = resultados[1];

        res.status(200).json({
            taxa: taxa,
            setores: categorias
        });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosGlobais(req, res) {
    Promise.all([
        dashboardModel.buscarKpisGerais(),
        dashboardModel.buscarRanking(),
        dashboardModel.buscarRecomendacoes(),
        dashboardModel.buscarDadosGrafico()
    ])
    .then(function(resultados) {
        res.status(200).json({
            kpis: resultados[0][0],
            ranking: resultados[1],
            recomendacoes: resultados[2],
            grafico: resultados[3] 
        });
    })
    .catch(function(erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarDadosDoUsuario,
    buscarDadosGlobais
};