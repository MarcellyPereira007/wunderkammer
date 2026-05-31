// Montar as msg antigas
function carregarGuestbook() {
    fetch('/guestbook/listar')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    let lista = document.getElementById('gb-lista');
                    lista.innerHTML = '';

                    if (dados.length == 0) {
                        lista.innerHTML = '<p style="font-family: Yoster, monospace; font-size: 16px; color: #8b6347;">Nenhuma mensagem ainda. Seja a primeira</p>';
                    } else {
                        for (let i = 0; i < dados.length; i++) {
                            let entrada = dados[i];
                            lista.innerHTML +=
                                `<div class="gb-entrada">
                                    <p class="gb-entrada-nome">${entrada.nome}</p>
                                    <p class="gb-entrada-msg">${entrada.mensagem}</p>
                                    <p class="gb-entrada-data">${entrada.data_cadastro}</p>
                                </div>`;
                        }
                    }
                });
            } else {
                throw "Houve um erro buscando as mensagens do guestbook";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}

// Envia uma nova mensagem
function enviarGuestbook() {
    let nome = document.getElementById('gb-nome').value.trim();
    let mensagem = document.getElementById('gb-msg').value.trim();
    let status = document.getElementById('gb-status');

    if (nome == '' || mensagem == '') {
        status.innerHTML = `✦ Preencha seu nome e mensagem!`;
        return;
    }

    fetch('/guestbook/enviar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            mensagem: mensagem
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                status.innerHTML = `✦ Mensagem enviada, obrigada!`;
                document.getElementById('gb-nome').value = '';
                document.getElementById('gb-msg').value = '';
                carregarGuestbook();
            } else {
                throw "Houve um erro ao enviar a mensagem";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            status.innerHTML = `✦ Algo deu errado, tente de novo mais tarde`;
        });
}