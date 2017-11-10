class FastInterlock
{
    constructor(label)
    {
        this.label = label;
        this.settingsDisabled = true;
        this.pinSwitchOn = false;
        this.tripDetected = false;
        this.tripCounter = '-1';
    }
    setCpuByteGearBox(cpuByteGearBox)
    {
        this.cpuByteGearBox = cpuByteGearBox;
    }
    createGui(parentId)
    {
      var _this = this; // a weird thing to do to define button click
      this.parentId = parentId;
      var tabLabel = document.createElement("Label");
      tabLabel.setAttribute("for", "name");
      tabLabel.setAttribute("class", 'widgetTab');
      tabLabel.innerHTML = this.label;
      $( "#" + parentId ).append(tabLabel);

      var guiDiv = document.createElement("div");
      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
     
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      var button = document.createElement("BUTTON");
      var buttonText = document.createTextNode("Reset");     
      button.style.textAlign = "center";
      button.appendChild(buttonText);
      button.setAttribute("id", parentId + "-resetButton");
      button.setAttribute("class", 'resetFastInterlockButton');
      button.onclick = function() { _this.reset()}; 
      cell.style.textAlign = "center";
      cell.appendChild(button);
      row.appendChild(cell);
      
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      var cellText = document.createTextNode("Reflected Power Trip :");
      cell.style.textAlign = "right";
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      var img = document.createElement("img");
      img.src = "images/redlight.png";      
      img.setAttribute("class", 'fastInterlockTripLed');
      img.setAttribute("id", parentId + "-reflectedPowerTripLed");
      cell.appendChild(img);
      row.appendChild(cell);
      
      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      row.appendChild(cell);

      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      cellText = document.createTextNode("CERN Arc Det. Trip:");
      cell.style.textAlign = "right";
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      img = document.createElement("img");
      img.src = "images/redlight.png";      
      img.setAttribute("class", 'fastInterlockTripLed');
      img.setAttribute("id", parentId + "-cernArcTripLed");
      cell.appendChild(img);
      row.appendChild(cell);
      
      tblBody.appendChild(row);

      row = document.createElement("tr");
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      button = document.createElement("BUTTON");
      buttonText = document.createTextNode("Pin Switch");     
      button.style.textAlign = "center";
      button.appendChild(buttonText);
      button.setAttribute("id", parentId + "-pinSwitchButton");
      button.setAttribute("class", 'pinSwitchOffButton');
      button.onclick = function() { _this.pinSwitch()}; 
      cell.style.textAlign = "center";
      cell.appendChild(button);
      row.appendChild(cell);
      
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      cellText = document.createTextNode("AFT Arc Det. Trip:");
      cell.style.textAlign = "right";
      cell.appendChild(cellText);
      row.appendChild(cell);
      
      cell = document.createElement("td");
      cell.setAttribute("class", 'cellText');
      img = document.createElement("img");
      img.src = "images/redlight.png";      
      img.setAttribute("class", 'fastInterlockTripLed');
      img.setAttribute("id", parentId + "-aftArcTripLed");
      cell.appendChild(img);
      row.appendChild(cell);
      
      tblBody.appendChild(row);

      tbl.appendChild(tblBody);
      guiDiv.style.border = "thin solid #FFFFFF";
      guiDiv.appendChild(tbl);
      $( "#" + parentId ).append(guiDiv);
      document.getElementById(parentId).setAttribute("class", 'widgetDiv');
    }
    reset()
    {
        $('#' + this.parentId + '-resetButton').attr('class','resetFastInterlockButtonPressed');
        this.cpuByteGearBox.getGearBoxByteTooth('RESET',       this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'TRUE';
        this.cpuByteGearBox.getGearBoxByteTooth('OFF_CMD',     this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('AUX_CMD',     this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('FIL_CMD',     this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('STBY_CMD',    this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('HV_CMD'  ,    this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('RF_CMD',      this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('TEST_ALL_AD', this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('WR_DATA',     this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'TRUE';
        var bufLen = Number(this.cpuByteGearBox.byteGearBoxJsonData.writeByteLength);
        var setBuffer = new ArrayBuffer(bufLen);
        var intView8 = new Int8Array(setBuffer);
        var setBuffer2 = new ArrayBuffer(bufLen* 2);
        var intView82 = new Int8Array(setBuffer2);
        this.cpuByteGearBox.getGearBoxByteData(intView8, false);
        for (var ii = 0; ii < bufLen; ++ii) intView82[ii] = intView8[ii];
        this.cpuByteGearBox.getGearBoxByteTooth('RESET',       this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteTooth('WR_DATA',     this.cpuByteGearBox.getGearBoxByteGear('CPU_CONF'), false).value = 'FALSE';
        this.cpuByteGearBox.getGearBoxByteData(intView8, false);
        for (var ii = 0; ii < bufLen; ++ii) intView82[ii + bufLen] = intView8[ii];
        socket.emit('publish' + this.cpuByteGearBox.byteGearBoxJsonData.topic, setBuffer2);

        var data = {"reset":'TRUE'};
        var data2 = {'topic':'toshibaFastInterlock/set', 'jsonData':data};
        var _this = this; // a weird thing to do to define button click
        setTimeout(function()
        {
            $('#' + _this.parentId + '-resetButton').attr('class','resetFastInterlockButton');
        }, 500);
        setTimeout(function()
        {
            socket.emit('publishFastInterlockMqttTopic', data2);
            this.tripDetected = false;
        }, 5000);
        
    }
    pinSwitch()
    {
        var pinSwitchState = 'ON';
        if (this.pinSwitchOn) pinSwitchState = 'OFF';
        var data = {"pinSwitch":pinSwitchState};
        var data2 = {'topic':'toshibaFastInterlock/set', 'jsonData':data};
        socket.emit('publishFastInterlockMqttTopic', data2);
    }
    fastTripDetected()
    {
        return this.tripDetected;
    }
    myTripCounter()
    {
        return this.tripCounter;
    }
    readData(data)
    {
//        console.log("Received: " + JSON.stringify(data));
//      "reflPowLvl":"0.143", "pinSwitch":"ON", "trip":"TRUE", "tripType":"arcDet"
        if (data['pinSwitch'] == 'ON')
        {
             $('#' + this.parentId + '-pinSwitchButton').attr('class','pinSwitchOnButton');
             this.pinSwitchOn = true;
        }
        else
        {
             $('#' + this.parentId + '-pinSwitchButton').attr('class','pinSwitchOffButton');
             this.pinSwitchOn = false;
        }
        $('#' + this.parentId + '-reflectedPowerTripLed').attr('src','images/greenlight.png');
        $('#' + this.parentId + '-cernArcTripLed').attr('src','images/greenlight.png');
        $('#' + this.parentId + '-aftArcTripLed').attr('src','images/greenlight.png');
        this.tripDetected = false;
        if (data['trip'] == 'TRUE')
        {
            this.tripDetected = true;
            if (data['tripType'] == 'reflPower') $('#' + this.parentId + '-reflectedPowerTripLed').attr('src','images/redlight.png');
            if (data['tripType'] == 'arcDet') $('#' + this.parentId + '-cernArcTripLed').attr('src','images/redlight.png');
            if (data['tripType'] == 'aftDet') $('#' + this.parentId + '-aftArcTripLed').attr('src','images/redlight.png');
        }
        $( "#" + 'googleGauge' + "-TripCounterCell" ).html(data['tripCounter']);
        this.tripCounter = data['tripCounter'];
        $( "#" + 'googleGauge' + "-TripRateCell" ).html(data['tripRate']);

        var tripDate = new Date(Number(data['tripDate']))
        var datestring = tripDate.getDate()  + "-" + (tripDate.getMonth()+1) + "-" + (tripDate.getYear()-100);
        $( "#" + 'googleGauge' + "-TripDateCell" ).html(datestring);
        datestring = tripDate.getHours() + ":" + tripDate.getMinutes();
        $( "#" + 'googleGauge' + "-TripDateTimeCell" ).html(datestring);

    }
    setDisabled(disabled) 
    {
        this.settingsDisabled = disabled;
        $( '#' + this.parentId + '-resetButton').prop("disabled", disabled);
        $('#' + this.parentId + '-pinSwitchButton').prop("disabled", disabled);
    }
}
