class ByteGearBox
{
    constructor()
    {
    }
    setByteGearBoxJsonData(byteGearBoxJsonData)
    {
        this.byteGearBoxJsonData = byteGearBoxJsonData;
    }
    getGearBoxByteData(int8Array, getRead)
    {
      for (var ii = 0; ii < this.byteGearBoxJsonData.byteGears.length; ++ii )
      {
        var toothList;
        var byteOff;
        if (getRead)
        {
          toothList = this.byteGearBoxJsonData.byteGears[ii].readToothList;
          byteOff = parseInt(this.byteGearBoxJsonData.byteGears[ii].readByteOff, 10);
        }
        else
        {
          toothList = this.byteGearBoxJsonData.byteGears[ii].writeToothList;
          byteOff = parseInt(this.byteGearBoxJsonData.byteGears[ii].writeByteOff, 10);
        }
        for (var ij = 0; ij <  toothList.length; ++ij)
          this.getGearBoxByteToothByteArray(int8Array, byteOff, toothList[ij]);
      }
    }
    setGearBoxValues(int8Array, setRead)
    {
      for (var ii = 0; ii < this.byteGearBoxJsonData.byteGears.length; ++ii )
      {
        var toothList;
        var byteOff;
        if (setRead)
        {
          toothList = this.byteGearBoxJsonData.byteGears[ii].readToothList;
          byteOff = parseInt(this.byteGearBoxJsonData.byteGears[ii].readByteOff, 10);
        }
        else
        {
          toothList = this.byteGearBoxJsonData.byteGears[ii].writeToothList;
          byteOff = parseInt(this.byteGearBoxJsonData.byteGears[ii].writeByteOff, 10);
        }
        for (var ij = 0; ij <  toothList.length; ++ij)
          this.setGearBoxByteToothData(int8Array, byteOff, toothList[ij]);
      }
    }
    getGearBoxByteGear(name)
    {
      for (var ii = 0; ii < this.byteGearBoxJsonData.byteGears.length; ++ii )
        if (this.byteGearBoxJsonData.byteGears[ii].name == name) return this.byteGearBoxJsonData.byteGears[ii];
      throw name + ' not found';
    }
    getGearBoxByteTooth(name, byteGear, getRead)
    {
        var toothList;
        if (getRead)
        {
          toothList = byteGear.readToothList;
        }
        else
        {
          toothList = byteGear.writeToothList;
        }
      for (var ii = 0; ii <  toothList.length; ++ii)
        if ( toothList[ii].name == name) return toothList[ii];
      throw name + ' not found';
    }
    printGearBoxData(printRead)
    {
      var byteLength;
      var byteLengthLabel;
      if (printRead)
      {
        byteLength = this.byteGearBoxJsonData.readByteLength;
        byteLengthLabel = " readByteLength = ";
      }
      else
      {
        byteLength = this.byteGearBoxJsonData.writeByteLength;
        byteLengthLabel = " writeByteLength = ";
      }
      console.log("broker = " + this.byteGearBoxJsonData.broker + " topic = " + this.byteGearBoxJsonData.topic + byteLengthLabel + byteLength);
      for (var ii = 0; ii < this.byteGearBoxJsonData.byteGears.length; ++ii )
      {
        var toothList;
        var byteOff;
        var byteOffLabel;
        if (printRead)
        {
          toothList = this.byteGearBoxJsonData.byteGears[ii].readToothList;
          byteOff = this.byteGearBoxJsonData.byteGears[ii].readByteOff;
          byteOffLabel = " readByteOff = ";
        }
        else
        {
          toothList = this.byteGearBoxJsonData.byteGears[ii].writeToothList;
          byteOff = this.byteGearBoxJsonData.byteGears[ii].writeByteOff;
          byteOffLabel = " writeByteOff = ";
        }
        console.log('\t' + "Name = " + this.byteGearBoxJsonData.byteGears[ii].name + byteOffLabel + byteOff);
        for (var ij = 0; ij <  toothList.length; ++ij)
          console.log('\t' + '\t' + "name = " + toothList[ij]['name'] + "\t" + "type = " + toothList[ij]['toothType'] + "\t" + "bitOff = " + toothList[ij]['bitOff'] + "\t" + "byteOff = " + toothList[ij]['byteOff'] + "\t" + "value = " + toothList[ij]['value']);
      }
    }

    getGearBoxByteToothByteArray(int8Array, byteGearOffset, byteToothJson)
    {
        var offset = byteGearOffset + parseInt(byteToothJson['byteOff'],10);
        switch(byteToothJson['toothType']) 
        {
            case "BOOLEAN":
                if (byteToothJson['value'] == "TRUE")
                {
                    int8Array[offset] |= 1 << parseInt(byteToothJson['bitOff'],10);
                }
                else
                {
                   int8Array[offset] &= ~(1 << parseInt(byteToothJson['bitOff'],10));
                }
                break;
            case "FLOAT":
                var farr = new Float32Array(1);
                farr[0] = Number(byteToothJson['value']);
                var barr = new Int8Array(farr.buffer);
                for (var ii = 0; ii < 4; ++ii) int8Array[ii + offset] = barr[3 - ii];
                break;
            case "BYTE":
                int8Array[offset] = Number(byteToothJson['value']);
                break;
            case "SHORT":
                var iarr = new Int16Array(1);
                iarr[0] = Number(byteToothJson['value']);
                barr = new Int8Array(iarr.buffer);
                for (var ii = 0; ii < 2; ++ii) int8Array[ii + offset] = barr[1 - ii];
                break;
            case "INT":
                iarr = new Int32Array(1);
                iarr[0] = Number(byteToothJson['value']);
                barr = new Int8Array(iarr.buffer);
                for (var ii = 0; ii < 4; ++ii) int8Array[ii + offset] = barr[3 - ii];
                break;
            case "DOUBLE":
                var darr = new Float64Array(1);
                darr[0] = Number(byteToothJson['value']);
                barr = new Int8Array(darr.buffer);
                for (var ii = 0; ii < 8; ++ii) int8Array[ii + offset] = barr[7 - ii];
                break;
            case "S7DT":
                break;
           default:
                break;
        }    
    }
    setGearBoxByteToothData(int8Array, byteGearOffset, byteToothJson)
    {
        var offset = byteGearOffset + parseInt(byteToothJson['byteOff'], 10);
        switch(byteToothJson['toothType']) 
        {
            case "BOOLEAN":
                byteToothJson['value'] = "FALSE";
                if (((int8Array[offset] >> parseInt(byteToothJson['bitOff'],10)) & 1) > 0) byteToothJson['value'] = "TRUE";
                break;
            case "FLOAT":
                var buffer = new ArrayBuffer(4);
                var barr = new Int8Array(buffer);
                var floatView = new Float32Array(buffer);
                for (var ii = 0; ii < 4; ++ii) barr[ii] = int8Array[3 - ii + offset];
                byteToothJson['value'] = floatView.toString();
                break;
            case "BYTE":
                byteToothJson['value'] = int8Array[offset].toString();
                break;
            case "SHORT":
                buffer = new ArrayBuffer(2);
                barr = new Int8Array(buffer);
                var intView = new Int16Array(buffer);
                for (var ii = 0; ii < 2; ++ii) barr[ii] = int8Array[1 - ii + offset];
                byteToothJson['value'] = intView.toString();
                break;
            case "INT":
                buffer = new ArrayBuffer(4);
                barr = new Int8Array(buffer);
                intView = new Int32Array(buffer);
                for (var ii = 0; ii < 4; ++ii) barr[ii] = int8Array[3 - ii + offset];
                byteToothJson['value'] = intView.toString();
                break;
            case "DOUBLE":
                buffer = new ArrayBuffer(8);
                barr = new Int8Array(buffer);
                var doubleView = new Float64Array(buffer);
                for (var ii = 0; ii < 8; ++ii) barr[ii] = int8Array[7 - ii + offset];
                byteToothJson['value'] = doubleView.toString();
                break;
            case "S7DT":
                byteToothJson['value'] = "S7DT";
                break;
           default:
                break;
        }    
    }

}
