let etapaTerminal = "esperando_comando"; // Separar as etapas com uma variável de controle de "estados"
let usuarioPendente = "";
let emailPendente = "";
let tentativasLogin = 0; // Contador de tentativas de senha

let inputTerminal;
let promptTexto;
let historicoSaidas;
let telaTodaTerminal;

//Seleciona os elementos assim q a tela carregar e coloca o ouvinte do enter no campo de entrada
window.onload = function () {
    inputTerminal = document.querySelector('#inputTerminal');
    promptTexto = document.querySelector('#promptTexto');
    historicoSaidas = document.querySelector('#historicoSaidas');
    telaTodaTerminal = document.querySelector('.terminal');

    inputTerminal.addEventListener('keydown', processarTecla);
};

function resetarTerminal() {
    etapaTerminal = "esperando_comando";
    usuarioPendente = "";
    emailPendente = "";
    promptTexto.innerHTML = "guest@mimiomia:~$ ";
    inputTerminal.type = "text";
}

// função pra quando a pessoa enviar o comando com enter
function processarTecla(evento) {
    if (evento.key == 'Enter') { //.key é uma propriedade usada com eventos q te retorna a representação em texto do caractere digitado nesse caso 
        let textoDigitado = inputTerminal.value.trim(); // Guarda o comando digitado

        registrarHistorico(textoDigitado);// Joga o comando pro histórico

        // Verifica qual etapa está pra guiar pro bloco certo
        if (etapaTerminal == "esperando_comando") {
            interpretarComando(textoDigitado);
        } else if (etapaTerminal == "cadastro_email") {
            processarEmailCadastro(textoDigitado);
        } else if (etapaTerminal == "cadastro_senha") {
            finalizarCadastro(textoDigitado);
        } else if (etapaTerminal == "login_senha") {
            processarLogin(textoDigitado);
        }

        limparTerminal();
    }
}


function registrarHistorico(texto) {
    if (inputTerminal.type == "password") { // Se nessa hora o ultimo input usado for o de senha, censura pra não mostrar no historico
        historicoSaidas.innerHTML += `<p class="texto-monitor">${promptTexto.innerHTML} ********</p>`;
    } else {
        historicoSaidas.innerHTML += `<p class="texto-monitor">${promptTexto.innerHTML} ${texto}</p>`;
    }
}

function limparTerminal() {
    inputTerminal.value = "";
    let areaTerminal = document.querySelector('.terminal');
    areaTerminal.scrollTop = areaTerminal.scrollHeight;
}

// Interpretar oq foi digitado
function interpretarComando(comando) {
    if (comando == "help") {
        exibirHelp();
    } else if (comando == "clear") {
        historicoSaidas.innerHTML = "";
    } else if (comando.startsWith("mimi adduser ")) {
        iniciarCadastro(comando);
    } else if (comando.startsWith("su ")) {
        iniciarLogin(comando);
    } else if (comando != "") {
        historicoSaidas.innerHTML += `<p class="texto-monitor">O comando "${comando}" não existe. Digite 'help' para ver a lista de comandos disponíveis.</p>`;
    }
}

function exibirHelp() {
    historicoSaidas.innerHTML += `
<pre class="texto-monitor">
[ LISTA DE COMANDOS ]
----------------------------------------------------------
help                  : Exibe essa mensagem.
mimi adduser [nome]  : Cria uma nova conta.
su [nome]             : Realiza login na conta.
clear                 : Limpa a tela do terminal.
----------------------------------------------------------

> DICA: Novos usuários devem começar escrevendo "mimi adduser"  
> seguido pelo nome de usuário desejado.
</pre>`;
}

// Lógica do cadastro
function iniciarCadastro(comando) {
    //Primeiro vou pegar o nome de usuário
    let usuario = comando;

    // Tirar o inicio e colocar como espaço vazio
    usuario = usuario.replace("mimi adduser ", "");

    // Usar o trim pra tirar os espaços vazios do começo e fim
    usuario = usuario.trim();

    // Fazer as validações do nome
    // Se está vazio
    if (usuario == "") {
        historicoSaidas.innerHTML += `<p class="texto-monitor">[ERRO] Digite um nome de usuário.</p>`;
    }
    // Se são só numeros (se é possivel converter pra number)
    else if (!isNaN(usuario)) {
        historicoSaidas.innerHTML += `<p class="texto-monitor">[ERRO] O nome de usuário não pode ser um número.</p>`;
    }
    // Se possui no minimo 3
    else if (usuario.length < 3) {
        historicoSaidas.innerHTML += `<p class="texto-monitor">[ERRO] O usuário deve conter no mínimo 3 caracteres</p>`;
    }
    // Senão pode atualizar a variavel q vai ser inserida no bd, muda a etapa do terminal
    else {
        usuarioPendente = usuario;
        etapaTerminal = "cadastro_email"
        promptTexto.innerHTML = `Insira um endereço de email para a conta "${usuario}": `
    }
}

function processarEmailCadastro(email) {
    if (email == "" || !email.includes("@") || !email.includes(".")) {
        historicoSaidas.innerHTML += `<p class="texto-monitor">[ERRO] Digite um email válido.</p>`;
        return;
    }
    emailPendente = email;
    etapaTerminal = "cadastro_senha";
    promptTexto.innerHTML = `Insira a senha para "${usuarioPendente}": `;
    inputTerminal.type = "password";
}

function finalizarCadastro(senha) {
    if (senha.length < 6) {
        historicoSaidas.innerHTML += `<p class="texto-monitor" style="color: red;">[ERRO] A senha deve ter pelo menos 6 caracteres.</p>`;
        return;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: usuarioPendente,
            emailServer: emailPendente,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            historicoSaidas.innerHTML += `<p class="texto-monitor">[SUCESSO] Usuário "${usuarioPendente}" registrado no mimiomia OS! Use "su ${usuarioPendente}" para fazer login.</p>`;
            resetarTerminal();
            limparTerminal();
        } else {
            historicoSaidas.innerHTML += `<p class="texto-monitor">[ERRO] Falha ao cadastrar. Verifique se o nome/email já existe no sistema.</p>`;
            resetarTerminal();
            limparTerminal();
        }
    }).catch(function (erro) {
        historicoSaidas.innerHTML += `<p class="texto-monitor">[CRÍTICO] Servidor offline ou erro de rede.</p>`;
        resetarTerminal();
        limparTerminal();
    });

}

// function listarUsuarios() {
//     historicoSaidas.innerHTML += `<p class="texto-monitor">[AVISO] A listagem local foi desativada. Os usuários agora estão protegidos no banco de dados.</p>`;
// }

// Lógica do Login
function iniciarLogin(comando) {
    let nomeLogin = comando.replace("su ", "").trim(); // Faz direto o processo de tirar o comando e deixar só o user

    // Se o usuário estiver cadastrado, deixa o usuário pendente de confirmação atualizado e inicia o contador em 0, altera a etapa do terminal pro processo de inserir a senha
    usuarioPendente = nomeLogin;
    tentativasLogin = 0;
    etapaTerminal = "login_senha";
    promptTexto.innerHTML = `Senha para "${nomeLogin}": `;
    inputTerminal.type = "password";
}

function processarLogin(senha) {
    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernameServer: usuarioPendente,
            senhaServer: senha
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                historicoSaidas.innerHTML += `<p class="texto-monitor">Acesso permitido. Autenticando ${usuarioPendente}...</p>`;

                sessionStorage.setItem('usuarioLogado', json.username);
                sessionStorage.setItem('idUsuario', json.id_usuario);

                inputTerminal.disabled = true;
                limparTerminal();

                setTimeout(function () {
                    window.location.href = "home.html";
                }, 1500);
            });
        } else {
            tentativasLogin++;

            if (tentativasLogin >= 3) {
                historicoSaidas.innerHTML += `<p class="texto-monitor" >[CRÍTICO] Acesso bloqueado. 3 tentativas erradas.</p>`;
                resetarTerminal();
            } else {
                historicoSaidas.innerHTML += `<p class="texto-monitor" >Senha incorreta. Tentativa ${tentativasLogin}/3</p>`;
            }
            limparTerminal();
        }
    }).catch(function (erro) {
        historicoSaidas.innerHTML += `<p class="texto-monitor">[CRÍTICO] Servidor offline ou erro de rede.</p>`;
        resetarTerminal();
        limparTerminal();
    });
}