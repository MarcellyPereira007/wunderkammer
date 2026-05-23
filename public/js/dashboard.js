function iniciarPainelDashboard() {
    let idUsuarioLogado = sessionStorage.getItem('idUsuario');

    fetch('/dashboard/kpis')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            // Pega posição 0 da lista do banco
            document.getElementById('dash-total-visitantes').innerText = dados[0].total_visitantes;

            let media = dados[0].media_geral ? parseFloat(dados[0].media_geral).toFixed(2) : 0;
            document.getElementById('dash-media-geral').innerText = `${media}%`;
        })
        .catch(function (erro) {
            console.error("Erro ao buscar KPIs:", erro);
        });

    fetch('/dashboard/ranking')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            let tbodyRanking = document.getElementById('dash-tabela-ranking');
            tbodyRanking.innerHTML = '';

            if (dados.length === 0) {
                tbodyRanking.innerHTML = `<tr><td colspan="4" style="text-align: center;">Nenhum quiz respondido ainda</td></tr>`;
            } else {
                for (let i = 0; i < dados.length; i++) {
                    let item = dados[i];
                    let posicao = i + 1;
                    let taxa = parseFloat(item.taxa_compatibilidade).toFixed(2);

                    let status = "";
                    if (taxa < 30) status = "Visitante curioso";
                    else if (taxa >= 30 && taxa < 70) status = "Conexão estável";
                    else status = "Sincronia perfeita";

                    tbodyRanking.innerHTML += `
                        <tr>
                            <td>${posicao}º</td>
                            <td>${item.username}</td>
                            <td>${taxa}%</td>
                            <td>${status}</td>
                        </tr>
                    `;
                }
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar ranking:", erro);
        });

    fetch('/dashboard/recomendacoes')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            let tbodyRecomendacoes = document.getElementById('dash-tabela-recomendacoes');
            tbodyRecomendacoes.innerHTML = '';

            if (dados.length === 0) {
                tbodyRecomendacoes.innerHTML = `<tr><td colspan="3" style="text-align: center;">Nenhuma recomendação recebida ainda.</td></tr>`;
            } else {
                for (let i = 0; i < dados.length; i++) {
                    let item = dados[i];

                    tbodyRecomendacoes.innerHTML += `
                        <tr>
                            <td>${item.username}</td>
                            <td>${item.tema}</td>
                            <td>${item.descricao}</td>
                        </tr>
                    `;
                }
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar Recomendações:", erro);
        });

    fetch('/dashboard/grafico')
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            let nomesCategorias = [];
            let quantidades = [];

            for (let i = 0; i < dados.length; i++) {
                let item = dados[i];
                nomesCategorias.push(item.nome_categoria);
                quantidades.push(item.total_maravilhas);
            }

            Chart.defaults.font.family = '"Pixelify Sans", sans-serif';
            Chart.defaults.color = '#E2E1E6';
            Chart.defaults.font.size = 18;

            let ctx = document.getElementById('graficoAcervo').getContext('2d');

            new Chart(ctx, {
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
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'right' }
                    }
                }
            });
        })
        .catch(function (erro) {
            console.error("Erro ao buscar gráfico:", erro);
        });

    fetch(`/dashboard/taxa/${idUsuarioLogado}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            let taxa = 0;
            // Se o array tiver alguma coisa, pega a taxa, senão fica 0
            if (dados.length > 0) {
                taxa = parseFloat(dados[0].taxa_compatibilidade);
            }

            // Faz a barra encher
            document.getElementById('dash-barra-progresso').style.width = `${taxa}%`;
            document.getElementById('dash-texto-porcentagem').innerText = `${taxa.toFixed(2)}%`;

            let divStatus = document.getElementById('dash-status-conexao');
            if (taxa < 30) divStatus.innerText = "Visitante curioso";
            else if (taxa >= 30 && taxa < 70) divStatus.innerText = "Conexão estável";
            else divStatus.innerText = "Sincronia perfeita";
        })
        .catch(function (erro) {
            console.error("Erro ao buscar taxa de compatibilidade do usuário:", erro);
        });

    fetch(`/dashboard/setores/${idUsuarioLogado}`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            let ulSetores = document.getElementById('dash-setores-comum');
            ulSetores.innerHTML = ''; // Limpar a mensagem de carregando

            if (dados.length === 0) {
                ulSetores.innerHTML = `<li>Você ainda não marcou interesses em comum. Responda o Quiz</li>`;
            } else {
                for (let i = 0; i < dados.length; i++) {
                    let item = dados[i];
                    ulSetores.innerHTML += `<li>${item.nome_categoria}</li>`;
                }
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar categorias do usuário:", erro);
        });
}