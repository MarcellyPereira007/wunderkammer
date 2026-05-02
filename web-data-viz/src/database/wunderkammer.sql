CREATE DATABASE wunderkammer;
USE wunderkammer;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compatibilidade (
    id_compatibilidade INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    pontuacao INT NOT NULL,
    total_assuntos INT NOT NULL,
    dt_resposta DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE recomendacao (
    id_recomendacao INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL,
    tema VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    dataEnvio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario)
);

-- Tabelas pro sistema de tags
CREATE TABLE maravilha (
    id_maravilha INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    caminho_arquivo VARCHAR(255) NOT NULL,
    data_publicacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE maravilha_categoria (
    fk_maravilha INT,
    fk_categoria INT,
    PRIMARY KEY (fk_maravilha, fk_categoria), 
    FOREIGN KEY (fk_maravilha) REFERENCES maravilha(id_maravilha),
    FOREIGN KEY (fk_categoria) REFERENCES categoria(id_categoria)
);

-- Quiz de detalhes
CREATE TABLE interesse (
    id_interesse INT PRIMARY KEY AUTO_INCREMENT,
    nome_interesse VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuario_interesse (
    fk_usuario INT,
    fk_interesse INT,
    PRIMARY KEY (fk_usuario, fk_interesse),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_interesse) REFERENCES interesse(id_interesse)
);

-- Usuário pro site
CREATE USER 'mimiomia_admin'@'localhost' IDENTIFIED BY 'vaquinhagordinhafofinha123';
GRANT ALL PRIVILEGES ON wunderkammer.* TO 'mimiomia_admin'@'localhost';
FLUSH PRIVILEGES;

-- DROP DATABASE wunderkammer;