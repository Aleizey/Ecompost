import ApexCharts from 'apexcharts';

export function viewGrafic(datos,registros) {

    var options = {
        series: [{
            name: "Desktops",
            data: datos
        }],
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Temperatura',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: registros,
        }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
}
