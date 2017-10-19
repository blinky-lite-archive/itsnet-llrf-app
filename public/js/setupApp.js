var klystronIonPump = 0.0;
var klystronFwdPwr = 0.0;
var forwardPowerGaugeData;
var forwardPowerGaugeChart;
var forwardPowerGaugeOptions;
var forwardPowerGaugeParentId = 'googleGauge'; 
var historyLinePlotParentId = 'historyLinePlot'; 
var historyLinePlotChart;
var historyLinePlotChartOptions;
var historyLinePlotData;
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
    socket.emit('initData', 'Give me initial data from Server');
}
function resetKlystronCpu(data)
{
    console.log('booger');
/*    byteGearBoxArray.forEach(function(element)
    {
        if (element.gearBox.topic == 'klyPlcProtoCpu')
        {
            getGearBoxByteTooth('RESET',       getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'TRUE';
            getGearBoxByteTooth('OFF_CMD',     getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('AUX_CMD',     getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('FIL_CMD',     getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('STBY_CMD',    getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('HV_CMD'  ,    getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('RF_CMD',      getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('TEST_ALL_AD', getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('WR_DATA',     getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'TRUE';
            var setBuffer = new ArrayBuffer(element.gearBox.writeByteLength);
            var intView8 = new Int8Array(setBuffer);
            var setBuffer2 = new ArrayBuffer(element.gearBox.writeByteLength * 2);
            var intView82 = new Int8Array(setBuffer2);
            getGearBoxByteData(intView8, element.gearBox, false);
            for (var ii = 0; ii < element.gearBox.writeByteLength; ++ii) intView82[ii] = intView8[ii];
            getGearBoxByteTooth('RESET',       getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteTooth('WR_DATA',     getGearBoxByteGear('CPU_CONF', element.gearBox), false).value = 'FALSE';
            getGearBoxByteData(intView8, element.gearBox, false);
            for (var ii = 0; ii < element.gearBox.writeByteLength; ++ii) intView82[ii + element.gearBox.writeByteLength] = intView8[ii];
        }
    });
*/}