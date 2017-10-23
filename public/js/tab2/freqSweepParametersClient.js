class FreqSweepParameters
{
    constructor(publishTopic)
    {
        this.freqStartMhz = 702.0;
        this.freqStopMhz = 707.0;
        this.freqStepMhz = 0.1;
        this.measDelay = 10.0;
        this.freqMhz = 702.0;
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
      input.setAttribute("value", this.freqStartMhz);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-freqStartMhz");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-freqStartMhz", _this.freqStartMhz)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("MHz");
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
      input.setAttribute("value", this.freqStopMhz);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-freqStopMhz");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-freqStopMhz", _this.freqStopMhz)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("MHz");
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
      input.setAttribute("value", this.freqStepMhz);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-freqStepMhz");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-freqStepMhz", _this.freqStepMhz)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("MHz");
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
      button.setAttribute("id", parentId + "-freqSweepButton");
      button.setAttribute("class", 'powOnButton');
      button.onclick = function() { _this.toggleFreqSweepButton()}; 
      cell.style.textAlign = "center";
      cell.appendChild(button);
      row.appendChild(cell);

      tblBody.appendChild(row);

      tbl.appendChild(tblBody);
      guiDiv.style.border = "thin solid #0095CD";
      guiDiv.appendChild(tbl);
      $( "#" + parentId ).append(guiDiv);
      document.getElementById(parentId).setAttribute("class", 'widgetDiv');
        
    }
    setRfSigGenId(rfSigGenId)
    {
        this.rfSigGenId = rfSigGenId;
    }
    toggleFreqSweepButton()
    {
        var freqSweepOn = $( "#" + this.parentId + "-freqSweepButton" ).html();
        if (freqSweepOn == "Stop")
        {
            $( "#" + this.parentId + "-freqSweepButton" ).html("Start");
            $( "#" + this.parentId + "-freqSweepButton" ).attr('class','powOnButton');
            clearInterval(this.freqSweepTimer);
        }
        else
        {
            $( "#" + this.parentId + "-freqSweepButton" ).html("Stop");
            $( "#" + this.parentId + "-freqSweepButton" ).attr('class','powOffButton');

            this.freqStartMhz = Number($(  "#" + this.parentId + "-freqStartMhz" ).val())
            this.freqStopMhz = Number($(  "#" + this.parentId + "-freqStopMhz" ).val())
            this.freqStepMhz = Number($(  "#" + this.parentId + "-freqStepMhz" ).val())
            this.measDelay = Number($(  "#" + this.parentId + "-measDelay" ).val())
            this.freqMhz = this.freqStartMhz;
            this.powLvl = Number($(  "#" + this.rfSigGenId + "-powLvl" ).val());
            
            freqSweepPlotData.removeRows(0,freqSweepPlotData.getNumberOfRows());

            var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.powLvl.toString(), "rfPowOn":'ON'};
            var data2 = {'topic':this.publishTopic, 'jsonData':data};
            socket.emit('publishRfSigGenMqttTopic', data2);
            console.log(data);
            var _this = this; // a weird thing to do to define button click
            this.freqSweepTimer = setInterval(function(){_this.stepFrequency();}, 1000 * this.measDelay);
        }
    }
    stepFrequency()
    {
        updateFreqSweepPlot(this.freqMhz);
        this.freqMhz = Math.round((this.freqMhz + this.freqStepMhz) * 100.0) / 100.0;
        if (this.freqMhz <= this.freqStopMhz)
        {
            var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.powLvl.toString(), "rfPowOn":'ON'};
            var data2 = {'topic':this.publishTopic, 'jsonData':data};
            console.log(data);
            socket.emit('publishRfSigGenMqttTopic', data2);
        }
        else
        {
            $( "#" + this.parentId + "-freqSweepButton" ).html("Start");
            $( "#" + this.parentId + "-freqSweepButton" ).attr('class','powOnButton');
            clearInterval(this.freqSweepTimer);
        }
    }
    setSettings()
    {
        $( "#" + this.parentId + "-onButton" ).attr('class','powIntButton');
        var rfOn = $( "#" + this.parentId + "-onButton" ).html();
        this.freqMhz = Number($(  "#" + this.parentId + "-freqMhz" ).val())
        this.powLvl = Number($(  "#" + this.parentId + "-powLvl" ).val())
        var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.powLvl.toString(), "rfPowOn":rfOn};
        var data2 = {'topic':this.publishTopic, 'jsonData':data};
        socket.emit('publishRfSigGenMqttTopic', data2);

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