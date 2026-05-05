var database = require("../database/config");

function buscarDadosDashboard() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM usuario) as totalUsuarios,
            (SELECT COUNT(*) FROM maravilha) as totalPosts;
    `;
    return database.executar(instrucaoSql);
}

function buscarUltimosUsuarios() {
    var instrucaoSql = `
        SELECT id, nome, DATE_FORMAT(data_cadastro, '%d/%m/%Y') as data_cadastro 
        FROM usuario 
        ORDER BY id DESC;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarDadosDashboard,
    buscarUltimosUsuarios
};