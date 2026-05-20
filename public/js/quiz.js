function carregarCategoriasQuiz() {
    fetch('/quiz/categorias')
        .then(resposta => resposta.json())
        .then(listaCategorias => {
            let divCheckboxes = document.getElementById('checkboxes');
            divCheckboxes.innerHTML = '';

            for (let i = 0; i < listaCategorias.length; i++) {
                let categoria = listaCategorias[i];
                let linhaCheckbox = `
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                        <input type="checkbox" class="check-categoria" value="${categoria.id_categoria}" id="cat_${categoria.id_categoria}">
                        <label for="cat_${categoria.id_categoria}" style="cursor: pointer; font-size: 20px;">
                            ${categoria.nome_categoria}
                        </label>
                    </div>
                `;
                divCheckboxes.innerHTML += linhaCheckbox;
            }
        })
        .catch(erro => console.error('Erro ao buscar as categorias:', erro));
}

function configurarBotaoQuiz() {
    let botaoEnviar = document.getElementById('btnEnviarQuiz');

    if (botaoEnviar) {
        botaoEnviar.addEventListener('click', () => {
            let caixinhasMarcadas = document.querySelectorAll('.check-categoria:checked');
            let idsSelecionados = [];

            caixinhasMarcadas.forEach(caixinha => {
                idsSelecionados.push(caixinha.value);
            });

            console.log("As categorias marcadas foram:", idsSelecionados);
            let idUsuarioLogado = sessionStorage.getItem('idUsuario');

            let pacoteDeDados = {
                fk_usuario: idUsuarioLogado,
                categorias: idsSelecionados
            };

            fetch('/quiz/salvarResultado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pacoteDeDados)
            })
                .then(resposta => {
                    if (!resposta.ok) {
                        throw new Error("Erro no servidor");
                    }
                    return resposta.json();
                })
                .then(resultado => {
                    // Coloca o número na tela
                    let divPontuacao = document.getElementById('pontuacao');
                    divPontuacao.innerText = `${resultado.taxa}%`;
                    let divResultadoMsg = document.getElementById('resultadodiv');
                    let taxa = parseFloat(resultado.taxa); //Virar número

                    // Mensagens de resultado
                    if (taxa < 30) {
                        divResultadoMsg.innerText = "Parecemos ter interesses diferentes, é uma ótima oportunidade pra você me fazer uma recomendação e conhecer o wunderkammer";
                    } else if (taxa >= 30 && taxa < 70) {
                        divResultadoMsg.innerText = "Temos uma boa quantidade de interesses em comum! Faça uma recomendação para que eu conheça mais de você e façamos uma boa troca";
                    } else {
                        divResultadoMsg.innerText = "Uau! Temos muitos interesses em comum. Vamos ser amigas?";
                    }
                })
                .catch(erro => console.error("Erro ao enviar o quiz:", erro));

        });
    }
}

function configurarBotaoRecomendacao() {
    let botaoRecomendacao = document.getElementById('btnEnviarRecomendacao');

    if (botaoRecomendacao) {
        botaoRecomendacao.addEventListener('click', () => {

            let idUsuarioLogado = sessionStorage.getItem('idUsuario');
            let valorTema = document.getElementById('temaipt').value;
            let valorDescricao = document.getElementById('descricaoipt').value;

            let pacoteDeDados = {
                fk_usuario: idUsuarioLogado,
                tema: valorTema,
                descricao: valorDescricao
            };

            fetch('/quiz/recomendacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pacoteDeDados)
            })
                .then(resposta => {
                    if (resposta.ok) {
                        // limpar os campos
                        document.getElementById('temaipt').value = '';
                        document.getElementById('descricaoipt').value = '';

                        // Retorno
                        alert("Sua recomendação foi enviada. Muito obrigada!");
                    } else {
                        alert("Preencha todos os campos");
                    }
                })
                .catch(erro => console.error("Erro ao enviar recomendação:", erro));
        });
    }
}