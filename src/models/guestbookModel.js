var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT id, nome, mensagem, data_cadastro FROM guestbook ORDER BY id DESC`;

    return database.executar(instrucaoSql);
}

function enviar(nome, mensagem) {
    var instrucaoSql = `INSERT INTO guestbook (nome, mensagem) VALUES ('${nome}', '${mensagem}')`;

    return database.executar(instrucaoSql);
}

module.exports = { 
    listar, 
    enviar 
};