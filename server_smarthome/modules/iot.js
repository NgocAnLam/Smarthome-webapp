const fs = require('fs');
const smarthome = require('../smarthome.json');

class IOT {
   
    async findRoom(uniqueDevices, rooms) {
        const deviceToRoom = {};
        for (var i = 0; i < uniqueDevices.length; i++) {
            const device = uniqueDevices[i];
            const room = rooms[i];
            deviceToRoom[device] = room;
        }
        return deviceToRoom
    }
    
    async getAllDevices(smarthome) {
        const devices = [];
        for (const room in smarthome) {
          for (const device in smarthome[room]) {
            devices.push(device);
          }
        }
        return devices;
    }
      
    async getRoomFromUniqueDevice(uniqueDevices){
        const rooms = [];
        for (const room in smarthome) {
            const roomDevices = Object.keys(smarthome[room]);
            for (const device of uniqueDevices) {
                if (roomDevices.includes(device)) {
                rooms.push(room);
                }
            }
        }
        return rooms;
    }
    
    async process(statement){
        return new Promise((resolve, reject) => {
            fs.readFile('D:/Smarthome-webapp/server_smarthome/smarthome.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err); 
                    reject(err);
                }
                else {
                    try {         
                        var smarthome = JSON.parse(data);
                        var location;
                        var device;
                        var attribute;
                        var value;     
                        var locations;
                        var devices;
                        var attributes;

                        // check item exists {0: No, 1: Yes}
                        var checkLocation = 0;
                        var checkDevice = 0;
                        var checkAttribute = 0;
                        var checkValue = 0;      
    
                        // Get location information list
                        locations = Object.keys(smarthome);
                        for (const item of locations) {
                            if (statement.includes(item)) {
                                location = item;
                                checkLocation = 1;
                            }
                        }
                    
                        if (checkLocation == 0){
                            // Find device in statement
                            const deviceList = this.getAllDevices(smarthome);
                            const uniqueDevices = deviceList.filter(
                                (device, index) => deviceList.indexOf(device) === deviceList.lastIndexOf(device));
                    
                            for (const item of uniqueDevices){
                                if (statement.includes(item)){
                                    device = item;
                                    checkDevice = 1;
                                }
                            }
                    
                            if (checkDevice == 0){
                                console.log('Không tìm thấy \'vị trí\' trong nhà, vui lòng cung cấp lại thông tin');
                                const state = 0;
                                const mess = 'Không tìm thấy \'vị trí\' trong nhà, vui lòng cung cấp lại thông tin';
                                const jsondata = smarthome;
                                const jsondatachange = {
                                    jsonlocation: null,
                                    jsondevice: null,
                                    jsonattribute: null,
                                    jsonvalue: null,
                                }
                                resolve({state, mess, jsondata, jsondatachange});
                            }
                            else {
                                const rooms = this.getRoomFromUniqueDevice(uniqueDevices);
                                const deviceToRoom = this.findRoom(uniqueDevices, rooms);
                                location = deviceToRoom[device];
                    
                                if (statement.includes("mở") || statement.includes("bật")) {
                                    attribute = 'trạng thái';
                                    smarthome[location][device][attribute] = 1;
                                    const state = 1;
                                    const mess = 'Đã ' + statement;
                                    const jsondata = smarthome;
                                    const jsondatachange = {
                                        jsonlocation: location,
                                        jsondevice: device,
                                        jsonattribute: attribute,
                                        jsonvalue: 1,
                                    }
                                    resolve({state, mess, jsondata, jsondatachange});
                                    fs.writeFileSync('D:/Smarthome-webapp/server_smarthome/smarthome.json', JSON.stringify(smarthome, null, 2), 'utf8');
                                    console.log('smarthome.json has been successfully updated.');     
                                }
                                else if (statement.includes("đóng") || statement.includes("tắt")) {
                                    attribute = 'trạng thái';
                                    smarthome[location][device][attribute] = 0;
                                    const state = 1;
                                    const mess = 'Đã ' + statement;
                                    const jsondata = smarthome;
                                    const jsondatachange = {
                                        jsonlocation: location,
                                        jsondevice: device,
                                        jsonattribute: attribute,
                                        jsonvalue: 0,
                                    }
                                    resolve({state, mess, jsondata, jsondatachange});
                                    fs.writeFileSync('D:/Smarthome-webapp/server_smarthome/smarthome.json', JSON.stringify(smarthome, null, 2), 'utf8');
                                    console.log('smarthome.json has been successfully updated.');  
                                }
                                else {
                                    // Get attribute information list
                                    attributes = Object.keys(smarthome[location][device]);
                    
                                    for (const item of attributes) {
                                        if (statement.includes(item)) {
                                            attribute = item;
                                            checkAttribute = 1;
                                        }
                                    }
                    
                                    if (checkAttribute == 0) {
                                        console.log('Không tìm thấy \'hành động\' phù hợp với ' + device +', vui lòng cung cấp lại thông tin');
                                        const state = 0;
                                        const mess = 'Không tìm thấy \'hành động\' phù hợp với ' + device +', vui lòng cung cấp lại thông tin';
                                        const jsondata = smarthome;
                                        const jsondatachange = {
                                            jsonlocation: location,
                                            jsondevice: device,
                                            jsonattribute: null,
                                            jsonvalue: null,
                                        }
                                        resolve({state, mess, jsondata, jsondatachange});
                                    }
                                    else {
                                        // Get value (number)
                                        const modifiedText = statement.replace(location, '').replace(device, '').replace(attribute, '');
                                        const commandParts = modifiedText.split(' ');
                                        for (const part of commandParts) {
                                            const parsedValue = parseInt(part);
                                            if (!isNaN(parsedValue)) {
                                                value = parsedValue;
                                                checkValue = 1;
                                                break;
                                            }
                                        }
                                        if (checkValue == 0) {
                                            console.log('Không tìm thấy \'Giá trị\' ' + attribute + ' của '+ device +', vui lòng cung cấp lại thông tin');
                                            const state = 0;
                                            const mess = 'Không tìm thấy \'Giá trị\' ' + attribute + ' của '+ device +', vui lòng cung cấp lại thông tin';
                                            const jsondata = smarthome;
                                            const jsondatachange = {
                                                jsonlocation: location,
                                                jsondevice: device,
                                                jsonattribute: attribute,
                                                jsonvalue: null,
                                            }
                                            resolve({state, mess, jsondata, jsondatachange});
                                        }
                                        else{
                                            smarthome[location][device][attribute] = value;
                                            const state = 1;
                                            const mess = 'Đã ' + statement;
                                            const jsondata = smarthome;
                                            const jsondatachange = {
                                                jsonlocation: location,
                                                jsondevice: device,
                                                jsonattribute: attribute,
                                                jsonvalue: value,
                                            }
                                            resolve({state, mess, jsondata, jsondatachange});
                                            fs.writeFileSync('D:/Smarthome-webapp/server_smarthome/smarthome.json', JSON.stringify(smarthome, null, 2), 'utf8');
                                            console.log('smarthome.json has been successfully updated.');  
                                        }
                                    }    
                                }
                            }
                        }
                        else {
                            // Get device information list
                            devices = Object.keys(smarthome[location])
                    
                            for (const item of devices) {
                                if (statement.includes(item)) {
                                    device = item
                                    checkDevice = 1;
                                }
                            }
    
                            if (checkDevice == 0){
                                console.log('Không tìm thấy \'thiết bị\' trong ' + location +', vui lòng cung cấp lại thông tin');
                                const state = 0;
                                const mess = 'Không tìm thấy \'thiết bị\' trong ' + location +', vui lòng cung cấp lại thông tin';
                                const jsondata = smarthome;
                                const jsondatachange = {
                                    jsonlocation: location,
                                    jsondevice: null,
                                    jsonattribute: null,
                                    jsonvalue: null,
                                }
                                resolve({state, mess, jsondata, jsondatachange});
                            }
                            else {
                                if (statement.includes("mở") || statement.includes("bật")) {
                                    attribute = 'trạng thái';
                                    smarthome[location][device][attribute] = 1;
                                    const state = 1;
                                    const mess = 'Đã ' + statement;
                                    const jsondata = smarthome;
                                    const jsondatachange = {
                                        jsonlocation: location,
                                        jsondevice: device,
                                        jsonattribute: attribute,
                                        jsonvalue: 1,
                                    }
                                    
                                    fs.writeFile('D:/Smarthome-webapp/server_smarthome/smarthome.json', JSON.stringify(smarthome, null, 2), 'utf8', (err) => {
                                        if (err) {console.error('An error occurred:', err);}
                                        console.log('smarthome.json has been successfully updated.');
                                    });
                                     
                                    resolve({state, mess, jsondata, jsondatachange});                   
                                }
                                else if (statement.includes("đóng") || statement.includes("tắt")) {
                                    attribute = 'trạng thái';
                                    smarthome[location][device][attribute] = 0;
                                    const state = 1;
                                    const mess = 'Đã ' + statement;
                                    const jsondata = smarthome;
                                    const jsondatachange = {
                                        jsonlocation: location,
                                        jsondevice: device,
                                        jsonattribute: attribute,
                                        jsonvalue: 0,
                                    }
                                    
                                    fs.writeFileSync('D:/Smarthome-webapp/server_smarthome/smarthome.json', JSON.stringify(smarthome, null, 2), 'utf8');
                                    console.log('smarthome.json has been successfully updated.');                        
                                    resolve({state, mess, jsondata, jsondatachange});
                                }
                                else {
                                    // Get attribute information list
                                    attributes = Object.keys(smarthome[location][device])
                    
                                    for (const item of attributes) {
                                        if (statement.includes(item)) {
                                            attribute = item;
                                            checkAttribute = 1;
                                        }
                                    }
                    
                                    if (checkAttribute == 0) {
                                        console.log('Không tìm thấy \'hành động\' yêu cầu của ' + device +', vui lòng cung cấp lại thông tin');
                                        const state = 0;
                                        const mess = 'Không tìm thấy \'hành động\' yêu cầu của ' + device +', vui lòng cung cấp lại thông tin';
                                        const jsondata = smarthome;
                                        const jsondatachange = {
                                            jsonlocation: location,
                                            jsondevice: device,
                                            jsonattribute: null,
                                            jsonvalue: null,
                                        }
                                        resolve({state, mess, jsondata, jsondatachange});
                                    }
                                    else {
                                        // Get value (number)
                                        const modifiedText = statement.replace(location, '').replace(device, '').replace(attribute, '');
                                        const commandParts = modifiedText.split(' ');
                                        for (const part of commandParts) {
                                            const parsedValue = parseInt(part);
                                            if (!isNaN(parsedValue)) {
                                                value = parsedValue;
                                                checkValue = 1;
                                                break;
                                            }
                                        }
                                        
                                        if (checkValue == 0) {
                                            console.log('Không tìm thấy \'Giá trị\' ' + attribute + ' của '+ device +', vui lòng cung cấp lại thông tin');
                                            const state = 0;
                                            const mess = 'Không tìm thấy \'Giá trị\' ' + attribute + ' của '+ device +', vui lòng cung cấp lại thông tin';
                                            const jsondata = smarthome;
                                            const jsondatachange = {
                                                jsonlocation: location,
                                                jsondevice: device,
                                                jsonattribute: attribute,
                                                jsonvalue: null,
                                            }
                                            resolve({state, mess, jsondata, jsondatachange});
                                        }
                                        else {
                                            smarthome[location][device][attribute] = value;
                                            const state = 1;
                                            const mess = 'Đã ' + statement;
                                            const jsondata = smarthome;
                                            const jsondatachange = {
                                                jsonlocation: location,
                                                jsondevice: device,
                                                jsonattribute: attribute,
                                                jsonvalue: value,
                                            }
                                            resolve({state, mess, jsondata, jsondatachange});
                                            fs.writeFileSync('D:/Smarthome-webapp/server_smarthome/smarthome.json', JSON.stringify(smarthome, null, 2), 'utf8');
                                            console.log('smarthome.json has been successfully updated.');  
                                        }
                                    }    
                                }
                            }          
                        }
                    }catch (parseError){console.error('Error parsing JSON:', parseError);}
                }            
            });
        });
    }
}

module.exports = {IOT};