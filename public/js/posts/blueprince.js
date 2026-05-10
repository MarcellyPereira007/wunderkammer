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
    const modal = document.getElementById('modal-imagem');
    const imgAmpliada = document.getElementById('img-ampliada');

    if (modal && imgAmpliada) {
        modal.style.display = 'flex';
        imgAmpliada.src = caminhoSrc;
    }
}

function fecharImagem() {
    const modal = document.getElementById('modal-imagem');
    if (modal) {
        modal.style.display = 'none';
    }
}