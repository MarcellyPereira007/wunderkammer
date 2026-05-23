function buscarCategoriasQuiz() {
    fetch('/quiz/categorias')
        .then(resposta => resposta.json())
        .then(listaCategorias => {
            let divCheckboxes = document.getElementById('checkboxes');
            divCheckboxes.innerHTML = '';

            for (let i = 0; i < listaCategorias.length; i++) {
                let categoria = listaCategorias[i];

                let linhaCheckbox = `
                    <div class="linha-checkbox">
                        <input type="checkbox" class="check-categoria" value="${categoria.id_categoria}" id="cat_${categoria.id_categoria}">
                        <label class="label-checkbox" for="cat_${categoria.id_categoria}">
                            ${categoria.nome_categoria}
                        </label>
                    </div>
                `;
                divCheckboxes.innerHTML += linhaCheckbox;
            }
        })
        .catch(erro => console.error('Erro ao buscar as categorias:', erro));
}

function enviarQuiz() {
    let caixinhasMarcadas = document.querySelectorAll('.check-categoria:checked');
    let idsSelecionados = [];

    for (let i = 0; i < caixinhasMarcadas.length; i++) {
        idsSelecionados.push(caixinhasMarcadas[i].value);
    }

    console.log("Categorias marcadas nessa vez:", idsSelecionados);
    let idUsuarioLogado = sessionStorage.getItem('idUsuario');

    fetch('/quiz/salvarResultado', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk_usuario: idUsuarioLogado,
            categorias: idsSelecionados
        })
    })
        .then(resposta => {
            if (!resposta.ok) {
                throw new Error("Erro no servidor");
            }
            return resposta.json();
        })
        .then(resultado => {
            let divPontuacao = document.getElementById('pontuacao');
            divPontuacao.innerText = `${resultado.taxa}%`;

            let divResultadoMsg = document.getElementById('resultadodiv');
            let taxa = parseFloat(resultado.taxa); // Virar número

            // Mensagens de resultado
            if (taxa < 30) {
                divResultadoMsg.innerText = "Parecemos ter interesses diferentes, é uma ótima oportunidade pra você me fazer uma recomendação e conhecer o Wunderkammer";
            } else if (taxa >= 30 && taxa < 70) {
                divResultadoMsg.innerText = "Temos uma boa quantidade de interesses em comum! Faça uma recomendação para que eu conheça mais de você e façamos uma boa troca";
            } else {
                divResultadoMsg.innerText = "Uau! Temos muitos interesses em comum. Vamos ser amigas?";
            }
        })
        .catch(erro => console.error("Erro no envio do quiz: ", erro));
}

function enviarRecomendacao() {
    let idUsuarioLogado = sessionStorage.getItem('idUsuario');
    let valorTema = document.getElementById('temaipt').value;
    let valorDescricao = document.getElementById('descricaoipt').value;

    fetch('/quiz/recomendacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fk_usuario: idUsuarioLogado,
            tema: valorTema,
            descricao: valorDescricao
        })
    })
        .catch(erro => console.error("Erro ao enviar a recomendação: ", erro));
}