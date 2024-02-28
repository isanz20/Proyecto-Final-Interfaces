function dibujarGross(datosGross) {
    let grafGross = echarts.init(document.getElementById('graficoGross'));

    let option = {
        title: {
            text: "Media de ingresos por año",
        },
        tooltip: {},
        xAxis: {
            data: Array.from(datosGross.keys())
        },
        yAxis: {},
        series: [
            {
                name: "Ingresos",
                type: "bar",
                data: Array.from(datosGross.values())
            }
        ]
    };

    grafGross.setOption(option);
}

function dibujarAnios(datosAnios) {
    let datosGraf = [];
    datosAnios.forEach((valor, clave) => {
        datosGraf.push({
            value: valor,
            name: clave
        });
    });
    let grafAnios = echarts.init(document.getElementById('graficoAnios'));
    let option = {
        title: {
            text: "Películas cada año",
        },
        tooltip: {},
        series: [
            {
                name: "peliculas",
                type: 'pie',
                data: datosGraf,
                radius: ['30%', '70%'],
            }
        ]
    }
    grafAnios.setOption(option);
}

grossPorAnio()
    .then(datos => {
        dibujarGross(datos[0]);
        dibujarAnios(datos[1]);
    });