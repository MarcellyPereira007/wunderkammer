function iniciarPainelDashboard() {
    let idUsuarioLogado = sessionStorage.getItem('idUsuario');
    let nomeUsuario = sessionStorage.getItem('usuarioLogado');
    document.getElementById('dash-nome-usuario').innerHTML = `<span>Nome de usuário</span>@${nomeUsuario}`;

    fetch('/dashboard/kpis')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    document.getElementById('dash-total-visitantes').innerHTML = dados[0].total_visitantes;

                    let media = 0;
                    // ja que ele só retorna uma posiçõa usa o 0
                    if (dados[0].media_geral) {
                        media = Number(dados[0].media_geral);
                        media = media.toFixed(2);
                    }
                    document.getElementById('dash-media-geral').innerHTML = `${media}%`;
                });
            } else {
                throw "Houve um erro buscando dados das KPIs";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    fetch('/dashboard/ranking')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    let tbodyRanking = document.getElementById('dash-tabela-ranking');
                    tbodyRanking.innerHTML = '';

                    if (dados.length == 0) {
                        tbodyRanking.innerHTML = `<tr><td colspan="5" style="text-align: center;">Nenhum usuário respondeu o quiz</td></tr>`;
                    } else {
                        // Passar cada um pra montar a barrinha e colocar na tabela
                        for (let i = 0; i < dados.length; i++) {
                            let item = dados[i];
                            let posicao = i + 1;
                            let taxa = Number(item.taxa_compatibilidade);

                            let status = "";
                            if (taxa < 30) status = "Visitante curioso";
                            else if (taxa >= 30 && taxa < 70) status = "Conexão estável";
                            else status = "Sincronia perfeita";

                            // Adicionando barra do htop
                            // Primeiro dividir por 5 pra ter no max 20 barras
                            let qtdBarras = Math.round(taxa / 5);
                            let desenhoDaBarra = "";

                            // Laço de 20 posições para desenhar a barra completa
                            for (let j = 0; j < 20; j++) {
                                if (j < qtdBarras) {
                                    if (j < 6) {
                                        // Até 30% fica vermelho
                                        desenhoDaBarra += `<span style="color: #612036;">|</span>`;
                                    } else if (j < 14) {
                                        // De 30% a 70% fica amarelo
                                        desenhoDaBarra += `<span style="color: #797919;">|</span>`;
                                    } else {
                                        // Acima de 70% fica verde
                                        desenhoDaBarra += `<span style="color: #0F8B0F;">|</span>`;
                                    }
                                } else {
                                    desenhoDaBarra += " "; // Deixa espaço vazio nas que não tem
                                }
                            }

                            tbodyRanking.innerHTML +=
                                `<tr>
                                <td>${posicao}º</td>
                                <td>${item.username}</td>
                                <td class="barra-texto">[${desenhoDaBarra}] <span>${taxa.toFixed(2)}%</span></td>
                                <td>${status}</td>
                            </tr>`;
                        }
                    }
                });
            } else {
                throw "Houve um erro buscando dados do ranking";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    fetch('/dashboard/recomendacoes')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    let tbodyRecomendacoes = document.getElementById('dash-tabela-recomendacoes');
                    tbodyRecomendacoes.innerHTML = '';

                    if (dados.length == 0) {
                        tbodyRecomendacoes.innerHTML = `<tr><td colspan="3">Nenhuma recomendação foi enviada</td></tr>`;
                    } else {

                        for (let i = 0; i < dados.length; i++) {
                            let item = dados[i];
                            tbodyRecomendacoes.innerHTML +=
                                `<tr>
                                <td>${item.username}</td>
                                <td>${item.tema}</td>
                                <td>${item.descricao}</td>
                            </tr>`;
                        }
                    }
                });
            } else {
                throw "Houve um erro buscando recomendações";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    fetch('/dashboard/grafico')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    let nomesCategorias = [];
                    let quantidades = [];

                    for (let i = 0; i < dados.length; i++) {
                        let item = dados[i];
                        nomesCategorias.push(item.nome_categoria);
                        quantidades.push(item.total_maravilhas);
                    }

                    // Em todos gráficos da tela
                    Chart.defaults.font.family = '"Pixelify Sans", sans-serif';
                    Chart.defaults.color = '#E2E1E6';
                    Chart.defaults.font.size = 18;

                    let grafico = document.getElementById('graficoAcervo').getContext('2d');

                    new Chart(grafico, {
                        type: 'pie',
                        data: {
                            labels: nomesCategorias,
                            datasets: [{
                                label: 'Total de maravilhas',
                                data: quantidades,
                                backgroundColor: [
                                    '#21616f', '#612036', '#194f19', '#674e1c', '#551365', '#797919', '#ffffff'
                                ],
                                borderColor: '#03081E',
                                borderWidth: 2,
                                hoverOffset: 10
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false, //estica
                            plugins: {
                                legend: { position: 'right' }
                            }
                        }
                    });
                });
            } else {
                throw "Houve um erro ao carregar o gráfico";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    fetch(`/dashboard/taxa/${idUsuarioLogado}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    let taxa = Number(dados[0].taxa_compatibilidade);

                    // Monta a barrinha htop
                    let qtdBarras = Math.round(taxa / 5);
                    let desenhoDaBarra = "";

                    for (let j = 0; j < 20; j++) {
                        if (j < qtdBarras) {
                            if (j < 6) {
                                desenhoDaBarra += `<span style="color: #612036;">|</span>`;
                            } else if (j < 14) {
                                desenhoDaBarra += `<span style="color: #797919;">|</span>`;
                            } else {
                                desenhoDaBarra += `<span style="color: #0F8B0F;">|</span>`;
                            }
                        } else {
                            desenhoDaBarra += " ";
                        }
                    }

                    let status = "";
                    if (taxa < 30) status = "Visitante curioso";
                    else if (taxa >= 30 && taxa < 70) status = "Conexão estável";
                    else status = "Sincronia perfeita";

                    document.getElementById('dash-status-conexao').innerHTML = `<span>Status de compatibilidade</span>${status}`;
                    document.getElementById('dash-taxa-individual').innerHTML = `<span>Taxa de compatibilidade</span><span class="barra-texto">[${desenhoDaBarra}] ${taxa.toFixed(2)}%</span>`;
                });
            } else {
                throw "Houve um erro buscando a taxa de compatibilidade";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    fetch(`/dashboard/setores/${idUsuarioLogado}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    let ulSetores = document.getElementById('dash-setores-comum');
                    ulSetores.innerHTML = '';

                    if (dados.length == 0) {
                        ulSetores.innerHTML = `<li>Você ainda não marcou interesses em comum. Abra o Quiz.exe</li>`;
                    } else {

                        for (let i = 0; i < dados.length; i++) {
                            let item = dados[i];
                            ulSetores.innerHTML += `<li>${item.nome_categoria}</li>`;
                        }
                    }
                });
            } else {
                throw "Houve um erro buscando os dados marcados no quiz";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}