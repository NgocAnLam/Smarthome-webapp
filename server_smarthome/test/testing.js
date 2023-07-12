// const os = require('os');

// const networkInterfaces = os.networkInterfaces();

// Object.keys(networkInterfaces).forEach((interfaceName) => {
//   const interfaces = networkInterfaces[interfaceName];


//   for (let i = 0; i < interfaces.length; i++) {
//     const { address, family, internal} = interfaces[i];
//     const iface = interfaces[i];
//     if (family === 'IPv4' && !internal) {
//       console.log(`Địa chỉ IP của thiết bị hiện tại: ${address}`);
//       console.log('Giao diện: ' + interfaceName);
//       console.log('Địa chỉ MAC: ' + JSON.stringify(iface.mac));
//       console.log('Địa chỉ IP: ' + JSON.stringify(iface.address));
//       console.log('Mặt nạ mạng: ' + JSON.stringify(iface.netmask));
//       console.log('Loại: ' + JSON.stringify(iface.family));
//     }
//   }
// });





// const ping = require('ping');
// const dns = require('dns');
// function scanIPRange(startIP, endIP) {
//     const startOctets = startIP.split('.').map(Number);
//     const endOctets = endIP.split('.').map(Number);
    
//     for (let a = startOctets[0]; a <= endOctets[0]; a++) {
//         for (let b = startOctets[1]; b <= endOctets[1]; b++) {
//             for (let c = startOctets[2]; c <= endOctets[2]; c++) {
//                 for (let d = startOctets[3]; d <= endOctets[3]; d++) {
//                     const ipAddress = `${a}.${b}.${c}.${d}`;
//                     ping.sys.probe(ipAddress, (isAlive) => {
//                         if (isAlive) {
//                             dns.reverse(ipAddress, (error, hostnames) => {
//                                 if (error) {console.log(error);} 
//                                 else if(hostnames.length === 0) {console.log('Không tìm thấy tên thiết bị cho địa chỉ IP này.');} 
//                                 else {console.log(`Tên thiết bị cho địa chỉ IP ${ipAddress}: ${hostnames[0]}`);}             
//                             })
//                         }                    
//                     });
//                 }
//             }
//         }
//     }  
// }

// scanIPRange('192.168.31.1', '192.168.31.254');




// const ping = require('ping');
// const dns = require('dns');

// function scanIPRange(startIP, endIP) {
//   const startOctets = startIP.split('.').map(Number);
//   const endOctets = endIP.split('.').map(Number);

//   const promises = [];

//   for (let a = startOctets[0]; a <= endOctets[0]; a++) {
//     for (let b = startOctets[1]; b <= endOctets[1]; b++) {
//       for (let c = startOctets[2]; c <= endOctets[2]; c++) {
//         for (let d = startOctets[3]; d <= endOctets[3]; d++) {
//           const ipAddress = `${a}.${b}.${c}.${d}`;

//           const pingPromise = new Promise((resolve) => {
//             ping.sys.probe(ipAddress, (isAlive) => {
//               if (isAlive) {
//                 resolve(ipAddress);
//               } else {
//                 resolve(null);
//               }
//             });
//           });

//           promises.push(pingPromise);
//         }
//       }
//     }
//   }

//   Promise.all(promises)
//     .then((aliveIPs) => {
//       const reversePromises = aliveIPs
//         .filter((ip) => ip !== null)
//         .map((ip) => {
//           return new Promise((resolve) => {
//             dns.reverse(ip, (error, hostnames) => {
//               if (error) {
//                 console.log(error);
//                 resolve({ ip, hostname: 'N/A' });
//               } else if (hostnames.length === 0) {
//                 console.log(`Không tìm thấy tên thiết bị cho địa chỉ IP ${ip}.`);
//                 resolve({ ip, hostname: 'N/A' });
//               } else {
//                 console.log(`Tên thiết bị cho địa chỉ IP ${ip}: ${hostnames[0]}`);
//                 resolve({ ip, hostname: hostnames[0] });
//               }
//             });
//           });
//         });

//       return Promise.all(reversePromises);
//     })
//     .then((ipAddressList) => {
//       console.log(ipAddressList);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// scanIPRange('192.168.31.1', '192.168.31.254');

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ip = data.ip;
    console.log(ip);
  })
  .catch(error => {
    console.log(error);
  });