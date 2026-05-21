function iniciarPainelDashboard() {
    let idUsuarioLogado = sessionStorage.getItem('idUsuario'); 
    
    fetch('/dashboard/global')
        .then(resposta => {
            if (!resposta.ok) throw new Error("Rota não encontrada");
            return resposta.json();
        })
        .then(dados => {
            document.getElementById('dash-total-visitantes').innerText = dados.kpis.total_visitantes;
            
            let media = dados.kpis.media_geral ? parseFloat(dados.kpis.media_geral).toFixed(2) : 0;
            document.getElementById('dash-media-geral').innerText = `${media}%`;

            let tbodyRanking = document.getElementById('dash-tabela-ranking');
            tbodyRanking.innerHTML = '';

            if (dados.ranking.length === 0) {
                tbodyRanking.innerHTML = `<tr><td colspan="4" style="text-align: center;">Nenhum quiz respondido ainda</td></tr>`;
            } else {
                dados.ranking.forEach((item, index) => {
                    let posicao = index + 1;
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
                });
            }

            let tbodyRecomendacoes = document.getElementById('dash-tabela-recomendacoes');
            tbodyRecomendacoes.innerHTML = '';

            if (dados.recomendacoes.length === 0) {
                tbodyRecomendacoes.innerHTML = `<tr><td colspan="3" style="text-align: center;">Nenhuma recomendação recebida ainda.</td></tr>`;
            } else {
                dados.recomendacoes.forEach(item => {
                    tbodyRecomendacoes.innerHTML += `
                        <tr>
                            <td>${item.username}</td>
                            <td>${item.tema}</td>
                            <td>${item.descricao}</td>
                        </tr>
                    `;
                });
            }
            
            let nomesCategorias = [];
            let quantidades = [];

            dados.grafico.forEach(item => {
                nomesCategorias.push(item.nome_categoria);
                quantidades.push(item.total_maravilhas);
            });

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
                            '#21616f', 
                            '#612036',
                            '#194f19',
                            '#674e1c',
                            '#551365',
                            '#797919',
                            '#ffffff'
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
                        legend: {
                            position: 'right',
                        }
                    }
                }
            });
        })
        .catch(erro => console.error("Erro ao buscar painel global:", erro));

    fetch(`/dashboard/usuario/${idUsuarioLogado}`)
        .then(resposta => {
            if (!resposta.ok) throw new Error("Rota não encontrada");
            return resposta.json();
        })
        .then(dadosUsuario => {
            let taxa = dadosUsuario.taxa ? parseFloat(dadosUsuario.taxa) : 0;
            
            // Faz a barra encher
            document.getElementById('dash-barra-progresso').style.width = `${taxa}%`;
            document.getElementById('dash-texto-porcentagem').innerText = `${taxa.toFixed(2)}%`;

            let divStatus = document.getElementById('dash-status-conexao');
            if (taxa < 30) divStatus.innerText = "Visitante curioso";
            else if (taxa >= 30 && taxa < 70) divStatus.innerText = "Conexão estável";
            else divStatus.innerText = "Sincronia perfeita";

            let ulSetores = document.getElementById('dash-setores-comum');
            ulSetores.innerHTML = ''; // Limpa a mensagem de carregando

            if (dadosUsuario.setores.length === 0) {
                ulSetores.innerHTML = `<li>Você ainda não marcou interesses em comum. Responda o Quiz</li>`;
            } else {
                dadosUsuario.setores.forEach(item => {
                    ulSetores.innerHTML += `<li>${item.nome_categoria}</li>`;
                });
            }
        })
        .catch(erro => console.error("Erro ao buscar dados do usuário:", erro));
}