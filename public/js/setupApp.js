function setupApp()
{
    llrfTimer.createTimer('llrfTimerTable');
    modTimer.createTimer('modulatorTimerTable');
    rfSigGen.createGui('rfSigGenGui');
    fastInterlock.createGui('fastInterlockGui');
    setupGaugePlots();

    socket.emit('initTimerCard', 'itsClkRecvr01/set/channel');
    socket.emit('initTimerCard', 'itsClkRecvr02/set/channel');
    socket.emit('initRfSigGen' , 'itsRfSigGen01/set/rf');
    socket.emit('initFastInterlock' , 'toshibaFastInterlock/get');
    socket.on('itsClkRecvr01/set/channel', function(data) {llrfTimer.readData(data); });
    socket.on('itsClkRecvr02/set/channel', function(data) {modTimer.readData(data); });
    socket.on('itsRfSigGen01/set/rf',      function(data) {rfSigGen.readData(data); });
    socket.on('toshibaFastInterlock/get',  function(data) {fastInterlock.readData(data); });
    socket.on('itsPowerMeter01/get',  function(data) {updateGaugePlots(data); });

}
