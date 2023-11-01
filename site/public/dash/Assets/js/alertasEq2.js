var item2;

document.getElementById('selectEquipe2').addEventListener('change', function () {
    var apelidoMaquina = document.getElementById('selectEquipe2');
    var apelido = apelidoMaquina.value;

    if (apelido != "") {
        obterdadosEq2(apelido)
        item2 = apelido;    
        atualizacaoPeriodicaEq2()
    }
    
});


var alertas = [];

function obterdadosEq2(apelido) {
    fetch(`/medidasEq2/tempo-realTodosEq2/${apelido}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertareq2(resposta, apelido);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${apelido} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}
function alertareq2(resposta) {
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
        exibirAlertaEq2(grauDeAviso)
    }
    else if (tempcpu > limites.temperatura) {
        grauDeAviso = 'Alerta: CPU muito quente!'
        exibirAlertaEq2(grauDeAviso)

    } else if (cpuFreq > limites.frequencia) {
        grauDeAviso = 'Alerta: CPU com frequência elevada!'
        exibirAlertaEq2(grauDeAviso)

    } else if (gpuFreq > limites.frequencia) {
        grauDeAviso = 'Alerta: GPU com frequência elevada!'
        exibirAlertaEq2(grauDeAviso)

    } else if (redeLatencia > limites.latencia) {

        grauDeAviso = 'Alerta: Latência elevada na rede!'
        exibirAlertaEq2(grauDeAviso)
    
    } else if (ram > limites.ram) {

        grauDeAviso = 'Alerta: Uso muito elevado de RAM!'
        exibirAlertaEq2(grauDeAviso)
    }
}


var problemaEq2 = document.getElementById(`problemaEq2`)

function exibirAlertaEq2(grauDeAviso) {

    problemaEq2.innerHTML = `${grauDeAviso}`;
    abrirToastEq2()
}

function atualizacaoPeriodicaEq2() {
    obterdadosEq2(item2)
    setTimeout(atualizacaoPeriodicaEq2, 10000);
}