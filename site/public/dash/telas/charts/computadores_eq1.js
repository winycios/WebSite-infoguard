// chart de barras temperatura
let dadosTemp = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'Temperatura GPU',
        data: [12, 19, 3],
        borderWidth: 1,
        backgroundColor: ['#ffcc00'],
        borderColor: 'black',
    }, {
        label: 'Temperatura CPU',
        fill: false,
        data: [12, 19, 3],
        backgroundColor: ['#89cff0'],
        borderColor: 'white',
    }]
};

const configTemp = {
    type: 'bar',
    data: dadosTemp,
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
new Chart(document.getElementById('barTemp').getContext('2d'),
    configTemp
);

// chart de barras frequência
let dadosFreq = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'Frequência GPU',
        data: [12, 19, 3],
        borderWidth: 1,
        backgroundColor: ['#ffcc00'],
        borderColor: 'black',
    }, {
        label: 'Frequência CPU',
        fill: false,
        data: [12, 19, 3],
        backgroundColor: ['#89cff0'],
        borderColor: 'white',
    }]
};

const configFreq = {
    type: 'bar',
    data: dadosFreq,
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
new Chart(document.getElementById('barFreq').getContext('2d'),
    configFreq
);

// charts de rede internet

const dataRede = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Latência',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: ['black'],
        borderColor: ['#ffcc00'],
        tension: 0.1
    },
    {
        label: 'Pacote',
        data: [0, 1, 2, 5, 0, 1, 2],
        fill: false,
        backgroundColor: ['black'],
        borderColor: ['#89cff0'],
        tension: 0.1
    }]
};

const configRede = {
    type: 'line',
    data: dataRede,
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
new Chart(document.getElementById('lineRede').getContext('2d'),
    configRede
);

// charts auxiliares

const dataAux = {
    labels: ["hora"],
    datasets: [{
        label: 'Disco',
        data: [3],
        backgroundColor: [
            '#ffcc00'
        ],
        borderColor: ['black'],
        tension: 0.1
    }, {
        label: 'ram',
        data: [3],
        backgroundColor: [
            '#89cff0'
        ],
        borderColor: ['black'],
        tension: 0.1
    }]
};

const configAux = {
    type: 'bar',
    data: dataAux,
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

const ctxOco = document.getElementById('barAux').getContext('2d');
ctxOco.canvas.width = 200;
ctxOco.canvas.height = 200;
new Chart(document.getElementById('barAux').getContext('2d'),
configAux
);

//  ----------------------  mudar computador
var pc1 = document.getElementById('selectEquipe1');

pc1.addEventListener("click", function () {
    var mostrarPc = document.getElementById('pc');

    mostrarPc.innerHTML = pc1.value;
});