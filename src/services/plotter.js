function plot(data){
    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light2", "dark1", "dark2"
        animationEnabled: true, // change to true		
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
        },
        axisY: {
            title: "Population",
        },
        axisX:{
            title: "Year",
            valueFormatString: "#"
          },
        data: Object.keys(data).map((attribute) => ({
                type: "column",
                showInLegend: true,
                name: data[attribute].name,
                dataPoints: data[attribute].map(({x, y}) => ({label: x, y})),
            })
        ),
    });

    if (Object.keys(data).length <= 1) {
        chart.options.data[0].color = "blue";
    }

    chart.render();
}

function clearGraph(){
    graph = document.getElementById("chartContainer");
    graph.innerHTML = "";
}