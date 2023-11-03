document.getElementById('selectEquipe2').addEventListener('change', function () {
    var apelidoMaquina = document.getElementById('selectEquipe2');
    var apelido = apelidoMaquina.value;

    // Obtém a instância atual do gráfico de temperatura
    var ctxTemp = document.getElementById('barTemp_eq2').getContext('2d');
    var currentCharTemp = Chart.getChart(ctxTemp);

    // Destrói a instância atual do gráfico se existir
    if (currentCharTemp) {
        currentCharTemp.destroy();
    }

    // Obtém a instância atual do gráfico de frequencia
    var ctxFreq = document.getElementById('barFreq_eq2').getContext('2d');
    var currentChartFreq = Chart.getChart(ctxFreq);

    if (currentChartFreq) {
        currentChartFreq.destroy();
    }

    // Obtém a instância atual do gráfico de rede
    var ctxLine = document.getElementById('lineRede_eq2').getContext('2d');
    var currentChartLine = Chart.getChart(ctxLine);

    if (currentChartLine) {
        currentChartLine.destroy();
    }

    // Obtém a instância atual do gráfico de rede
    var ctxAux = document.getElementById('barAux_eq2').getContext('2d');
    var currentChartAux = Chart.getChart(ctxAux);

    if (currentChartAux) {
        currentChartAux.destroy();
    }

    // Chama a função para obter dados e plotar o novo gráfico
    obterDadosGraficoTempEq2(apelido);
    obterDadosGraficoFreqEq2(apelido);
    obterDadosGraficoRedeEq2(apelido);
    obterDadosGraficoAuxEq2(apelido);
});

// -------------------------------- temperatura
function obterDadosGraficoTempEq2(apelidoMaquina) {

    fetch(`/medidasEq2/ultimasTempEq2/${apelidoMaquina}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    if (resposta.length === 0 || resposta === undefined) {
                        console.log('A resposta JSON está vazia.');
                        return false;
                    } else {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        resposta.reverse();
                        plotarGraficoTempEq2(resposta, apelidoMaquina);
                    }
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

function plotarGraficoTempEq2(resposta, apelidoMaquina) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Temperatura CPU (°C)',
            data: [],
            borderWidth: 1,
            backgroundColor: ['black'],
            borderColor: 'rgba(46, 204, 113, 1)',
        }, {
            label: 'Temperatura GPU (°C)',
            data: [],
            borderWidth: 1,
            backgroundColor: ['white'],
            borderColor: 'rgba(231, 76, 60, 1)',
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.cpuTemp);
        dados.datasets[1].data.push(registro.gpuTemp);
    }


    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
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
                    color: 'rgba(46, 204, 113, 1)',
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

    const ctxTemp = document.getElementById('barTemp_eq2').getContext('2d');
    ctxTemp.canvas.width = 200;
    ctxTemp.canvas.height = 200;
    let myChart = new Chart(
        document.getElementById(`barTemp_eq2`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoTempEq2(apelidoMaquina, dados, myChart), 10000);
}


function atualizarGraficoTempEq2(apelidoMaquina, dados, myChart) {


    fetch(`/medidasEq2/tempo-realTempEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, apelidoMaquina);
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
                    dados.datasets[0].data.push(novoRegistro[0].cpuTemp); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].gpuTemp); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoTempEq2(apelidoMaquina, dados, myChart), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoTempEq2(apelidoMaquina, dados, myChart), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


// --------------------------------------- chart de barras frequência
function obterDadosGraficoFreqEq2(apelidoMaquina) {

    fetch(`/medidasEq2/ultimasFreqEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoFreqEq2(resposta, apelidoMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoFreqEq2(resposta, apelidoMaquina) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Frequência CPU (% )',
            data: [],
            borderWidth: 1,
            backgroundColor: ['black'],
            borderColor: 'rgba(46, 204, 113, 1)',
        }, {
            label: 'Frequência GPU (% )',
            data: [],
            borderWidth: 1,
            backgroundColor: ['white'],
            borderColor: 'rgba(231, 76, 60, 1)',
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.cpuFreq);
        dados.datasets[1].data.push(registro.gpuFreq);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
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
                    color: 'rgba(46, 204, 113, 1)',
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

    const ctxFreq = document.getElementById('barFreq_eq2').getContext('2d');
    ctxFreq.canvas.width = 200;
    ctxFreq.canvas.height = 200;
    let myChartFreq = new Chart(
        document.getElementById(`barFreq_eq2`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoFreqEq2(apelidoMaquina, dados, myChartFreq), 10000);
}


function atualizarGraficoFreqEq2(apelidoMaquina, dados, myChartFreq) {


    fetch(`/medidasEq2/tempo-realFreqEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, apelidoMaquina);
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
                    dados.datasets[0].data.push(novoRegistro[0].cpuFreq); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].gpuFreq); // incluir uma nova medida de temperatura

                    myChartFreq.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoFreqEq2(apelidoMaquina, dados, myChartFreq), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoFreqEq2(apelidoMaquina, dados, myChartFreq), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


// --------------------------------------- charts de rede internet
function obterDadosGraficoRedeEq2(apelidoMaquina) {

    fetch(`/medidasEq2/ultimasRedeEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoRedeEq2(resposta, apelidoMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoRedeEq2(resposta, apelidoMaquina) {

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
            borderColor: ['rgba(46, 204, 113, 1)'],
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
                    text: 'Rede',
                    color: 'rgba(46, 204, 113, 1)',
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

    const ctxRede = document.getElementById('lineRede_eq2').getContext('2d');
    ctxRede.canvas.width = 200;
    ctxRede.canvas.height = 200;
    let myChartRede = new Chart(
        document.getElementById(`lineRede_eq2`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoRedeEq2(apelidoMaquina, dados, myChartRede), 10000);
}


function atualizarGraficoRedeEq2(apelidoMaquina, dados, myChartRede) {


    fetch(`/medidasEq2/tempo-realRedeEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, apelidoMaquina);
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
                proximaAtualizacao = setTimeout(() => atualizarGraficoRedeEq2(apelidoMaquina, dados, myChartRede), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRedeEq2(apelidoMaquina, dados, myChartRede), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// charts auxiliares

// --------------------------------------- charts auxiliares
function obterDadosGraficoAuxEq2(apelidoMaquina) {

    fetch(`/medidasEq2/ultimasAuxEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoAuxEq2(resposta, apelidoMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoAuxEq2(resposta, apelidoMaquina) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Tempo de atividade (% )',
            data: [],
            backgroundColor: [
                'rgba(46, 204, 113, 1)'
            ],
            borderColor: ['black'],
            tension: 0.1
        }, {
            label: 'ram (% )',
            data: [],
            backgroundColor: [
                'rgba(231, 76, 60, 1)'
            ],
            borderColor: ['black'],
            tension: 0.1
        }]
    };

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.disco);
        dados.datasets[1].data.push(registro.ram);
    }

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
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
                    text: 'auxiliares',
                    color: 'rgba(46, 204, 113, 1)',
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

    const ctxAux = document.getElementById('barAux_eq2').getContext('2d');
    ctxAux.canvas.width = 200;
    ctxAux.canvas.height = 200;
    let myChartAux = new Chart(
        document.getElementById(`barAux_eq2`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoAuxEq2(apelidoMaquina, dados, myChartAux), 10000);
}


function atualizarGraficoAuxEq2(apelidoMaquina, dados, myChartAux) {


    fetch(`/medidasEq2/tempo-realAuxEq2/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                // alertar(novoRegistro, apelidoMaquina);
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
                    dados.datasets[0].data.push(novoRegistro[0].disco); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].ram); // incluir uma nova medida de temperatura

                    myChartAux.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoAuxEq2(apelidoMaquina, dados, myChartAux), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoAuxEq2(apelidoMaquina, dados, myChartAux), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}
//  ----------------------  mudar computador
var selectEquipe2 = document.getElementById('selectEquipe2');
var mostrarPc2 = document.getElementById('pc2');

selectEquipe2.addEventListener("change", function () {
    var opcaoSelecionada = selectEquipe2.options[selectEquipe2.selectedIndex];
    mostrarPc2.innerHTML = opcaoSelecionada.text;
});