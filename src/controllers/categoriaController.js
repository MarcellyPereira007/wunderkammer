var categoriaModel = require("../models/categoriaModel");
    
function buscarCategoria(req, res) {
    var categoria = req.params.nomeCategoria;

    if (categoria == undefined) {
        res.status(400).send("Sua categoria está undefined!");
    } else {

        categoriaModel.buscarCategoria(categoria)
            .then(
                function (resultadoBuscarCategoria) {
                    console.log(`\nResultados encontrados: ${resultadoBuscarCategoria.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoBuscarCategoria)}`); // transforma JSON em String

                    if (resultadoBuscarCategoria.length > 0) {
                        console.log(resultadoBuscarCategoria);

                        res.json(resultadoBuscarCategoria);

                    } else if (resultadoBuscarCategoria.length == 0) { 
                        res.status(404).send("Essa categoria não existe ou está vazia"); 
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao buscar a categoria! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
module.exports = {
    buscarCategoria
}