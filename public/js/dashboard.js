function iniciarPainelDashboard() {
    let idUsuarioLogado = sessionStorage.getItem('idUsuario');

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
            }
        }).catch(function (erro) {
            console.log(erro);
        });

    fetch('/dashboard/ranking')
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {
                    let tbodyRanking = document.getElementById('dash-tabela-ranking');
                    tbodyRanking.innerHTML = '';

                    if (dados.length == 0) {
                        tbodyRanking.innerHTML = `<tr><td colspan="4">Nenhum usuário respondeu o quiz</td></tr>`;
                    } else {
                        // Passa cada dado dos que responderam um por um
                        for (let i = 0; i < dados.length; i++) {
                            let item = dados[i];
                            let posicao = i + 1;
                            let taxa = Number(item.taxa_compatibilidade).toFixed(2);

                            let status = "";
                            if (taxa < 30) status = "Visitante curioso";
                            else if (taxa >= 30 && taxa < 70) status = "Conexão estável";
                            else status = "Sincronia perfeita";

                            tbodyRanking.innerHTML +=
                                `<tr>
                                <td>${posicao}º</td>
                                <td>${item.username}</td>
                                <td>${taxa}%</td>
                                <td>${status}</td>
                            </tr>`;
                        }
                    }
                });
            }
        }).catch(function (erro) {
            console.log(erro);
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
            }
        }).catch(function (erro) {
            console.log(erro);
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
            }
        }).catch(function (erro) {
            console.log(erro);
        });

    fetch(`/dashboard/taxa/${idUsuarioLogado}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (dados) {

                    let taxa = Number(dados[0].taxa_compatibilidade);

                    document.getElementById('dash-barra-progresso').style.width = `${taxa}%`;
                    document.getElementById('dash-texto-porcentagem').innerHTML = `${taxa.toFixed(2)}%`;

                    let divStatus = document.getElementById('dash-status-conexao');

                    if (taxa < 30) {
                        divStatus.innerHTML = "Visitante curioso";
                    } else if (taxa >= 30 && taxa < 70) {
                        divStatus.innerHTML = "Conexão estável";
                    } else {
                        divStatus.innerHTML = "Sincronia perfeita";
                    }
                });
            }
        }).catch(function (erro) {
            console.log(erro);
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
            }
        }).catch(function (erro) {
            console.log(erro);
        });
}