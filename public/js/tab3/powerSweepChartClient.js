var powerSweepPlotParentId = 'powerSweepPlot';
var powerSweepPlotData;
var powerSweepPlotChartOptions = {
        hAxis: {title: 'Drive Power (dBm)' },
        vAxis: {title: 'Value' },
//        series: {1: {curveType: 'function'} },
//        legend: {position: 'left'},
        height: 500,
        width: 770,
        chartArea:{left:100, top:20, width:'60%', height:'80%'}
      };
var powerSweepChart;
function setupPowerSweepPlot()
{
    var tabLabel = document.createElement("Label");
    tabLabel.setAttribute("for", "name");
    tabLabel.setAttribute("class", 'widgetTab');
    tabLabel.innerHTML = 'Power Sweep';
    $( "#" + powerSweepPlotParentId ).append(tabLabel);

    var guiDiv = document.createElement("div");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
     
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.setAttribute("id", powerSweepPlotParentId + "-Cell");

    row.appendChild(cell);
    tblBody.appendChild(row);
    
    tbl.appendChild(tblBody);
    guiDiv.appendChild(tbl);

    guiDiv.style.border = "thin solid #FFFFFF";
    $( "#" + powerSweepPlotParentId ).append(guiDiv);
    document.getElementById(powerSweepPlotParentId).setAttribute("class", 'widgetDiv');

    google.charts.load('current', {'packages': ['corechart', 'scatter']});
    google.charts.setOnLoadCallback(drawPowerSweepPlot);
}
function drawPowerSweepPlot()
{
    powerSweepPlotData = new google.visualization.DataTable();
    powerSweepPlotData.addColumn('number', 'X');
    powerSweepPlotData.addColumn('number', 'Output Power (kW)');
    powerSweepPlotData.addColumn('number', 'Gain x 10 (dB)');
    powerSweepPlotData.addRow([5, 500, 200]);
    powerSweepPlotData.addRow([8, 600, 400]);
    powerSweepPlotData.addRow([9, 300, 100]);
    
    
    powerSweepChart = new google.visualization.ScatterChart(document.getElementById(powerSweepPlotParentId + "-Cell"));
    updatePowerSweepPlot();
}
function updatePowerSweepPlot(power)
{
    powerSweepPlotData.addRow([klystronDrvPwr, klystronFwdPwr, klystronGain * 10.0]);
    powerSweepChart.draw(powerSweepPlotData, powerSweepPlotChartOptions);
}
    
