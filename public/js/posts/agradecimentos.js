let fotoAtual = "";

function abrirFoto(idFoto) {

    document.getElementById(idFoto).style.display = 'inline-block';
    fotoAtual = idFoto;
    document.getElementById('modal-fotos').classList.add('aberto');
}

function fecharFoto() {
    if (fotoAtual != "") {
        document.getElementById(fotoAtual).style.display = 'none';
        fotoAtual = "";
    }
    document.getElementById('modal-fotos').classList.remove('aberto');
}