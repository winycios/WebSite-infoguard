var alertas = [];
var limites = {};

function atualizarLimite2() {
    var tempSession = sessionStorage.getItem('Temp');
    var freqSession = sessionStorage.getItem('Freq');
    var lateSession = sessionStorage.getItem('Late');
    var ramSession = sessionStorage.getItem('Ram');

    // verifica se tem algum valor na session storage, caso não, será iniciado com valores genericos
    if ((tempSession)) {

        limites = {
            temperatura: tempSession,
            frequencia: freqSession,
            latencia: lateSession,
            ram: ramSession
        }
    } else {
        limites = {
            temperatura: 80,
            frequencia: 70,
            latencia: 25,
            ram: 90
        };
    }
}

function validacao2() {
    if (sessionStorage.CNPJ_ORGANIZACAO) {
        obterdadosEq2();
    }
}


function obterdadosEq2() {
    fetch(`/medidasEq2/tempo-realTodosEq2/${sessionStorage.CNPJ_ORGANIZACAO}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    for (i = 0; i < resposta.length; i++) {
                        var pc2 = resposta[i].apelidoComputador;
                        var tempc2pu = resposta[i].cpuTemp;
                        var tempGpu = resposta[i].gpuTemp;
                        var cpuFreq = resposta[i].cpuFreq;
                        var gpuFreq = resposta[i].gpuFreq;
                        var redeLatencia = resposta[i].redeLatencia;
                        var ram = resposta[i].ram;



                        var grauDeAviso = "";


                        if (tempGpu > limites.temperatura) {
                            grauDeAviso = 'Perigo: GPU muito quente!'
                            exibirAlertaEq2(grauDeAviso, pc2)

                            return true;
                        }
                        else if (tempc2pu > limites.temperatura) {
                            grauDeAviso = 'Alerta: CPU muito quente!'
                            exibirAlertaEq2(grauDeAviso, pc2)

                            return true;

                        } else if (cpuFreq > limites.frequencia) {
                            grauDeAviso = 'Alerta: CPU com frequência elevada!'
                            exibirAlertaEq2(grauDeAviso, pc2)

                            return true;

                        } else if (gpuFreq > limites.frequencia) {
                            grauDeAviso = 'Alerta: GPU com frequência elevada!'
                            exibirAlertaEq2(grauDeAviso, pc2)

                            return true;

                        } else if (redeLatencia > limites.latencia) {

                            grauDeAviso = 'Alerta: Latência elevada na rede!'
                            exibirAlertaEq2(grauDeAviso, pc2)

                            return true;

                        } else if (ram > limites.ram) {

                            grauDeAviso = 'Alerta: Uso muito elevado de RAM!'
                            exibirAlertaEq2(grauDeAviso, pc2)

                            return true;
                        }
                    }
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${apelido} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

var titulo2 = document.getElementById(`maquinaEq2`)
var problemaEq2 = document.getElementById(`problemaEq2`)

function exibirAlertaEq2(grauDeAviso, pc2) {

    titulo2.innerHTML = pc2;
    problemaEq2.innerHTML = `${grauDeAviso}`;
    abrirToastEq2()
}

function atualizacaoPeriodicaEq2() {
    validacao2()
    atualizarLimite2()
    setTimeout(atualizacaoPeriodicaEq2, 10000);
}