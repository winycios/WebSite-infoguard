document.getElementById('selectEquipe1').addEventListener('change', function () {
    var apelidoMaquina = document.getElementById('selectEquipe1');
    var apelido = apelidoMaquina.value;


    // Obtém a instância atual do gráfico de temperatura
    var ctxTemp = document.getElementById('barTemp').getContext('2d');
    var currentCharTemp = Chart.getChart(ctxTemp);

    // Destrói a instância atual do gráfico se existir
    if (currentCharTemp) {
        currentCharTemp.destroy();
    }

    // Obtém a instância atual do gráfico de frequencia
    var ctxFreq = document.getElementById('barFreq').getContext('2d');
    var currentChartFreq = Chart.getChart(ctxFreq);

    if (currentChartFreq) {
        currentChartFreq.destroy();
    }

    // Obtém a instância atual do gráfico de rede
    var ctxLine = document.getElementById('lineRede').getContext('2d');
    var currentChartLine = Chart.getChart(ctxLine);

    if (currentChartLine) {
        currentChartLine.destroy();
    }

    // Obtém a instância atual do gráfico de rede
    var ctxAux = document.getElementById('barAux').getContext('2d');
    var currentChartAux = Chart.getChart(ctxAux);

    if (currentChartAux) {
        currentChartAux.destroy();
    }

    // Chama a função para obter dados e plotar o novo gráfico
    obterDadosGraficoTempEq1(apelido);
    obterDadosGraficoFreqEq1(apelido);
    obterDadosGraficoRedeEq1(apelido);
    obterDadosGraficoAuxEq1(apelido);
});

// -------------------------------- temperatura
function obterDadosGraficoTempEq1(apelidoMaquina) {

    fetch(`/medidas/ultimasTempEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoTempEq1(resposta, apelidoMaquina);

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

function plotarGraficoTempEq1(resposta, apelidoMaquina) {

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
            borderColor: '#ffcc00',
        }, {
            label: 'Temperatura GPU (°C)',
            data: [],
            borderWidth: 1,
            backgroundColor: ['white'],
            borderColor: '#89cff0',
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
    ctxTemp.canvas.height = 200;
    let myChart = new Chart(
        document.getElementById(`barTemp`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoTempEq1(apelidoMaquina, dados, myChart), 2000);
}


function atualizarGraficoTempEq1(apelidoMaquina, dados, myChart) {


    fetch(`/medidas/tempo-realTempEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
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
                proximaAtualizacao = setTimeout(() => atualizarGraficoTempEq1(apelidoMaquina, dados, myChart), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoTempEq1(apelidoMaquina, dados, myChart), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


// --------------------------------------- chart de barras frequência
function obterDadosGraficoFreqEq1(apelidoMaquina) {

    fetch(`/medidas/ultimasFreqEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoFreqEq1(resposta, apelidoMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoFreqEq1(resposta, apelidoMaquina) {

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
            borderColor: '#ffcc00',
        }, {
            label: 'Frequência GPU (% )',
            data: [],
            borderWidth: 1,
            backgroundColor: ['white'],
            borderColor: '#89cff0',
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
    ctxFreq.canvas.height = 200;
    let myChartFreq = new Chart(
        document.getElementById(`barFreq`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoFreqEq1(apelidoMaquina, dados, myChartFreq), 2000);
}


function atualizarGraficoFreqEq1(apelidoMaquina, dados, myChartFreq) {


    fetch(`/medidas/tempo-realFreqEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
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
                proximaAtualizacao = setTimeout(() => atualizarGraficoFreqEq1(apelidoMaquina, dados, myChartFreq), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoFreqEq1(apelidoMaquina, dados, myChartFreq), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


// --------------------------------------- charts de rede internet
function obterDadosGraficoRedeEq1(apelidoMaquina) {

    fetch(`/medidas/ultimasRedeEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoRedeEq1(resposta, apelidoMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoRedeEq1(resposta, apelidoMaquina) {

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
                    text: 'Rede',
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

    setTimeout(() => atualizarGraficoRedeEq1(apelidoMaquina, dados, myChartRede), 10000);
}


function atualizarGraficoRedeEq1(apelidoMaquina, dados, myChartRede) {


    fetch(`/medidas/tempo-realRedeEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
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
                proximaAtualizacao = setTimeout(() => atualizarGraficoRedeEq1(apelidoMaquina, dados, myChartRede), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoRedeEq1(apelidoMaquina, dados, myChartRede), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// charts auxiliares

// --------------------------------------- charts auxiliares
function obterDadosGraficoAuxEq1(apelidoMaquina) {

    fetch(`/medidas/ultimasAuxEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGraficoAuxEq1(resposta, apelidoMaquina);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function plotarGraficoAuxEq1(resposta, apelidoMaquina) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Tempo de atividade(% )',
            data: [],
            backgroundColor: [
                '#ffcc00'
            ],
            borderColor: ['black'],
            tension: 0.1
        }, {
            label: 'ram(% )',
            data: [],
            backgroundColor: [
                '#89cff0'
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

    const ctxAux = document.getElementById('barAux').getContext('2d');
    ctxAux.canvas.width = 200;
    ctxAux.canvas.height = 200;
    let myChartAux = new Chart(
        document.getElementById(`barAux`).getContext('2d'),
        config
    );

    setTimeout(() => atualizarGraficoAuxEq1(apelidoMaquina, dados, myChartAux), 10000);
}


function atualizarGraficoAuxEq1(apelidoMaquina, dados, myChartAux) {


    fetch(`/medidas/tempo-realAuxEq1/${apelidoMaquina}`, { cache: 'no-store' }).then(function (response) {
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
                proximaAtualizacao = setTimeout(() => atualizarGraficoAuxEq1(apelidoMaquina, dados, myChartAux), 10000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoAuxEq1(apelidoMaquina, dados, myChartAux), 10000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

//  ----------------------  mudar computador
var selectEquipe1 = document.getElementById('selectEquipe1');
var mostrarPc = document.getElementById('pc');

selectEquipe1.addEventListener("change", function () {
    var opcaoSelecionada = selectEquipe1.options[selectEquipe1.selectedIndex];
    mostrarPc.innerHTML = opcaoSelecionada.text;
});