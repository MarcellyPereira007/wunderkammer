const jsonImagensBluePrince = [
    "https://images.steamusercontent.com/ugc/17913927324377468284/B19AFC351B33BE9C3C7FD01D34B21D491B9D4473/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/16630571047816469365/93B142F37D1396D3F4D2DD626522D4EF40C3FB38/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/9743033167208969003/54DFC41C4AB351713A847310F02DF3D2A1040420/?imw=2048&imh=857&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    "https://images.steamusercontent.com/ugc/16269836013390225633/927173FEB33E0A38F4FACB7D77C154CE30881972/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/11602579205282298288/8BF67B36591FCBA5A582A2F6E70891FD258E881B/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/17145727665054479536/8549774176F31D93FDF3EE83BC3962B7198FA582/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/11121332071605017574/2541C9B86AB89217011E4494F93CE46814F4B57A/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/11921630349574973760/6DB461BE80A3627AB5DABF460FD3E99C1098071C/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/37825433789242562/71F15A40792FD9AA1672BE93DC8D8ABD19073CF8/?imw=2048&imh=1152&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    "https://images.steamusercontent.com/ugc/16906189740330027327/34463D951883ED58A3FD0348EB9BFC7D418446FF/?imw=2048&imh=1152&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    "https://images.steamusercontent.com/ugc/16615489054656173239/9363B74D2196C32BA0FD38244D6E71C6A2F85E27/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://images.steamusercontent.com/ugc/11964075190174013483/1C1B012DED24C497D6B449B49BB24BA9E5316A68/?imw=2048&imh=1152&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
    "https://images.steamusercontent.com/ugc/27692334672620082/13B800A06F1397755C73765856ACD0DE03D87AF2/?imw=2048&imh=1152&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true"
];

function montarCarrosselInfinito() {
    const track = document.getElementById('carrossel');
    if (!track) return; // se nao tiver na tela do bp

    let fotosHTML = '';

    jsonImagensBluePrince.forEach(caminho => {
        fotosHTML += `
            <div class="galeria_frame" onclick="abrirImagem('${caminho}')">
                <img src="${caminho}">
            </div>
        `;
    });

    track.innerHTML = fotosHTML + fotosHTML;
}

function abrirImagem(caminhoSrc) {
    let modal = document.getElementById('modal-imagem');
    let imgAmpliada = document.getElementById('img-ampliada');

    imgAmpliada.src = caminhoSrc;
    modal.style.display = 'flex';
}

function fecharImagem() {
    let modal = document.getElementById('modal-imagem');
    modal.style.display = 'none';
}

//puzzle

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
    const indiceSorteado = Math.floor(Math.random() * enigmasParlor.length);
    const enigma = enigmasParlor[indiceSorteado];
    respostaCorretaAtual = enigma.resposta; 
    
    // Preenche as frases
    document.getElementById('blueboxstatement').innerText = enigma.azul;
    document.getElementById('whiteboxstatement').innerText = enigma.branca;
    document.getElementById('blackboxstatement').innerText = enigma.preta;
    
    // Reiniciar o jogo
    // Fecha as caixas
    // esconde as gemas
    // limpa statements
    // some o botão
    document.getElementById('img-bluebox').src = '../../assets/img/posts/blueprince/box-blue-fechada.png';
    document.getElementById('img-whitebox').src = '../../assets/img/posts/blueprince/box-white-fechada.png';
    document.getElementById('img-blackbox').src = '../../assets/img/posts/blueprince/box-black-fechada.png';
    
    document.querySelectorAll('.gema-recompensa').forEach(gema => gema.classList.remove('aparecer'));
    
    document.getElementById('mensagem-puzzle').innerHTML = "";
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