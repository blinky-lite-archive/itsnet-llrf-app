class PowerSweepParameters
{
    constructor(publishTopic)
    {
        this.powerStart = -17;
        this.powerStop = -6;
        this.powerStep = 0.1;
        this.measDelay = 10.0;
        this.power = -17;
        this.publishTopic = publishTopic;
    }
    createGui(parentId)
    {
      var _this = this; // a weird thing to do to define button click
      this.parentId = parentId;
      var guiDiv = document.createElement("div");
      var tabLabel = document.createElement("Label");
      tabLabel.setAttribute("for", "name");
      tabLabel.setAttribute("class", 'widgetTab');
      tabLabel.innerHTML = 'Parameters';
      $( "#" + parentId ).append(tabLabel);

      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
     
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Start");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      var input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.powerStart);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-powerStart");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-powerStart", _this.powerStart)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("dBm");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cellText = document.createTextNode("Stop");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.powerStop);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-powerStop");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-powerStop", _this.powerStop)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("dBm");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cellText = document.createTextNode("Step");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.powerStep);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-powerStep");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-powerStep", _this.powerStep)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("dBm");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cellText = document.createTextNode("Delay");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.measDelay);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-measDelay");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-measDelay", _this.measDelay)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("Secs");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cellText = document.createTextNode(" ");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      var button = document.createElement("BUTTON");
      var buttonText = document.createTextNode("Start");     
      button.style.width = '60px';
      button.style.height = '30px';
      button.style.textAlign = "center";
      button.appendChild(buttonText);
      button.setAttribute("id", parentId + "-powerSweepButton");
      button.setAttribute("class", 'powOnButton');
      button.onclick = function() { _this.togglePowerSweepButton()}; 
      cell.style.textAlign = "center";
      cell.appendChild(button);
      row.appendChild(cell);

      tblBody.appendChild(row);

      tbl.appendChild(tblBody);
      guiDiv.style.border = "thin solid #FFFFFF";
      guiDiv.appendChild(tbl);
      $( "#" + parentId ).append(guiDiv);
      document.getElementById(parentId).setAttribute("class", 'widgetDiv');
        
    }
    setRfSigGenId(rfSigGenId)
    {
        this.rfSigGenId = rfSigGenId;
    }
    togglePowerSweepButton()
    {
        var powerSweepOn = $( "#" + this.parentId + "-powerSweepButton" ).html();
        if (powerSweepOn == "Stop")
        {
            $( "#" + this.parentId + "-powerSweepButton" ).html("Start");
            $( "#" + this.parentId + "-powerSweepButton" ).attr('class','powOnButton');
            clearInterval(this.powerSweepTimer);
        }
        else
        {
            $( "#" + this.parentId + "-powerSweepButton" ).html("Stop");
            $( "#" + this.parentId + "-powerSweepButton" ).attr('class','powOffButton');

            this.powerStart = Number($(  "#" + this.parentId + "-powerStart" ).val())
            this.powerStop = Number($(  "#" + this.parentId + "-powerStop" ).val())
            this.powerStep = Number($(  "#" + this.parentId + "-powerStep" ).val())
            this.measDelay = Number($(  "#" + this.parentId + "-measDelay" ).val())
            this.power = this.powerStart;
            this.freqMhz = Number($(  "#" + this.rfSigGenId + "-freqMhz" ).val());
            
            powerSweepPlotData.removeRows(0,powerSweepPlotData.getNumberOfRows());

            var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.power.toString(), "rfPowOn":'ON'};
            var data2 = {'topic':this.publishTopic, 'jsonData':data};
            socket.emit('publishRfSigGenMqttTopic', data2);
            console.log(data);
            var _this = this; // a weird thing to do to define button click
            this.powerSweepTimer = setInterval(function(){_this.stepPower();}, 1000 * this.measDelay);
        }
    }
    stepPower()
    {
        updatePowerSweepPlot(this.power);
        this.power = Math.round((this.power + this.powerStep) * 100.0) / 100.0;
        if (this.power <= this.powerStop)
        {
            var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.power.toString(), "rfPowOn":'ON'};
            var data2 = {'topic':this.publishTopic, 'jsonData':data};
            console.log(data);
            socket.emit('publishRfSigGenMqttTopic', data2);
        }
        else
        {
            $( "#" + this.parentId + "-powerSweepButton" ).html("Start");
            $( "#" + this.parentId + "-powerSweepButton" ).attr('class','powOnButton');
            clearInterval(this.powerSweepTimer);
            var csv = google.visualization.dataTableToCsv(powerSweepPlotData);
            socket.emit('powerSweepData', csv);
        }
    }
    inputFieldChange(id, storedValue)
    {
        if (storedValue != $( "#" + id).val())
        {
            $( "#" + id).attr('class','inputFieldChange');
        }
        else
        {
            $( "#" + id).attr('class','inputFieldNormal');
        }
    }
}