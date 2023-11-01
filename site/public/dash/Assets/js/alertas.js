var item;

document.getElementById('selectEquipe1').addEventListener('change', function () {
    var apelidoMaquina = document.getElementById('selectEquipe1');
    var apelido = apelidoMaquina.value;

    if (apelido != "") {
        obterdados(apelido)
        item = apelido;
        atualizacaoPeriodica()
    }

});

var alertas = [];

function obterdados(apelido) {
    fetch(`/medidas/tempo-realTodosEq1/${apelido}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, apelido);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${apelido} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}
function alertar(resposta) {
    var tempcpu = resposta[0].cpuTemp;
    var tempGpu = resposta[0].gpuTemp;
    var cpuFreq = resposta[0].cpuFreq;
    var gpuFreq = resposta[0].gpuFreq;
    var redeLatencia = resposta[0].redeLatencia;
    var ram = resposta[0].ram;


    var grauDeAviso = '';

    var limites = {
        temperatura: 80,
        frequencia: 70,
        latencia: 25,
        ram: 90
    };


    if (tempGpu > limites.temperatura) {
        grauDeAviso = 'Perigo: GPU muito quente!'
        exibirAlerta(grauDeAviso)
    }
    else if (tempcpu > limites.temperatura) {
        grauDeAviso = 'Alerta: CPU muito quente!'
        exibirAlerta(grauDeAviso)

    } else if (cpuFreq > limites.frequencia) {
        grauDeAviso = 'Alerta: CPU com frequência elevada!'
        exibirAlerta(grauDeAviso)

    } else if (gpuFreq > limites.frequencia) {
        grauDeAviso = 'Alerta: GPU com frequência elevada!'
        exibirAlerta(grauDeAviso)

    } else if (redeLatencia > limites.latencia) {

        grauDeAviso = 'Alerta: Latência elevada na rede!'
        exibirAlerta(grauDeAviso)

    } else if (ram > limites.ram) {

        grauDeAviso = 'Alerta: Uso muito elevado de RAM!'
        exibirAlerta(grauDeAviso)
    }
}


var problema = document.getElementById(`problema`)

function exibirAlerta(grauDeAviso) {

    problema.innerHTML = `${grauDeAviso}`;
    abrirToast()
}


function atualizacaoPeriodica() {
    obterdados(item)
    setTimeout(atualizacaoPeriodica, 10000);
}