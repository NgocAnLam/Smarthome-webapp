const wifi = require('node-wifi');
const axios = require('axios');
const ping = require('ping');
const dns = require('dns');
wifi.init();

class WiFi {
    async currentNetwork(){
        try {
            return new Promise((resolve, reject) => {
                wifi.getCurrentConnections((error, currentConnections) => {
                    if (error) {reject(error)} 
                    else {resolve(currentConnections[0])}
                });
            });
        } 
        catch (err) {throw new Error(err)}   
    }

    async getPublicIP(privateIP) {
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

    async getInfoIPPublic(publicIP){
        const apiUrl = `http://ip-api.com/json/${publicIP}`;

        axios.get(apiUrl)
        .then(response => {
            const data = response.data;
            if (data.status === 'success') {console.log('IP Address:', data)} 
            else {console.log('Không tìm thấy thông tin cho địa chỉ IP:', publicIP)}
        })
        .catch(error => {console.log('Đã xảy ra lỗi khi truy vấn thông tin:', error.message)});
    }
    
    async deviceConnectList(startIP, endIP){
        const startOctets = startIP.split('.').map(Number);
        const endOctets = endIP.split('.').map(Number);
        const promises = [];

        for (let a = startOctets[0]; a <= endOctets[0]; a++) {
            for (let b = startOctets[1]; b <= endOctets[1]; b++) {
                for (let c = startOctets[2]; c <= endOctets[2]; c++) {
                    for (let d = startOctets[3]; d <= endOctets[3]; d++) {
                        const ipAddress = `${a}.${b}.${c}.${d}`;

                        const pingPromise = new Promise((resolve) => {
                            ping.sys.probe(ipAddress, (isAlive) => {
                                if (isAlive) {resolve(ipAddress)} 
                                else {resolve(null)}
                            });
                        });

                        promises.push(pingPromise);
                    }
                }
            }
        }

        try {
            const aliveIPs = await Promise.all(promises);
            const reversePromises = aliveIPs
                .filter((ip) => ip !== null)
                .map((ip) => {
                    return new Promise((resolve) => {
                        dns.reverse(ip, (error, hostnames) => {
                            if (error || hostnames.length === 0) {resolve({ ip, hostname: 'N/A' })} 
                            else {resolve({ ip, hostname: hostnames[0] })}
                        });
                    });
                });
    
            const result = await Promise.all(reversePromises);
            return result;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

module.exports = WiFi;
