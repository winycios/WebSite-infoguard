// chart de barras temperatura
let dadosTemp_eq2 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'Temperatura GPU',
        data: [12, 19, 3],
        borderWidth: 1,
        backgroundColor: ['rgba(46, 204, 113, 1)'],
        borderColor: 'black',
    }, {
        label: 'Temperatura CPU',
        fill: false,
        data: [12, 19, 3],
        backgroundColor: ['rgba(231, 76, 60, 1)'],
        borderColor: 'white',
    }]
};

const configTemp_eq2 = {
    type: 'bar',
    data: dadosTemp_eq2,
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

const ctxTemp_eq2 = document.getElementById('barTemp_eq2').getContext('2d');
ctxTemp_eq2.canvas.width = 200;
ctxTemp_eq2.canvas.height = 200;
new Chart(document.getElementById('barTemp_eq2').getContext('2d'),
    configTemp_eq2
);

// chart de barras frequência
let dadosFreq_eq2 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        label: 'Frequência GPU',
        data: [12, 19, 3],
        borderWidth: 1,
        backgroundColor: ['rgba(46, 204, 113, 1)'],
        borderColor: 'black',
    }, {
        label: 'Frequência CPU',
        fill: false,
        data: [12, 19, 3],
        backgroundColor: ['rgba(231, 76, 60, 1)'],
        borderColor: 'white',
    }]
};

const configFreq_eq2 = {
    type: 'bar',
    data: dadosFreq_eq2,
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

const ctxFreq_eq2 = document.getElementById('barFreq_eq2').getContext('2d');
ctxFreq_eq2.canvas.width = 200;
ctxFreq_eq2.canvas.height = 200;
new Chart(document.getElementById('barFreq_eq2').getContext('2d'),
    configFreq_eq2
);

// charts de rede internet

const dataRede_eq2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: 'Latência',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: ['black'],
        borderColor: ['rgba(46, 204, 113, 1)'],
        tension: 0.1
    },
    {
        label: 'Pacote',
        data: [0, 1, 2, 5, 0, 1, 2],
        fill: false,
        backgroundColor: ['black'],
        borderColor: ['rgba(231, 76, 60, 1)'],
        tension: 0.1
    }]
};

const configRede_eq2 = {
    type: 'line',
    data: dataRede_eq2,
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

const ctxRede_eq2 = document.getElementById('lineRede_eq2').getContext('2d');
ctxRede_eq2.canvas.width = 200;
ctxRede_eq2.canvas.height = 200;
new Chart(document.getElementById('lineRede_eq2').getContext('2d'),
    configRede_eq2
);

// charts auxiliares

const dataAux_eq2 = {
    labels: ["hora"],
    datasets: [{
        label: 'Disco',
        data: [3],
        backgroundColor: ['rgba(46, 204, 113, 1)'],
        borderColor: ['black'],
        tension: 0.1
    }, {
        label: 'ram',
        data: [3],
        backgroundColor: [
            'rgba(231, 76, 60, 1)',
        ],
        borderColor: ['black'],
        tension: 0.1
    }]
};

const configAux_eq2 = {
    type: 'bar',
    data: dataAux_eq2,
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

const ctxAux_eq2 = document.getElementById('barAux_eq2').getContext('2d');
ctxAux_eq2.canvas.width = 200;
ctxAux_eq2.canvas.height = 200;
new Chart(document.getElementById('barAux_eq2').getContext('2d'),
configAux_eq2
);

//  ----------------------  mudar computador
var pc2 = document.getElementById('selectEquipe2');

pc2.addEventListener("click", function () {
    var mostrarPc = document.getElementById('pc2');

    mostrarPc.innerHTML = pc2.value;
});