var startDate = new Date();
let cpuGearBox = new ByteGearBox();
let aioGearBox = new ByteGearBox();
let dioGearBox = new ByteGearBox();
let psuGearBox = new ByteGearBox();

function setupApp()
{
    llrfTimer.createTimer('llrfTimerTable');
    modTimer.createTimer('modulatorTimerTable');
    rfSigGen.createGui('rfSigGenGui');
    fastInterlock.createGui('fastInterlockGui');
    setupGaugePlots();
    timeLineFreq.createGui('timeLineFreqGui');
    setupHistoryLinePlot();
    freqSweepParameters.createGui('freqSweepGui');
    freqSweepParameters.setRfSigGenId('rfSigGenGui');
    setupFreqSweepPlot();

    socket.on('itsClkRecvr01/set/channel', function(data) {llrfTimer.readData(data); });
    socket.on('itsClkRecvr02/set/channel', function(data) {modTimer.readData(data); });
    socket.on('itsRfSigGen01/set/rf',      function(data) {rfSigGen.readData(data); });
    socket.on('toshibaFastInterlock/get',  function(data) {fastInterlock.readData(data); });
    socket.on('itsPowerMeter01/get',  function(data) {updateGaugePlots(data); });
    socket.on('itsClkTrans01/set/freq',  function(data) {timeLineFreq.readData(data); });

    socket.on('byteGearBoxArray',  function(dataArray) 
    {
        cpuGearBox.setByteGearBoxJsonData(dataArray[0].gearBox);
        aioGearBox.setByteGearBoxJsonData(dataArray[1].gearBox);
        psuGearBox.setByteGearBoxJsonData(dataArray[2].gearBox);
        dioGearBox.setByteGearBoxJsonData(dataArray[3].gearBox);
        fastInterlock.setCpuByteGearBox(cpuGearBox);
        
        socket.on('klyPlcProtoCpu/get',  function(message) {cpuGearBox.setGearBoxValues(new Int8Array(message), true);});
        socket.on('klyPlcProtoAio/get',  function(message) {aioGearBox.setGearBoxValues(new Int8Array(message), true); updateHistoryLinePlot(aioGearBox);});
        socket.on('klyPlcProtoPsu/get',  function(message) {psuGearBox.setGearBoxValues(new Int8Array(message), true);});
        socket.on('klyPlcProtoDio/get',  function(message) {dioGearBox.setGearBoxValues(new Int8Array(message), true);});

        socket.on('klyPlcProtoCpu/set',  function(message) {cpuGearBox.setGearBoxValues(new Int8Array(message), false);});
        socket.on('klyPlcProtoAio/set',  function(message) {aioGearBox.setGearBoxValues(new Int8Array(message), false);});
        socket.on('klyPlcProtoPsu/set',  function(message) {psuGearBox.setGearBoxValues(new Int8Array(message), false);});
        socket.on('klyPlcProtoDio/set',  function(message) {dioGearBox.setGearBoxValues(new Int8Array(message), false);});
    });
    setTimeout(function(){socket.emit('initData', 'Give me initial data from Server');}, 2000);
}
