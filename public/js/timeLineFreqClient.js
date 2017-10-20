class TimeLineFreq
{
    constructor(publishTopic, label)
    {
        this.label = label;
        this.timeLineFreq = 14.0;
        this.publishTopic = publishTopic;
        this.settingsDisabled = true;
    }
    createGui(parentId)
    {
      var _this = this; // a weird thing to do to define button click
      this.parentId = parentId;
      var guiDiv = document.createElement("div");
      var tabLabel = document.createElement("Label");
      tabLabel.setAttribute("for", "name");
      tabLabel.setAttribute("class", 'widgetTab');
      tabLabel.innerHTML = this.label;
      $( "#" + parentId ).append(tabLabel);

      var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");
     
      var row = document.createElement("tr");
      var cell = document.createElement("td");
      var cellText = document.createTextNode("Frequency");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      var input = document.createElement("INPUT");
      input.setAttribute("type", "number");
      input.setAttribute("value", this.timeLineFreq);
      input.setAttribute("step", "0.1");
      input.setAttribute("id",parentId + "-timeLineFreq");
      input.onchange = function(){ _this.inputFieldChange(parentId + "-timeLineFreq", _this.timeLineFreq)};
      input.style.width = "5em";
      cell.setAttribute("class", 'cellText');
      cell.style.textAlign = "center";
      cell.appendChild(input);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode("Hz");
      cell.setAttribute("class", 'cellText');
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      var button = document.createElement("BUTTON");
      var buttonText = document.createTextNode("Set");     
      button.style.width = "5em";
      button.style.textAlign = "center";
      button.appendChild(buttonText);
      button.setAttribute("id", parentId + "-setButton");
      button.onclick = function() { _this.setSettings()}; 
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
    setSettings()
    {
        this.timeLineFreq = Number($(  "#" + this.parentId + "-timeLineFreq" ).val())
        var data = {"freq":this.timeLineFreq.toString()};
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
    readData(data)
    {
//        console.log("Received: " + JSON.stringify(data));
        this.timeLineFreq = Number(data['freq']);
        $( "#" + this.parentId + "-timeLineFreq" ).val(this.timeLineFreq);
        if (!this.settingsDisabled) $( "#" + this.parentId + "-timeLineFreq" ).attr('class','inputFieldNormal');
    }

      setDisabled(disabled) 
      {
        this.settingsDisabled = disabled;
        $( "#" + this.parentId + "-timeLineFreq").prop("disabled", disabled);
        if ( disabled) document.getElementById(this.parentId + '-setButton').style.display = "none";
        if (!disabled) document.getElementById(this.parentId + '-setButton').style.display = "block";
          
      }

}