var database = require("../database/config");

function buscarCategorias() {
    var instrucao = `
        SELECT id_categoria, nome_categoria 
        FROM categoria 
        WHERE nome_categoria NOT IN ('Variedades', 'Listas', 'Marcelly');
    `;
    return database.executar(instrucao);
}

function contarCategoriasValidas() {
    var instrucao = `
        SELECT count(id_categoria) as total_validas 
        FROM categoria 
        WHERE nome_categoria NOT IN ('Variedades', 'Listas', 'Marcelly');
    `;
    return database.executar(instrucao);
}

function salvarCompatibilidade(fkUsuario, taxaCompatibilidade) {
    var instrucao = `
        INSERT INTO compatibilidade (fk_usuario, taxa_compatibilidade, dt_resposta) 
        VALUES (${fkUsuario}, ${taxaCompatibilidade}, NOW())
        ON DUPLICATE KEY UPDATE 
        taxa_compatibilidade = VALUES(taxa_compatibilidade),
        dt_resposta = NOW();
    `;
    return database.executar(instrucao);
}

function limparInteresses(fkUsuario) {
    var instrucao = `DELETE FROM usuario_categoria WHERE fk_usuario = ${fkUsuario};`;
    return database.executar(instrucao);
}

function inserirInteresses(fkUsuario, categoriasMarcadas) {
    var valuesInsert = [];
    for (let i = 0; i < categoriasMarcadas.length; i++) {
        valuesInsert.push(`(${fkUsuario}, ${categoriasMarcadas[i]})`);
    }
    var textoValues = valuesInsert.join(', ');
    
    var instrucao = `
        INSERT INTO usuario_categoria (fk_usuario, fk_categoria) 
        VALUES ${textoValues};
    `;
    return database.executar(instrucao);
}

function salvarRecomendacao(fkUsuario, tema, descricao) {
    var instrucao = `
        INSERT INTO recomendacao (fk_usuario, tema, descricao, dataEnvio) 
        VALUES (${fkUsuario}, '${tema}', '${descricao}', NOW());
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarCategorias,
    contarCategoriasValidas,
    salvarCompatibilidade,
    limparInteresses,
    inserirInteresses,
    salvarRecomendacao
};