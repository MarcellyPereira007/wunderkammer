const jsonImagensBluePrince = [
    "../../../assets/img/posts/blueprince/Carrossel/seguranca.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/nextday.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/capela.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/dog.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/relogio.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/cora.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/draxus.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/redprincebook.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/network.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/alzara.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/trem.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/olhando.jpg",
    "../../../assets/img/posts/blueprince/Carrossel/escola.jpg"
];

function montarCarrosselInfinito() {
    //Pegar o elemento do carrossel pelo id do html
    let track = document.getElementById('carrossel');
    if (!track) return; // se nao tiver na tela do bp, ele não monta o carrossel
    let fotosHTML = '';

    //vai adidionando foto por foto do array pra montar o carrossel completo
    jsonImagensBluePrince.forEach(caminho => {
        fotosHTML += `
            <div class="galeria_frame" onclick="abrirImagem('${caminho}')">
                <img src="${caminho}">
            </div>
        `;
    });

    track.innerHTML = fotosHTML;
    //track.innerHTML = fotosHTML + fotosHTML;
}

function abrirImagem(caminhoSrc) {
    let modal = document.getElementById('modal-imagem');
    let imgAberta = document.getElementById('img-aberta');

    imgAberta.src = caminhoSrc;
    modal.style.display = 'flex';
}

function fecharImagem() {
    let modal = document.getElementById('modal-imagem');
    modal.style.display = 'none';
}

//puzzles

// lista de enigmas
const enigmasParlor = [
    { azul: "As gemas NÃO estão nesta caixa.", branca: "As gemas ESTÃO nesta caixa.", preta: "As gemas NÃO estão na caixa branca.", resposta: "azul" },
    { azul: "A caixa preta contém as gemas.", branca: "Esta caixa e a azul estão vazias.", preta: "Todas as três caixas estão vazias.", resposta: "preta" },
    { azul: "Apenas uma caixa diz a verdade.", branca: "A caixa preta contém as gemas.", preta: "A caixa azul contém as gemas.", resposta: "branca" },
    { azul: "As gemas estão na caixa preta.", branca: "As gemas estão na caixa branca.", preta: "Apenas uma caixa tem uma afirmação verdadeira.", resposta: "azul" },
    { azul: "As gemas estão na caixa branca.", branca: "A caixa com a afirmação falsa contém as gemas.", preta: "A afirmação na caixa branca é verdadeira.", resposta: "azul" },
    { azul: "As gemas não estão nesta caixa.", branca: "A caixa azul diz a verdade.", preta: "As gemas estão nesta caixa.", resposta: "branca" },
    { azul: "As gemas estão nesta caixa.", branca: "Esta afirmação não ajuda em nada.", preta: "As gemas estão na caixa azul.", resposta: "azul" },
    { azul: "Esta caixa está vazia.", branca: "Uma caixa com uma afirmação falsa está vazia.", preta: "Existem duas afirmações falsas.", resposta: "branca" }
];

let puzzleResolvido = false;
let respostaCorretaAtual = ""; // Vai guardar a cor da caixa premiada da rodada

function iniciarMinijogoParlor() {
    puzzleResolvido = false; 
    
    // Sorteia um enigma da lista
    const indiceSorteado = Math.floor(Math.random() * enigmasParlor.length); // 0 é incluido e 1 excluído
    const enigma = enigmasParlor[indiceSorteado];
    respostaCorretaAtual = enigma.resposta; 
    
    // Preenche as frases
    document.getElementById('blueboxstatement').innerText = enigma.azul;
    document.getElementById('whiteboxstatement').innerText = enigma.branca;
    document.getElementById('blackboxstatement').innerText = enigma.preta;
    
    // Reiniciar o jogo
    // Fecha as caixas
    document.getElementById('img-bluebox').src = '../../assets/img/posts/blueprince/box-blue-fechada.png';
    document.getElementById('img-whitebox').src = '../../assets/img/posts/blueprince/box-white-fechada.png';
    document.getElementById('img-blackbox').src = '../../assets/img/posts/blueprince/box-black-fechada.png';

    // esconde as gemas
    document.querySelectorAll('.gema-recompensa').forEach(gema => gema.classList.remove('aparecer'));
    // limpa statements
    document.getElementById('mensagem-puzzle').innerHTML = "";
    // some o botão
    document.getElementById('btn-reiniciar').style.display = "none";
}

function tentarCaixa(corSelecionada) {
    if (puzzleResolvido) return; // Pra jogar só uma vez

    const imgAzul = document.getElementById('img-bluebox');
    const imgBranca = document.getElementById('img-whitebox');
    const imgPreta = document.getElementById('img-blackbox');
    const mensagem = document.getElementById('mensagem-puzzle');

    // Abre só a caixa que a pessoa clicar
    if (corSelecionada === 'azul') {
        imgAzul.src = '../../assets/img/posts/blueprince/box-blue-aberta.png';
    } else if (corSelecionada === 'branca') {
        imgBranca.src = '../../assets/img/posts/blueprince/box-white-aberta.png';
    } else if (corSelecionada === 'preta') {
        imgPreta.src = '../../assets/img/posts/blueprince/box-black-aberta.png';
    }

    // Verifica se acertou
    if (corSelecionada === respostaCorretaAtual) {
        mensagem.innerHTML = "Você encontrou as gemas";
        mensagem.style.color = "#86bcd6"; 
        
        // Faz a gema ir pra caixa certa
        document.getElementById(`gema-${corSelecionada}`).classList.add('aparecer');
        
    } else {
        mensagem.innerHTML = "Caixa vazia";
        mensagem.style.color = "#6f130c"; 
    }

    puzzleResolvido = true; // Acaba a partida
    
    // Aparecer botão de recomeçar
    document.getElementById('btn-reiniciar').style.display = "inline-block";
}