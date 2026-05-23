var quizModel = require("../models/quizModel");

function listarCategorias(req, res) {
    quizModel.buscarCategorias()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function salvarResultado(req, res) {
    var fkUsuario = req.body.fk_usuario;
    var categoriasMarcadas = req.body.categorias;

    if (fkUsuario == undefined || categoriasMarcadas == undefined) {
        return res.status(400).send("Erro, algum dado faltando");
    }

    // pegar o total pra calcular
    quizModel.contarCategoriasValidas()
        .then(function (resultadoTotal) {
            var totalValidas = resultadoTotal[0].total_validas; 
            var quantidadeMarcada = categoriasMarcadas.length; 
            
            // Regra de 3 basica
            var taxaCompatibilidade = ((quantidadeMarcada / totalValidas) * 100).toFixed(2); 

            // salva em cima
            return quizModel.salvarCompatibilidade(fkUsuario, taxaCompatibilidade)
                .then(function () {
                    // limpa a tabl intermediaria 
                    return quizModel.limparInteresses(fkUsuario);
                })
                .then(function () {
                    // coloca as novas
                    if (quantidadeMarcada > 0) {
                        return quizModel.inserirInteresses(fkUsuario, categoriasMarcadas);
                    }
                })
                .then(function () {
                    // mensagem de sucesso
                    res.status(200).json({ 
                        mensagem: "Quiz foi processado",
                        taxa: taxaCompatibilidade 
                    });
                });

        })
        .catch(function (erro) {
            console.log("Erro ao salvar quiz: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// função de recomendação
function enviarRecomendacao(req, res) {
    var fkUsuario = req.body.fk_usuario;
    var tema = req.body.tema;
    var descricao = req.body.descricao;

    if (fkUsuario == undefined || tema == undefined || tema == "" || descricao == undefined || descricao == "") {
        return res.status(400).send("Preencha o tema e a descrição da recomendação");
    }

    quizModel.salvarRecomendacao(fkUsuario, tema, descricao)
        .then(function () {
            res.status(200).json({ mensagem: "Recomendação enviada" });
        })
        .catch(function (erro) {
            console.log("Erro ao salvar recomendação: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarCategorias,
    salvarResultado,
    enviarRecomendacao 
};