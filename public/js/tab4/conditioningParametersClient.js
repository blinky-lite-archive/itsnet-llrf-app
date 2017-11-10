class ConditioningParameters
{
    constructor()
    {
        this.restartTimeout = 10;
        this.resetLevel = -20;
        this.powerStep = 0.1;
        this.stepDelay = 1;
        this.maxPower = -19;
        this.waitForReset = false;
        this.pinSwitchOnDate = new Date();
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
      var cellText = document.createTextNode("Reset Wait");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      var input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.restartTimeout);
      input.setAttribute("step", "10");
      input.setAttribute("id",parentId + "-restartTimeout");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-restartTimeout", _this.restartTimeout)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("Seconds");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cellText = document.createTextNode("Reset Level");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.resetLevel);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-resetLevel");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-resetLevel", _this.resetLevel)};
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
      cellText = document.createTextNode("Step Delay");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.stepDelay);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-stepDelay");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-stepDelay", _this.stepDelay)};
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
      cellText = document.createTextNode("Max Power Level");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.maxPower);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-maxPower");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-maxPower", _this.maxPower)};
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
      button.setAttribute("id", parentId + "-conditioningButton");
      button.setAttribute("class", 'powOnButton');
      button.onclick = function() { _this.toggleConditioningButton()}; 
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
    setRfSigGenParams(rfSigGenId, rfSigGenPublishTopic, fastInterlock)
    {
        this.rfSigGenId = rfSigGenId;
        this.rfSigGenPublishTopic = rfSigGenPublishTopic;
        this.fastInterlock = fastInterlock;
    }
    toggleConditioningButton()
    {
        var powerSweepOn = $( "#" + this.parentId + "-conditioningButton" ).html();
        if (powerSweepOn == "Stop")
        {
            $( "#" + this.parentId + "-conditioningButton" ).html("Start");
            $( "#" + this.parentId + "-conditioningButton" ).attr('class','powOnButton');
            clearInterval(this.conditioningTimer);
        }
        else
        {
            $( "#" + this.parentId + "-conditioningButton" ).html("Stop");
            $( "#" + this.parentId + "-conditioningButton" ).attr('class','powOffButton');

            this.restartTimeout = Number($(  "#" + this.parentId + "-restartTimeout" ).val());
            this.resetLevel = Number($(  "#" + this.parentId + "-resetLevel" ).val());
            this.powerStep = Number($(  "#" + this.parentId + "-powerStep" ).val());
            this.stepDelay = Number($(  "#" + this.parentId + "-stepDelay" ).val());
            this.maxPower = Number($(  "#" + this.parentId + "-maxPower" ).val());
            this.power = this.resetLevel;
            this.freqMhz = Number($(  "#" + this.rfSigGenId + "-freqMhz" ).val());
            this.waitForReset = false;
            var data = {"pinSwitch":'ON'};
            var data2 = {'topic':'toshibaFastInterlock/set', 'jsonData':data};
            socket.emit('publishFastInterlockMqttTopic', data2);

            var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.power.toString(), "rfPowOn":'ON'};
            var data2 = {'topic':this.rfSigGenPublishTopic, 'jsonData':data};
            socket.emit('publishRfSigGenMqttTopic', data2);
            this.pinSwitchOnDate = new Date();
            var _this = this; // a weird thing to do to define button click
            this.conditioningTimer = setInterval(function(){_this.stepPower();}, 1000 * this.stepDelay);
        }
    }
    stepPower()
    {
        if (this.waitForReset) return;
        if (this.fastInterlock.fastTripDetected())
        {
            var tripDate = new Date();
            var upTime = Math.round((tripDate.getTime() - this.pinSwitchOnDate.getTime()) / 1000);
            var data = {"uptime":upTime.toString(), 'tripcounter':this.fastInterlock.myTripCounter()};
            var data2 = {'topic':'toshiba/uptime', 'jsonData':data};
            socket.emit('publishPulseTripMqttTopic', data2);

            this.power = this.resetLevel;
            data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.power.toString(), "rfPowOn":'ON'};
            data2 = {'topic':this.rfSigGenPublishTopic, 'jsonData':data};
            socket.emit('publishRfSigGenMqttTopic', data2);
            this.fastInterlock.reset();
            this.waitForReset = true;
            var _this = this; // a weird thing to do to define button click
            setTimeout(function()
            {
                _this.power = _this.resetLevel;
                _this.waitForReset = false;
                var data = {"pinSwitch":'ON'};
                var data2 = {'topic':'toshibaFastInterlock/set', 'jsonData':data};
                socket.emit('publishFastInterlockMqttTopic', data2);
                _this.pinSwitchOnDate = new Date();
            }, this.restartTimeout * 1000);
            return;
        }
        if (this.power < this.maxPower)
        {
            this.power = Math.round((this.power + this.powerStep) * 100.0) / 100.0;
            if (this.power > this.maxPower) this.power = this.maxPower;
            if (this.power <= this.maxPower)
            {
                var data = {"rfFreq":this.freqMhz.toString(), "rfPowLvl":this.power.toString(), "rfPowOn":'ON'};
                var data2 = {'topic':this.rfSigGenPublishTopic, 'jsonData':data};
                console.log(data);
                socket.emit('publishRfSigGenMqttTopic', data2);
            }
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