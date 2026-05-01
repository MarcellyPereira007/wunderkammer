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


CREATE USER 'mimiomia_admin'@'localhost' IDENTIFIED BY 'vaquinhagordinhafofinha123';

GRANT ALL PRIVILEGES ON wunderkammer.* TO 'mimiomia_admin'@'localhost';

FLUSH PRIVILEGES;