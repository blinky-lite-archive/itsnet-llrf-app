var forwardPowerGaugeData;
var forwardPowerGaugeChart;
var forwardPowerGaugeOptions;
var forwardPowerGaugeParentId = 'googleGauge'; 
var klystronFwdPwr = 0.0;
var klystronDrvPwr = 0.0;
var klystronGain = 0.0;
function setupGaugePlots()
{
    var tabLabel = document.createElement("Label");
    tabLabel.setAttribute("for", "name");
    tabLabel.setAttribute("class", 'widgetTab');
    tabLabel.innerHTML = 'Klystron Power';
    $( "#" + forwardPowerGaugeParentId ).append(tabLabel);

    var guiDiv = document.createElement("div");
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
     
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.setAttribute("id", forwardPowerGaugeParentId + "-gaugeCell");

    row.appendChild(cell);
//    tblBody.appendChild(row);
//    row = document.createElement("tr");
    cell = document.createElement("td");
    cell.setAttribute("class", 'cellText');
    cell.setAttribute("id", forwardPowerGaugeParentId + "-powerCell");
    var tbl2 = document.createElement("table");
    tbl2.setAttribute('width', '100%');
    var tblBody2 = document.createElement("tbody");
     
    var row2 = document.createElement("tr");
    var cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Fwd Pow';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-FwdPowCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'dBm';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Drv Pow';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-DrvPowCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'dBm';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Gain';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-GainPowCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'dB';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Trip Cntr';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-TripCounterCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = ' ';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Trip Rate';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-TripRateCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '/hr';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Trip Date';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-TripDateCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-TripDateTimeCell");
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'TL Freq';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-TimeLineFreqPowCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Hz';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    row2 = document.createElement("tr");
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'Vac';
    cell2.style.textAlign = "left";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = '0';
    cell2.setAttribute("id", forwardPowerGaugeParentId + "-VacPowCell");
    cell2.style.textAlign = "center";
    row2.appendChild(cell2);
    cell2 = document.createElement("td");
    cell2.setAttribute("class", 'cellText');
    cell2.innerHTML = 'nA';
    cell2.style.textAlign = "right";
    row2.appendChild(cell2);

    tblBody2.appendChild(row2);

    tbl2.appendChild(tblBody2);
    cell.appendChild(tbl2);

    row.appendChild(cell);
    tblBody.appendChild(row);
    
    tbl.appendChild(tblBody);
    guiDiv.appendChild(tbl);

    guiDiv.style.border = "thin solid #FFFFFF";
    $( "#" + forwardPowerGaugeParentId ).append(guiDiv);
    document.getElementById(forwardPowerGaugeParentId).setAttribute("class", 'widgetDiv');

    google.charts.load('current', {'packages': ['corechart', 'gauge']});
    google.charts.setOnLoadCallback(drawChart);
}
function drawChart()
{
    forwardPowerGaugeData = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Power kW', 0]
    ]);
    forwardPowerGaugeData.setValue(0, 1, Number(0));
    forwardPowerGaugeOptions = {
        width: 113,
        height: 113,
        minorTicks: 8,
        max: 1600,
        greenFrom: 400,
        greenTo: 1200,
        yellowFrom: 0,
        yellowTo: 400,
        redFrom: 1200,
        redTo: 1600
    };
    forwardPowerGaugeChart = new google.visualization.Gauge(document.getElementById(forwardPowerGaugeParentId + "-gaugeCell"));
//    forwardPowerGaugeChart.draw(forwardPowerGaugeData, forwardPowerGaugeOptions);
}
function updateGaugePlots(data)
{
//    console.log("Received: " + JSON.stringify(data));
    var pow1 = Math.round(1000 * Number(data['power1'])) / 1000.0;
    var pow2 = Math.round(1000 * Number(data['power2'])) / 1000.0;
    klystronFwdPwr =  Math.pow(10.0, (pow1 - 60.0) / 10.0);
    klystronDrvPwr =  Math.round(100.0 * Math.pow(10.0, (pow2 - 30.0) / 10.0)) / 100.0;
    klystronGain = Math.round(100.0 * (pow1-pow2)) / 100.0;
    forwardPowerGaugeData.setValue(0, 1, klystronFwdPwr);
    forwardPowerGaugeChart.draw(forwardPowerGaugeData, forwardPowerGaugeOptions);
    $( "#" + forwardPowerGaugeParentId + "-FwdPowCell" ).html(pow1);
    $( "#" + forwardPowerGaugeParentId + "-DrvPowCell" ).html(pow2);
    $( "#" + forwardPowerGaugeParentId + "-GainPowCell" ).html(klystronGain);
    $( "#" + forwardPowerGaugeParentId + "-VacPowCell" ).html(klystronIonPump);
    
}
function updateTimeLineFreq(data) 
{
    $( "#" + forwardPowerGaugeParentId + "-TimeLineFreqPowCell" ).html(data.freq);
}
