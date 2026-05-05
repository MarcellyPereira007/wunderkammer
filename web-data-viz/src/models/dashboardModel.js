var database = require("../database/config");

function buscarDadosDashboard() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(id_usuario) FROM usuario) as totalUsuarios,
            (SELECT COUNT(id_maravilha) FROM maravilha) as totalPosts;
    `;
    return database.executar(instrucaoSql);
}

function buscarUltimosUsuarios() {
    var instrucaoSql = `
        SELECT 
            id_usuario AS id, 
            username AS nome, 
            DATE_FORMAT(dt_cadastro, '%d/%m/%Y') AS data_cadastro 
        FROM usuario 
        ORDER BY id_usuario DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosDashboard,
    buscarUltimosUsuarios
};