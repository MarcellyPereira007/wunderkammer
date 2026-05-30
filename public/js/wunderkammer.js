// navegar nas categorias com as setas
const listaCategorias = [
    'Tecnologia', 'Linguística', 'Filosofia', 'Quadrinhos',
    'Cultura da internet', 'Cinema & TV', 'Animes', 'Literatura',
    'Saúde mental', 'Jogos', 'Variedades', 'Listas', 'Marcelly', 'Ensaios'
];

let indiceCategoriaAtual = 0;

function voltarArmario() {
    fetch('../janelas/wunderkammer.html')
    .then(function(resposta) {
        if (resposta.ok) {
            resposta.text().then(function(html) {
                document.getElementById('janela-conteudo').innerHTML = html;
            });
        }
    }).catch(function(erro) {
        console.log(erro);
    });
}

function abrirCategoria(nomeDaCategoria) {
    indiceCategoriaAtual = listaCategorias.indexOf(nomeDaCategoria);

    document.getElementById('janela-conteudo').innerHTML = 
    `<div class="tela-lista-posts">
        <div class="headerWunderkammer">
            <img src="/assets/img/home/wunderkammer.png" alt="Wunderkammer" onclick="voltarArmario()">
        </div>
        <div class="firoliro"><img src="/assets/img/home/firoliro.png"></div>
        <div class="header-categoria">
            <div class="titulo-categoria-container">
                <button class="seta-categoria" onclick="mudarCategoria(-1)"></button>
                <h2 id="nome-categoria-atual">${nomeDaCategoria}</h2>
                <button class="seta-categoria seta-direita" onclick="mudarCategoria(1)"></button>
            </div>
        </div>
        <div class="container-cards" id="container-cards"></div>
    </div>`;

    fetch('/categorias/buscar/' + nomeDaCategoria)
    .then(function(resposta) {
        if (resposta.ok) {
            resposta.json().then(function(listaMaravilhas) {

                // Pegar o container onde os cards vão ficar
                let containerCards = document.getElementById('container-cards');

                // Tirar o conteúdo mocado dos 3 cards do Blue Prince
                containerCards.innerHTML = '';

                // Criar um card pra cada maravilha
                for (let i = 0; i < listaMaravilhas.length; i++) {
                    let maravilha = listaMaravilhas[i];

                    let card = `<div class="card-post" onclick="abrirPost('${maravilha.caminho_arquivo}')">
                        <div class="card-imagem">
                            <img src="${maravilha.caminho_capa}" alt="${maravilha.titulo}">
                        </div>
                        <div class="card-texto">
                            <h3>${maravilha.titulo}</h3>
                            <p>${maravilha.descricao}</p>
                        </div>
                    </div>`;

                    containerCards.innerHTML += card;
                }
            });
        } else {
            console.log("Nenhuma maravilha encontrada nessa categoria");
        }
    }).catch(function(erro) {
        console.log(erro);
    });
}

function abrirPost(caminho_arquivo) {
    fetch(caminho_arquivo)
    .then(function(resposta) {
        if (resposta.ok) {
            resposta.text().then(function(conteudoPost) {
                document.getElementById('janela-conteudo').innerHTML = conteudoPost;

                if (caminho_arquivo.includes('blueprince')) {
                    montarCarrosselInfinito();
                    iniciarMinijogoParlor();
                }
            });
        }
    }).catch(function(erro) {
        console.log(erro);
    });
}

function mudarCategoria(direcao) {
    indiceCategoriaAtual += direcao;

    if (indiceCategoriaAtual >= listaCategorias.length) {
        indiceCategoriaAtual = 0;
    } else if (indiceCategoriaAtual < 0) {
        indiceCategoriaAtual = listaCategorias.length - 1;
    }

    let novaCategoria = listaCategorias[indiceCategoriaAtual];
    abrirCategoria(novaCategoria);
}