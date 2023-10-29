function graficos() {
    obterDadosGraficoTemp();
    obterDadosGraficoFreq();
    obterDadosGraficoRede();
    obterDadosGraficoOco();
}

// chart de barras temperatura
function obterDadosGraficoTemp() {

    fetch(`/index/medidaTemp`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoTemp(resposta);

            });
        } else {
            if (response.headers.get('content-type').includes('application/json')) {
                response.json().then(function (data) {
                    var erro = data.mensagem;

                    check_error.checked = true;
                    texto_erro.innerHTML = erro;

                    setTimeout(function () {
                        check_error.checked = false;
                    }, 1500);
                });
            }
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoTemp(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Temperatura GPU',
            data: [],
            borderWidth: 1,
            backgroundColor: ['#ffcc00'],
            borderColor: 'black',
        }, {
            label: 'Temperatura CPU',
            fill: false,
            data: [],
            backgroundColor: ['#89cff0'],
            borderColor: 'white',
        }]
    };


    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.apelidoComputador);
        dados.datasets[0].data.push(registro.cpuTemp);
        dados.datasets[1].data.push(registro.gpuTemp);
    }


    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Temperatura dos computadores',
                    color: '#ffcc00',
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        color: '#fff'
                    }
                }, legend: {
                    labels: {
                        display: true,
                        color: '#36a2eb',
                        font: {
                            size: 14,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        }
                    }
                }, ticks: {
                    color: '#ff7782'
                }
            }
        }
    };

    const ctxTemp = document.getElementById('barTemp').getContext('2d');
    ctxTemp.canvas.width = 200;
    ctxTemp.canvas.height = 120;
    let myChart = new Chart(
        document.getElementById(`barTemp`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoTemp(dados, myChart), 2000);
}


function atualizarGraficoTemp(dados, myChart) {


    fetch(`/index/tempo-realTemp`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, );
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);


                if (novoRegistro[0].apelidoComputador == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("---------------------------------------------------------------")
                } else {
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].apelidoComputador); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].cpuTemp); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].gpuTemp); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoTemp(dados, myChart), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoTemp(dados, myChart), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}



// chart de barras frequência
function obterDadosGraficoFreq() {

    fetch(`/index/medidaFreq`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoFreq(resposta);

            });
        } else {
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoFreq(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Frequência GPU',
            data: [],
            borderWidth: 1,
            backgroundColor: ['#ffcc00'],
            borderColor: 'black',
        }, {
            label: 'Frequência CPU',
            fill: false,
            data: [],
            backgroundColor: ['#89cff0'],
            borderColor: 'white',
        }]
    };



    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.apelidoComputador);
        dados.datasets[0].data.push(registro.cpuFreq);
        dados.datasets[1].data.push(registro.gpuFreq);
    }


    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Frequência dos computadores',
                    color: '#ffcc00',
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        color: '#fff'
                    }
                }, legend: {
                    labels: {
                        display: true,
                        color: '#36a2eb',
                        font: {
                            size: 14,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        }
                    }
                }, ticks: {
                    color: '#ff7782'
                }
            }
        }
    };

    const ctxFreq = document.getElementById('barFreq').getContext('2d');
    ctxFreq.canvas.width = 200;
    ctxFreq.canvas.height = 120;
    let myChart = new Chart(
        document.getElementById(`barFreq`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoFreq(dados, myChart), 2000);
}


function atualizarGraficoFreq(dados, myChart) {

    fetch(`/index/tempo-realFreq`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, );
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);


                if (novoRegistro[0].apelidoComputador == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("---------------------------------------------------------------")
                } else {
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].apelidoComputador); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].cpuFreq); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de Freqeratura
                    dados.datasets[1].data.push(novoRegistro[0].gpuFreq); // incluir uma nova medida de Freqeratura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoFreq(dados, myChart), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoFreq(dados, myChart), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


// charts de rede internet

function obterDadosGraficoRede() {

    fetch(`/index/medidaRede`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoRede(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoRede(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Latência (MS)',
            data: [],
            fill: false,
            backgroundColor: ['black'],
            borderColor: ['#ffcc00'],
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.redeLatencia);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Rede (Geral)',
                    color: '#ffcc00',
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        color: '#fff'
                    }
                }, legend: {
                    labels: {
                        display: true,
                        color: '#36a2eb',
                        font: {
                            size: 14,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        }
                    }
                }, ticks: {
                    color: '#ff7782'
                }
            }
        }
    };

    const ctxRede = document.getElementById('lineRede').getContext('2d');
    ctxRede.canvas.width = 200;
    ctxRede.canvas.height = 200;
    let myChartRede = new Chart(
        document.getElementById(`lineRede`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoRede(dados, myChartRede), 10000);
}


function atualizarGraficoRede(dados, myChartRede) {


    fetch(`/index/tempo-realRede`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, );
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);


                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].redeLatencia); // incluir uma nova medida de umidade

                    myChartRede.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoRede(dados, myChartRede), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRede(dados, myChartRede), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// charts ocorrencia


function obterDadosGraficoOco() {

    fetch(`/index/medidaOco`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoOco(resposta);

            });
        } else {
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoOco(resposta) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels

    // Criando estrutura para plotar gráfico - dados
    const dados = {
        labels: ["Pendente", "Em andamento", "Completa"],
        datasets: [{
            data: [],
            backgroundColor: [
                'red',
                'orange',
                'green'
            ],
            borderColor: ['black'],
            tension: 0.1
        }]
    };



    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];

        dados.datasets[0].data.push(registro.pendente, registro.andamento, registro.resolvido);
    }


    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'doughnut',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Ocorrências',
                    color: '#ffcc00',
                    font: {
                        size: 16,
                        weight: 'bold',
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        color: '#fff'
                    }
                }, legend: {
                    labels: {
                        display: true,
                        color: '#36a2eb',
                        font: {
                            size: 14,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        }
                    }
                }, ticks: {
                    color: '#ff7782'
                }
            }
        }
    };
    const ctxOco = document.getElementById('barOco').getContext('2d');
    ctxOco.canvas.width = 200;
    ctxOco.canvas.height = 120;
    let myChart = new Chart(
        document.getElementById(`barOco`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoOco(dados, myChart), 2000);
}

var horaOco = 0;
function atualizarGraficoOco(dados, myChart) {

    fetch(`/index/tempo-realOco`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, );
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                console.log("Dadoas" + horaOco);
                if (novoRegistro[0].hora == horaOco) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para desse captura, o gráfico não atualizará.")
                    console.log("---------------------------------------------------------------")
                } else {
                    dados.datasets[0].data.shift();  // Remover o primeiro elemento
                    dados.datasets[0].data.shift();  // Remover o segundo elemento
                    dados.datasets[0].data.shift();  // Remover o terceiro elemento
                    dados.datasets[0].data.push(novoRegistro[0].pendente, novoRegistro[0].andamento, novoRegistro[0].resolvido);
                    horaOco = novoRegistro[0].hora;
                    myChart.update();
                }
console.log(horaOco)
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoOco(dados, myChart), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoOco(dados, myChart), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}