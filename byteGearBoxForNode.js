var request = require('request');
var fs = require('fs');

exports.getGearBoxByteData = function(int8Array, byteGearBox, getRead)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
  {
    var toothList;
    var byteOff;
    if (getRead)
    {
      toothList = byteGearBox.byteGears[ii].readToothList;
      byteOff = parseInt(byteGearBox.byteGears[ii].readByteOff, 10);
    }
    else
    {
      toothList = byteGearBox.byteGears[ii].writeToothList;
      byteOff = parseInt(byteGearBox.byteGears[ii].writeByteOff, 10);
    }
    for (var ij = 0; ij <  toothList.length; ++ij)
      getGearBoxByteToothByteArray(int8Array, byteOff, toothList[ij]);
  }
};
exports.setGearBoxValues = function(int8Array, byteGearBox, setRead)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
  {
    var toothList;
    var byteOff;
    if (setRead)
    {
      toothList = byteGearBox.byteGears[ii].readToothList;
      byteOff = parseInt(byteGearBox.byteGears[ii].readByteOff, 10);
    }
    else
    {
      toothList = byteGearBox.byteGears[ii].writeToothList;
      byteOff = parseInt(byteGearBox.byteGears[ii].writeByteOff, 10);
    }
    for (var ij = 0; ij <  toothList.length; ++ij)
      setGearBoxByteToothData(int8Array, byteOff, toothList[ij]);
  }
};
exports.getGearBoxByteGear = function(name, byteGearBox)
{
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
    if (byteGearBox.byteGears[ii].name == name) return byteGearBox.byteGears[ii];
  throw name + ' not found';
};
exports.getGearBoxByteTooth = function(name, byteGear, getRead)
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
};
exports.printGearBoxData = function(byteGearBox, printRead)
{
  var byteLength;
  var byteLengthLabel;
  if (printRead)
  {
    byteLength = byteGearBox.readByteLength;
    byteLengthLabel = " readByteLength = ";
  }
  else
  {
    byteLength = byteGearBox.writeByteLength;
    byteLengthLabel = " writeByteLength = ";
  }
  console.log("broker = " + byteGearBox.broker + " topic = " + byteGearBox.topic + byteLengthLabel + byteLength);
  for (var ii = 0; ii < byteGearBox.byteGears.length; ++ii )
  {
    var toothList;
    var byteOff;
    var byteOffLabel;
    if (printRead)
    {
      toothList = byteGearBox.byteGears[ii].readToothList;
      byteOff = byteGearBox.byteGears[ii].readByteOff;
      byteOffLabel = " readByteOff = ";
    }
    else
    {
      toothList = byteGearBox.byteGears[ii].writeToothList;
      byteOff = byteGearBox.byteGears[ii].writeByteOff;
      byteOffLabel = " writeByteOff = ";
    }
    console.log('\t' + "Name = " + byteGearBox.byteGears[ii].name + byteOffLabel + byteOff);
    for (var ij = 0; ij <  toothList.length; ++ij)
      console.log('\t' + '\t' + "name = " + toothList[ij]['name'] + "\t" + "type = " + toothList[ij]['toothType'] + "\t" + "bitOff = " + toothList[ij]['bitOff'] + "\t" + "byteOff = " + toothList[ij]['byteOff'] + "\t" + "value = " + toothList[ij]['value']);
  }
};
function setGearBoxByteToothData(int8Array, byteGearOffset, byteToothJson)
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
function getGearBoxByteToothByteArray(int8Array, byteGearOffset, byteToothJson)
{
    var offset = byteGearOffset + parseInt(byteToothJson['byteOff'], 10);
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

exports.getByteGearBoxFromUrl = function(gearBoxUrl, callback)
{
  var options = 
  {
    method: 'post',
    body: {},
    json: true,
    url: gearBoxUrl
  };
  request(options, 
  function (err, res, body) 
  {  
    if (err) 
    {
      console.error('error posting json: ', err);
      throw err;
    }
    callback(body);
  });
};
exports.getByteGearBoxFromFile = function(filePath, callback)
{
  fs.readFile(filePath, 
  function(err, data)
  {
    if (err) throw err;
    callback(JSON.parse(data));
  });
};
