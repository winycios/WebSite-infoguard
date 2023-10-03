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
ctxTemp.canvas.height = 120;
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
ctxFreq.canvas.height = 120;
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
        borderColor: ['#89cff0'],
        tension: 0.1
    },
    {
        label: 'Pacote',
        data: [0, 1, 2, 5, 0, 1, 2],
        fill: false,
        backgroundColor: ['black'],
        borderColor: ['#ffcc00'],
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
ctxRede.canvas.height = 120;
new Chart(document.getElementById('lineRede').getContext('2d'),
    configRede
);


// charts ocorrencia

const dataOcor = {
    labels: ["hora"],
    datasets: [ {
        label: 'Andamento',
        data: [3],
        backgroundColor: [
            'rgba(255, 159, 64)',
        ],
        borderColor: ['black'],
        tension: 0.1
    }, {
        label: 'Aberto',
        data: [3],
        backgroundColor: [
            'rgba(255, 205, 86)',
        ],
        borderColor: ['black'],
        tension: 0.1
    }, {
        label: 'Concluído',
        data: [3],
        backgroundColor: [
            'rgba(75, 192, 192)',
        ],
        borderColor: ['black'],
        tension: 0.1
    },]
};

const configOcor = {
    type: 'bar',
    data: dataOcor,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Ocorrência',
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
new Chart(document.getElementById('barOco').getContext('2d'),
    configOcor
);