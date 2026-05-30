function buscarCategoriasQuiz() {
    fetch('/quiz/categorias')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (listaCategorias) {

                    // Todas categorias do bd menos as que tirei no model
                    for (let i = 0; i < listaCategorias.length; i++) {
                        let categoria = listaCategorias[i];

                        checkboxes.innerHTML += `
                    <div class="linha-checkbox">
                    <input type="checkbox" class="check-categoria" value="${categoria.id_categoria}" id="cat_${categoria.id_categoria}">
                    <label class="label-checkbox" for="cat_${categoria.id_categoria}">${categoria.nome_categoria}</label>
                    </div>`
                            ;
                    }
                });
            } else {
                console.log("Erro ao buscar categorias do banco de dados");
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
}

function enviarQuiz() {
    // Pegar todas caixinhas
    let todasCaixinhas = document.getElementsByClassName('check-categoria');
    let idsSelecionados = [];

    for (let i = 0; i < todasCaixinhas.length; i++) {
        if (todasCaixinhas[i].checked == true) {
            idsSelecionados.push(todasCaixinhas[i].value);
        }
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
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resultado) {
                pontuacao.innerText = `${resultado.taxa}%`;

                // Converter pra numero
                let taxa = Number(resultado.taxa);

                if (taxa < 30) {
                    resultadodiv.innerText = "Parecemos ter interesses diferentes, é uma ótima oportunidade pra você me fazer uma recomendação e conhecer o Wunderkammer";
                } else if (taxa >= 30 && taxa < 70) {
                    resultadodiv.innerText = "Temos uma boa quantidade de interesses em comum! Faça uma recomendação para que eu conheça mais de você e façamos uma boa troca";
                } else {
                    resultadodiv.innerText = "Uau! Temos muitos interesses em comum. Vamos ser amigas?";
                }
            });
        } else {
                throw "Houve um erro ao enviar o quiz";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
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
    }).then(function (resposta) {
        if (resposta.ok) {
            console.log("Recomendação foi pro bd");
        } else {
                throw "Erro ao enviar recomendação";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}