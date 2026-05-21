-- CREATE DATABASE wunderkammer;
-- USE wunderkammer;
-- DROP DATABASE wunderkammer;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(45) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(45) NOT NULL,
    dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Quiz compatibilidade
CREATE TABLE compatibilidade (
    id_compatibilidade INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT UNIQUE NOT NULL,
    taxa_compatibilidade DECIMAL(5,2) NOT NULL, 
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
    descricao VARCHAR(255) DEFAULT 'Sem descrição',
    caminho_capa VARCHAR(100),
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

-- Interesses do usuario
CREATE TABLE usuario_categoria (
    fk_usuario INT,
    fk_categoria INT,
    PRIMARY KEY (fk_usuario, fk_categoria),
    FOREIGN KEY (fk_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (fk_categoria) REFERENCES categoria(id_categoria)
);

INSERT INTO categoria (nome_categoria) VALUES 
('Tecnologia'),
('Linguística'),
('Filosofia'),
('Quadrinhos'),
('Cultura da internet'),
('Cinema & TV'),
('Animes'),
('Literatura'),
('Saúde mental'),
('Jogos'),
('Variedades'),
('Listas'),
('Marcelly'),
('Ensaios'),
('Pesca');

-- Mostrar nome da maravilha, nome da categoria
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
WHERE c.nome_categoria = 'Jogos';

INSERT INTO maravilha (titulo, descricao, caminho_capa, caminho_arquivo) VALUES 
('Blue Prince',
'Blue Prince é um jogo indie de mistério e puzzle, onde você herda uma mansão misteriosa e precisa descobrir a localização secreta do 46º quarto, mesmo a casa possuindo apenas 45 cômodos',
'../assets/img/home/capas/blueprince.png',
'../janelas/posts/blueprince.html'),
('Sandman',
'Sandman é uma HQ escrita por Neil Gaiman e publicada pela DC Comics (via selo Vertigo) entre 1989 e 1996. Conta sobre Sonho (ou Morfeu), um dos sete Perpétuos, entidades imortais que personificam aspectos fundamentais da vida',
'../assets/img/posts/capas/sandman.jpg',
'../janelas/posts/sandman.html'),
('Dicas de pesca','Saiba como montar seu primeiro kit de pesca, itens indispensáveis, itens proibidos, técnicas de pesca, iscas coringa, quais são os nós mais utilizados, como brigar com o peixe e as etiquetas básicas de um pescador',
'../assets/img/posts/capas/blueprince.png',
'../janelas/posts/pesca.html');

INSERT INTO maravilha_categoria (fk_maravilha, fk_categoria) VALUES (1,10);
INSERT INTO maravilha_categoria (fk_maravilha, fk_categoria) VALUES (2,4);
INSERT INTO maravilha_categoria (fk_maravilha, fk_categoria) VALUES (3,11);
INSERT INTO maravilha_categoria (fk_maravilha, fk_categoria) VALUES (3,15);

-- Pega as maravilhas e em que categoria elas estao
select m.titulo as 'Nome da maravilha', c.nome_categoria as 'Categoria'
from maravilha m
join maravilha_categoria mc
on  mc.fk_maravilha = m.id_maravilha
join categoria c
on mc.fk_categoria = c.id_categoria;

-- Pega a recomendaçaõ do user
select u.username as 'Nome do usuário', r.tema as 'Tema', r.descricao as 'Descrição'
from usuario u
join recomendacao r
on  r.fk_usuario = u.id_usuario;