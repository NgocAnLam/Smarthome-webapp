const nmap = require('node-nmap');

const range = '125.235.238.158';

nmap.nmapLocation = 'nmap';

const scan = new nmap.OsAndPortScan(range);
scan.on('complete', function(data) {
  const devices = data.hosts;

  devices.forEach(function(device) {
    const macAddress = device.mac[0].address;
    console.log('Device: ' + device.ip + ' - ' + macAddress);
  });
});

scan.startScan();
