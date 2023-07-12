// const wifi = require('node-wifi');
// wifi.init();

// wifi.getCurrentConnections((error, currentConnections) => {
//   if (error) {console.log(error)} 
//   else {
//     console.log('Danh sách các thiết bị đang kết nối WiFi:');
//     console.log(currentConnections);
//   }
// });

const axios = require('axios');

async function getPublicIP(privateIP) {
  const ipifyURL = `https://api.ipify.org?format=json&privateip=${privateIP}`;

  return axios.get(ipifyURL)
    .then(response => {
      const publicIP = response.data.ip;
      return publicIP;
    })
    .catch(error => {
      console.error('Error retrieving public IP:', error);
      throw error;
    });
}

const privateIP = '192.168.31.26';
getPublicIP(privateIP)
  .then(publicIP => {
    console.log('Public IP:', publicIP);
  })
  .catch(error => {
    console.error('Error:', error);
  });

