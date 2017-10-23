var freqSweepPlotParentId = 'freqSweepPlot';
var freqSweepPlotData;
var freqSweepPlotChartOptions = {
        hAxis: {title: 'Frequency (MHz)' },
        vAxis: {title: 'Value' },
//        series: {1: {curveType: 'function'} },
//        legend: {position: 'left'},
        height: 500,
        width: 770,
        chartArea:{left:100, top:20, width:'60%', height:'80%'}
      };
var freqSweepChart;
function setupFreqSweepPlot()
{
    var tabLabel = document.createElement("Label");
    tabLabel.setAttribute("for", "name");
    tabLabel.setAttribute("class", 'widgetTab');
    tabLabel.innerHTML = 'Frequency Sweep';
    $( "#" + freqSweepPlotParentId ).append(tabLabel);

    var guiDiv = document.createElement("div");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
     
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.setAttribute("id", freqSweepPlotParentId + "-Cell");

    row.appendChild(cell);
    tblBody.appendChild(row);
    
    tbl.appendChild(tblBody);
    guiDiv.appendChild(tbl);

    guiDiv.style.border = "thin solid #0095CD";
    $( "#" + freqSweepPlotParentId ).append(guiDiv);
    document.getElementById(freqSweepPlotParentId).setAttribute("class", 'widgetDiv');

    google.charts.load('current', {'packages': ['corechart', 'scatter']});
    google.charts.setOnLoadCallback(drawFreqSweepPlot);
}
function drawFreqSweepPlot()
{
    freqSweepPlotData = new google.visualization.DataTable();
    freqSweepPlotData.addColumn('number', 'X');
    freqSweepPlotData.addColumn('number', 'Output Power (kW)');
    freqSweepPlotData.addColumn('number', 'Drive Power x 10 (kW)');
    freqSweepPlotData.addRow([703, 500, 200]);
    freqSweepPlotData.addRow([704, 600, 400]);
    freqSweepPlotData.addRow([705, 300, 100]);
    
    
    freqSweepChart = new google.visualization.ScatterChart(document.getElementById(freqSweepPlotParentId + "-Cell"));
    updateFreqSweepPlot();
}
function updateFreqSweepPlot(freqMhz)
{
    freqSweepPlotData.addRow([freqMhz, klystronFwdPwr, klystronDrvPwr]);
    freqSweepChart.draw(freqSweepPlotData, freqSweepPlotChartOptions);
}
    
