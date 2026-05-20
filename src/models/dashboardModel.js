var database = require("../database/config");

function buscarDadosUsuario(idUsuario) {
    var instrucao = `
        SELECT taxa_compatibilidade 
        FROM compatibilidade 
        WHERE fk_usuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function buscarSetoresUsuario(idUsuario) {
    var instrucao = `
        SELECT c.nome_categoria 
        FROM usuario_categoria uc
        JOIN categoria c ON uc.fk_categoria = c.id_categoria
        WHERE uc.fk_usuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function buscarKpisGerais() {
    var instrucao = `
        SELECT 
            (SELECT COUNT(id_usuario) FROM usuario) as total_visitantes,
            (SELECT AVG(taxa_compatibilidade) FROM compatibilidade) as media_geral;
    `;
    return database.executar(instrucao);
}

function buscarRanking() {
    var instrucao = `
        SELECT u.username, c.taxa_compatibilidade
        FROM compatibilidade c
        JOIN usuario u ON c.fk_usuario = u.id_usuario
        ORDER BY c.taxa_compatibilidade DESC;
    `;
    return database.executar(instrucao);
}

function buscarRecomendacoes() {
    var instrucao = `
        SELECT u.username, r.tema, r.descricao, r.dataEnvio
        FROM recomendacao r
        JOIN usuario u ON r.fk_usuario = u.id_usuario
        ORDER BY r.dataEnvio DESC;
    `;
    return database.executar(instrucao);
}

function buscarDadosGrafico() {
    var instrucao = `
        SELECT c.nome_categoria, COUNT(mc.fk_maravilha) as total_maravilhas
        FROM categoria c
        JOIN maravilha_categoria mc ON c.id_categoria = mc.fk_categoria
        GROUP BY c.id_categoria;
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosUsuario,
    buscarSetoresUsuario,
    buscarKpisGerais,
    buscarRanking,
    buscarRecomendacoes,
    buscarDadosGrafico
};