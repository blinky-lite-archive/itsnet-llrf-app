function setupHistoryLinePlot()
{
    var tabLabel = document.createElement("Label");
    tabLabel.setAttribute("for", "name");
    tabLabel.setAttribute("class", 'widgetTab');
    tabLabel.innerHTML = 'History';
    $( "#" + historyLinePlotParentId ).append(tabLabel);

    var guiDiv = document.createElement("div");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
     
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.setAttribute("id", historyLinePlotParentId + "-historyCell");

    row.appendChild(cell);
    tblBody.appendChild(row);
    
    tbl.appendChild(tblBody);
    guiDiv.appendChild(tbl);

    guiDiv.style.border = "thin solid #FFFFFF";
    $( "#" + historyLinePlotParentId ).append(guiDiv);
    document.getElementById(historyLinePlotParentId).setAttribute("class", 'widgetDiv');

    google.charts.load('current', {'packages': ['corechart', 'line']});
    google.charts.setOnLoadCallback(drawHistoryLinePlot);
}
function drawHistoryLinePlot()
{
      historyLinePlotData = new google.visualization.DataTable();
      historyLinePlotData.addColumn('number', 'X');
      historyLinePlotData.addColumn('number', 'Vac');
      historyLinePlotData.addColumn('number', 'Pwr x 0.1');

      historyLinePlotChartOptions = {
        hAxis: {title: 'Time (sec)' },
        vAxis: {title: 'Value' },
//        series: {1: {curveType: 'function'} },
        legend: {position: 'top'},
        height: 400,
        width: 600,
        chartArea:{left:50, top:50, width:'85%', height:'70%'}
      };

      historyLinePlotChart = new google.visualization.LineChart(document.getElementById(historyLinePlotParentId + "-historyCell"));
}
function updateHistoryLinePlot(aioByteGearBoxClass)
{
    var maxTime = 3600;
    klystronIonPump = Number(aioByteGearBoxClass.getGearBoxByteTooth('EGU', aioByteGearBoxClass.getGearBoxByteGear('KLY_IP_ISn_Current'), true).value);
    var now = new Date();
    var secs = (now.getTime() - startDate.getTime()) / 1000;
    if (secs > maxTime) historyLinePlotData.removeRow(0);
    historyLinePlotData.addRow([secs, klystronIonPump, klystronFwdPwr * 0.1]);
    historyLinePlotChart.draw(historyLinePlotData, historyLinePlotChartOptions);
}
    
