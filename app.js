var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var mqtt = require('mqtt');
var byteGearBoxForNode = require('./byteGearBoxForNode.js')
var fs = require('fs');

var deviceMqttArray = 
[
  {
    'name':'PowerGauge',
    'setTopic':'itsPowerMeter01/get',
    'setMessage':{"power1":"0", "power2":"0"}, 
    'echoTopic':'itsPowerMeter01/get'
   },
  {
    'name':'TimerCard01',
    'setTopic':'itsClkRecvr01/set/channel',
    'setMessage':{"channel1":"1 1 2","channel2":"1 1 2","channel4":"1 1 2","channel3":"1 1 2"}, 
    'echoTopic':'itsClkRecvr01/echo/channel',
    'getTopic':'itsClkRecvr01/get/channel'
  },
  {
    'name':'TimerCard02',
    'setTopic':'itsClkRecvr02/set/channel',
    'setMessage':{"channel1":"1 1 2","channel2":"1 1 2","channel4":"1 1 2","channel3":"1 1 2"}, 
    'echoTopic':'itsClkRecvr02/echo/channel',
    'getTopic':'itsClkRecvr02/get/channel'
  },
  {
    'name':'FastInterlock',
    'setTopic':'toshibaFastInterlock/get',
    'setMessage':{"reflPowLvl":"0.143", "pinSwitch":"ON", "trip":"TRUE", "tripType":"arcDet"}, 
    'echoTopic':'toshibaFastInterlock/echo',
    'getTopic':'toshibaFastInterlock/status'
  },
  {
    'name':'RfSigGen',
    'setTopic':'itsRfSigGen01/set/rf',
    'setMessage':{"rfFreq":"704.42","rfPowLvl":"-20","rfPowOn":"OFF"}, 
    'echoTopic':'itsRfSigGen01/echo/rf',
    'getTopic':'itsRfSigGen01/get/rf'
  },
  {
    'name':'TimeLineFreq',
    'setTopic':'itsClkTrans01/set/freq',
    'setMessage':{"freq":"10"},
    'echoTopic':'itsClkTrans01/echo/freq',
    'getTopic':'itsClkTrans01/get/freq'
  }
];
var byteGearBoxParentUrl = 'https://aig.esss.lu.se:8443/IceCubeDeviceProtocols/gearbox/';
var byteGearBoxArray = 
[
  {
    'parentUrl':byteGearBoxParentUrl, 
    'topic':'klyPlcProtoCpu',
    'gearBox':{}
  },
  {
    'parentUrl':byteGearBoxParentUrl, 
    'topic':'klyPlcProtoAio',
    'gearBox':{}
  },
  {
    'parentUrl':byteGearBoxParentUrl, 
    'topic':'klyPlcProtoPsu',
    'gearBox':{}
  },
  {
    'parentUrl':byteGearBoxParentUrl, 
    'topic':'klyPlcProtoDio',
    'gearBox':{}
  }
];


var app = express();
var server = http.createServer(app);
var io = socketio(server);

var clientsConnected = 0;
var ipAddress;

var mqttClient = mqtt.connect('tcp://broker.shiftr.io', 
{
  clientId: 'itsnet-llrf-app',
  username: process.env.MQTTUSER,
  password: process.env.MQTTKEY,
  clean:false
});

mqttClient.on('connect', function(){connectToMqtt();});
mqttClient.on('message', function(topic, message) {handleMqttMessage(topic, message);});

app.set('port', (process.env.PORT || 1337));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res, next){var fs = require('fs');

  res.sendFile(__dirname + '/index.html');
  ipAddress = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
});

server.listen(app.get('port'), function() 
{
  console.log('Server started on port: ', app.get('port'));
});

io.on('connection', function(browserClient)
{
  console.log('Number of connected clients: ' + ++clientsConnected);
  browserClient.on('join', function(data){console.log(data);});
  browserClient.on('initData', function(data)
  {
//    console.log(data);
    deviceMqttArray.forEach(function(deviceMqtt){io.sockets.emit(deviceMqtt.setTopic, deviceMqtt.setMessage);});
    io.sockets.emit('byteGearBoxArray', byteGearBoxArray);
    fs.writeFile("./public/data/test.dat", 'Hey there! '  + new Date().toUTCString(), function(err) 
    {
      if(err) {return console.log(err);}
      console.log("The file was saved! " + new Date().toUTCString());
    }); 
  });
  browserClient.on('disconnect', function() {console.log('Number of connected clients: ' + --clientsConnected);});
  deviceMqttArray.forEach(function(deviceMqtt) 
  {
//    console.log('publish' + deviceMqtt.name +'MqttTopic');
    browserClient.on('publish' + deviceMqtt.name +'MqttTopic', function(data){publishMqtt(data);});
  });
  byteGearBoxArray.forEach(function(byteGearBoxArrayElement) 
  {
    browserClient.on('publish' + byteGearBoxArrayElement.gearBox.topic, function(data)
    {
      console.log('Publishing ' + byteGearBoxArrayElement.gearBox.topic);
      mqttClient.publish(byteGearBoxArrayElement.gearBox.topic + '/set', data, {qos:0, retain:true, dup:false}, function() {});

    });
  });
});

function handleMqttMessage(topic, message)
{
  deviceMqttArray.forEach(function(deviceMqtt)
  {
    if (topic == deviceMqtt.setTopic) 
    {
      deviceMqtt.setMessage = JSON.parse(message);
      io.sockets.emit(deviceMqtt.setTopic, deviceMqtt.setMessage);
    }
    if (topic == deviceMqtt.echoTopic) 
    {
      deviceMqtt.setMessage = JSON.parse(message);
      io.sockets.emit(deviceMqtt.setTopic, deviceMqtt.setMessage);
    }
  });
  byteGearBoxArray.forEach(function(byteGearBox)
  {
    if (topic.indexOf(byteGearBox.gearBox.topic) > -1)
    {
      var sendBuffer = new ArrayBuffer(message.length);
      var intView8 = new Int8Array(sendBuffer);
      for (var ii = 0; ii < message.length; ++ii) intView8[ii] = message[ii];
      if (topic == (byteGearBox.topic + '/echo/set'))
      {
        byteGearBoxForNode.setGearBoxValues(message, byteGearBox.gearBox, false);
      }
      if (topic == (byteGearBox.gearBox.topic + '/set'))
      {
        byteGearBoxForNode.setGearBoxValues(message, byteGearBox.gearBox, false);
        io.sockets.emit(topic, sendBuffer);
      }
      if (topic == (byteGearBox.gearBox.topic + '/get'))
      {
        byteGearBoxForNode.setGearBoxValues(message, byteGearBox.gearBox, true);
        io.sockets.emit(topic, sendBuffer);
      }
    }
  });

  if (topic.indexOf(byteGearBoxArray[1].topic + '/get') > -1)
  {
//    console.log(byteGearBoxForNode.getGearBoxByteTooth('EGU', byteGearBoxForNode.getGearBoxByteGear('KLY_IP_ISn_Current', byteGearBoxArray[1].gearBox), true).value);
  }


}
function connectToMqtt()
{
  console.log('Connected to MQTT broker.');
  byteGearBoxArray.forEach(function(byteGearBox)
  {
    byteGearBoxForNode.getByteGearBoxFromUrl(byteGearBox.parentUrl + byteGearBox.topic + '.json', function(jsonData) 
    {
      byteGearBox.gearBox = jsonData;
      mqttClient.subscribe(byteGearBox.gearBox.topic +'/set');
      console.log("Subscribing to " + byteGearBox.gearBox.topic +'/set');
      mqttClient.subscribe(byteGearBox.gearBox.topic +'/get');
      console.log("Subscribing to " + byteGearBox.gearBox.topic +'/get');
      mqttClient.subscribe(byteGearBox.gearBox.topic +'/echo/set');
      console.log("Subscribing to " + byteGearBox.gearBox.topic +'/echo/set');
      mqttClient.publish(byteGearBox.gearBox.topic +'/get/set', ' ', {qos:0, retain:true, dup:false}, function() {});
    });
  });
  deviceMqttArray.forEach(function(deviceMqtt)
  {
    if ('setTopic' in deviceMqtt)
    {
      console.log("Subscribing to " + deviceMqtt.setTopic);
      mqttClient.subscribe(deviceMqtt.setTopic);
    }
    if ('echoTopic' in deviceMqtt)
    {
      console.log("Subscribing to " + deviceMqtt.echoTopic);
      mqttClient.subscribe(deviceMqtt.echoTopic);
    }
    if ('getTopic' in deviceMqtt)
    {
      console.log("Publishing: " + deviceMqtt.getTopic);
      mqttClient.publish(deviceMqtt.getTopic, ' ', {qos:0, retain:true, dup:false}, function() {});
    }
  });

}
function publishMqtt(data)
{
  console.log("Publishing to " + data['topic'] + " data: " + JSON.stringify(data['jsonData']));
  mqttClient.publish(data['topic'], JSON.stringify(data['jsonData']), {qos:0, retain:true, dup:false}, function() {});
}
