var database = require("../database/config")

function buscarCategoria(categoria) {
    console.log("ACESSEI O CATEGORIA MODEL para buscar a categoria: " + categoria)
    var instrucaoSql = `
        SELECT 
             m.titulo, 
            m.descricao, 
            m.caminho_capa, 
            m.caminho_arquivo, 
            c.nome_categoria 
        FROM maravilha m
        JOIN maravilha_categoria mc
        ON mc.fk_maravilha = m.id_maravilha
        JOIN categoria c
        ON mc.fk_categoria = c.id_categoria
        WHERE c.nome_categoria = '${categoria}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarCategoria
};