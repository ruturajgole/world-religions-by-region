function plot(data){
    const chart = new CanvasJS.Chart("chartContainer", {
        theme: "dark1", // "light2", "dark1", "dark2"
        animationEnabled: false, // change to true		
        title:{
            text: "Basic Column Chart",
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            horizontalAlign: "center",
            dockInsidePlotArea: true,
        },
        axisX:{
            valueFormatString: "#"
          },
        data: Object.keys(data).map((attribute) => ({
                type: "line",
                showInLegend: true,
                dataPoints: data[attribute].map(({x, y}) => ({x, y})),
            })
        ),
    });
    chart.render();
}

function clearGraph(){
    graph = document.getElementById("chartContainer");
    graph.innerHTML = "";
}