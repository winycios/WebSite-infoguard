var alertas = [];
var limites = {};

function alertasPlace() {
    var tempSession = sessionStorage.getItem('Temp');
    var freqSession = sessionStorage.getItem('Freq');
    var lateSession = sessionStorage.getItem('Late');
    var ramSession = sessionStorage.getItem('Ram');

    var temp = document.getElementById("temperatura"),
        freq = document.getElementById("frequencia"),
        late = document.getElementById("latencia"),
        ram = document.getElementById("ram");

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

    temp.placeholder = `Indicador atual: ${limites.temperatura}`;
    freq.placeholder = `Indicador atual: ${limites.frequencia}`;
    late.placeholder = `Indicador atual: ${limites.latencia}`;
    ram.placeholder = `Indicador atual: ${limites.ram}`;
}

function validacao() {
    if (sessionStorage.CNPJ_ORGANIZACAO) {
        obterdados();
    }
}

function obterdados() {
    fetch(`/medidas/tempo-realTodosEq1/${sessionStorage.CNPJ_ORGANIZACAO}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    for (i = 0; i < resposta.length; i++) {
                        var pc = resposta[i].apelidoComputador;
                        var tempcpu = resposta[i].cpuTemp;
                        var tempGpu = resposta[i].gpuTemp;
                        var cpuFreq = resposta[i].cpuFreq;
                        var gpuFreq = resposta[i].gpuFreq;
                        var redeLatencia = resposta[i].redeLatencia;
                        var ram = resposta[i].ram;

                        var grauDeAviso = "";


                        if (tempGpu > limites.temperatura) {
                            grauDeAviso = 'Perigo: GPU muito quente!'
                            exibirAlerta(grauDeAviso, pc)

                            return true;
                        }
                        else if (tempcpu > limites.temperatura) {
                            grauDeAviso = 'Alerta: CPU muito quente!'
                            exibirAlerta(grauDeAviso, pc)

                            return true;

                        } else if (cpuFreq > limites.frequencia) {
                            grauDeAviso = 'Alerta: CPU com frequência elevada!'
                            exibirAlerta(grauDeAviso, pc)

                            return true;

                        } else if (gpuFreq > limites.frequencia) {
                            grauDeAviso = 'Alerta: GPU com frequência elevada!'
                            exibirAlerta(grauDeAviso, pc)

                            return true;

                        } else if (redeLatencia > limites.latencia) {

                            grauDeAviso = 'Alerta: Latência elevada na rede!'
                            exibirAlerta(grauDeAviso, pc)

                            return true;

                        } else if (ram > limites.ram) {

                            grauDeAviso = 'Alerta: Uso muito elevado de RAM!'
                            exibirAlerta(grauDeAviso, pc)

                            return true;
                        }
                    }


                });
            } else {
                console.error(`Nenhum dado encontrado ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ alerta: ${error.message}`);
        });

}


var titulo = document.getElementById(`maquina`);
var problema = document.getElementById(`problema`);

function exibirAlerta(grauDeAviso, pc) {

    titulo.innerHTML = pc;
    problema.innerHTML = `${grauDeAviso}`;
    abrirToast()
}


function atualizacaoPeriodica() {
    validacao()
    alertasPlace()
    setTimeout(atualizacaoPeriodica, 10000);
}