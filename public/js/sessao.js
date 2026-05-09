function validarSessao() {
    var username = sessionStorage.getItem('usuarioLogado');
    var idUsuario = sessionStorage.getItem('idUsuario');
    

    if (username != null && idUsuario != null) {
        
        var spanNome = document.getElementById("span_nome_usuario");
        
        if (spanNome != null) {
            spanNome.innerHTML = username;
        }
        
    } else {
        window.location = "index.html"; 
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "index.html";
}