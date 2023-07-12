function getImage(url, text){
    fetch(url, {
        method: 'POST', 
        headers: {'Content-Type': 'text/plain'}, 
        body: text
    })
    .then(response => response.json())
    .then(message => {
        addChatbot(message.urls);
    })
    .catch(error => {console.error(error)});
}

function getQuestion(url, audioUrl, text){
    fetch(url, {
        method: 'POST', 
        headers: {'Content-Type': 'text/plain'}, 
        body: text
    })
    .then(response => response.json())
    .then(message => {
        console.log(message.ChatGPT);
        addChatbot(message.ChatGPT);
        $('.TTS').attr('src', audioUrl);
    })
    .catch(error => {console.error(error)});
}

function getIOT(url){
    fetch(url)
    .then(response => response.json())
    .then(message => {
        var container = document.createElement("div");
        container.className = 'container';

        var countRoom = 0;
        var maxcountRoom = 3;

        for (var room in message) {
            var locationCard = document.createElement("div");
            locationCard.className = "locationCard";
            locationCard.textContent = room.charAt(0).toUpperCase() + room.slice(1);;      
            container.appendChild(locationCard);

            var devices = message[room];
            var row = document.createElement("div");
            row.className = "d-flex flex-row";
            row.style.flexWrap = "wrap";
            var countDevice = 0;
            var maxcountDevice = 3;
            
            for (var device in devices) {
                var iotInfoCard = document.createElement("div");
                iotInfoCard.className = "iotInfoCard";
                iotInfoCard.style.width = "30%";
                iotInfoCard.style.height = "70px";
                iotInfoCard.style.margin = "10px";
                iotInfoCard.style.padding = "10px";
                iotInfoCard.style.borderRadius = "10px";

                var cardBody = document.createElement("div");
                cardBody.className = "card-body";

                var flexRow = document.createElement("div");
                flexRow.className = "d-flex flex-row";

                var roomNameCard = document.createElement("h4");
                roomNameCard.className = "roomNameCard";
                roomNameCard.style.width = "90%";
                roomNameCard.textContent = device.charAt(0).toUpperCase() + device.slice(1);

                var formCheck = document.createElement("div");
                formCheck.className = "form-check form-switch";
                formCheck.style.margin = "0px 10px";
                formCheck.style.width = "10%";

                var checkbox = document.createElement("input");
                checkbox.className = "form-check-input";
                checkbox.id = device["idDiv"];
                checkbox.type = "checkbox";
                checkbox.role = "switch";
                checkbox.id = devices[device].idDiv;
                checkbox.checked = devices[device]["trạng thái"];
                
                formCheck.appendChild(checkbox);
                flexRow.appendChild(roomNameCard);
                flexRow.appendChild(formCheck);

                var attrDeviceCard = document.createElement("p");
                attrDeviceCard.className = devices[device]["idDiv"];
                attrDeviceCard.style.whiteSpace = "pre-line"
                attrDeviceCard.style.width = "85px";
                var attributes = devices[device];
                var attrText = "";
                for (var key in attributes) {
                    if (key !== "idDiv" && key !== "trạng thái") {
                        attrText += key + ': ' + attributes[key] + '\n';
                    }
                }
                attrDeviceCard.textContent = attrText.charAt(0).toUpperCase() + attrText.slice(1);;

                cardBody.appendChild(flexRow);
                cardBody.appendChild(attrDeviceCard);
                iotInfoCard.appendChild(cardBody);
                row.appendChild(iotInfoCard);

                countDevice ++;
                if (countDevice >= maxcountDevice) {
                    break;
                }
            }
            container.appendChild(row);
            countRoom ++;
            if (countRoom >= maxcountRoom) {
                break;
            }
            
        }
        iot.appendChild(container);
        iot.style.marginTop = "50px";
    })
    .catch(error => {console.error(error)});
}

function getIOTManager(url){
    fetch(url)
    .then(response => response.json())
    .then(message => {
        var container = document.createElement("div");
        container.className = 'container';
        for (var room in message) {
            var locationCard = document.createElement("div");
            locationCard.className = "locationCard";
            locationCard.textContent = room.charAt(0).toUpperCase() + room.slice(1);
            locationCard.style.margin = "20px"
            container.appendChild(locationCard);

            var devices = message[room];
            var row = document.createElement("div");
            row.className = "d-flex flex-row";
            row.style.flexWrap = "wrap";

            for (var device in devices) {
                var iotInfoCard = document.createElement("div");
                iotInfoCard.className = "iotInfoCard";
                iotInfoCard.style.width = "24%";
                iotInfoCard.style.height = "70px";
                iotInfoCard.style.margin = "5px";
                iotInfoCard.style.padding = "10px";
                iotInfoCard.style.borderRadius = "10px";
                
                var cardBody = document.createElement("div");
                cardBody.className = "card-body";

                var flexRow = document.createElement("div");
                flexRow.className = "d-flex flex-row";

                var roomNameCard = document.createElement("h4");
                roomNameCard.className = "roomNameCard";
                roomNameCard.style.width = "90%";
                roomNameCard.textContent = device.charAt(0).toUpperCase() + device.slice(1);

                var formCheck = document.createElement("div");
                formCheck.className = "form-check form-switch";
                formCheck.style.margin = "0px 10px";
                formCheck.style.width = "10%";

                var checkbox = document.createElement("input");
                checkbox.className = "form-check-input";
                checkbox.id = device["idDiv"];
                checkbox.type = "checkbox";
                checkbox.role = "switch";
                checkbox.id = devices[device].idDiv;
                checkbox.checked = devices[device]["trạng thái"];
                
                formCheck.appendChild(checkbox);
                flexRow.appendChild(roomNameCard);
                flexRow.appendChild(formCheck);

                var attrDeviceCard = document.createElement("p");
                attrDeviceCard.className = devices[device]["idDiv"];
                attrDeviceCard.style.whiteSpace = "pre-line"
                attrDeviceCard.style.width = "85px";
                var attributes = devices[device];
                var attrText = "";
                for (var key in attributes) {
                    if (key !== "idDiv" && key !== "trạng thái") {
                        attrText += key + ': ' + attributes[key] + '\n';
                    }
                }
                attrDeviceCard.textContent = attrText.charAt(0).toUpperCase() + attrText.slice(1);

                cardBody.appendChild(flexRow);
                cardBody.appendChild(attrDeviceCard);
                iotInfoCard.appendChild(cardBody);
                row.appendChild(iotInfoCard);
            }
            container.appendChild(row);
        }
        iotManager.appendChild(container);
    })
    .catch(error => {console.error(error)});
}

function postIOT(url, text){
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'}, 
        body: text}
    )
    .then(response => response.json())
    .then(message => {
        console.log(message.State, message.Mess, message.Data);

        for (room in message.Data) {
            for (device in message.Data[room]){      
                document.querySelector('#' + message.Data[room][device]['idDiv']).checked = message.Data[room][device]['trạng thái'];
                var attrText = "";
                for (var key in message.Data[room][device]) {
                    if (key !== "idDiv" && key !== "trạng thái") {
                        attrText += key + ': ' + message.Data[room][device][key]+ '\n';
                    }
                }
                document.querySelector('.' + message.Data[room][device]['idDiv']).textContent = attrText;
            }
        }
    })
    .catch(error => {console.error(error)});
}

function getShopping(url, text){
    fetch(url, {
        method: 'POST', 
        headers: {'Content-Type': 'text/plain'}, 
        body: text
    })
    .then(response => response.json())
    .then(message => {
        const jsondata = message.jsondata;

        for (let i = 0; i < jsondata.length; i++) {
            const { title, link, extracted_price, thumbnail } = jsondata[i];
            
            const card = document.createElement('div');
            card.className = 'd-flex flex-row cardshopping';
            card.style.width = '100%';
            card.style.border = '1px solid black';
            card.style.margin = '5px';
            
            const img = document.createElement('img');
            img.className = 'd-flex flex-row card-img-top';
            img.src = thumbnail;
            img.style.width = '30%';
            img.style.height = '100%';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'd-flex flex-column card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.style.fontSize = '10px';
            cardTitle.style.paddingTop = '5px';
            cardTitle.style.paddingLeft = '5px';
            cardTitle.textContent = title;
            
            const cardText = document.createElement('p');
            cardText.className = 'card-text';
            cardText.style.fontSize = '10px';
            cardText.style.paddingLeft = '5px';
            cardText.textContent = extracted_price;
            
            const buyLink = document.createElement('a');
            buyLink.href = link;
            buyLink.className = 'btn btn-primary';
            buyLink.textContent = 'Mua';
            
            // Append elements to the card
            card.appendChild(img);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(buyLink);
            card.appendChild(cardBody);

            const shoppingitems = document.querySelector('.shoppingitems');
            shoppingitems.appendChild(card);
        }
    })
    .catch(error => {console.error(error)});
}

function getNews(url){
    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}})
    .then(response => response.json())
    .then(message => {
        const jsondata = message;
        for (let i = 0; i < 20; i++) {
            const {title, descript, link, image, date} = jsondata.news[i];
            
            const card = document.createElement('div');
            card.className = 'd-flex flex-column cardnews';
            card.style.width = '97%';
            card.style.margin = '7px';
            card.style.padding = '10px';
            card.style.borderRadius = '10px';
            card.style.backgroundColor = '#FFFFFF';

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';

            const linktag = document.createElement('a');
            linktag.href = link;
            linktag.textContent = title;
            linktag.style.padding = '10px';
            linktag.style.margin = '10px';
            linktag.style.fontSize = '15px';
            linktag.style.color = '#000000';
            linktag.style.textDecoration = 'none';

            cardTitle.appendChild(linktag);

            const cardBody = document.createElement('div');
            cardBody.className = 'd-flex flex-row card-body';

            const cardBodyText = document.createElement('div');
            cardBodyText.className = 'd-flex flex-column card-body-text';
            
            const img = document.createElement('img');
            img.className = 'd-flex flex-row card-img-top';
            img.src = image;
            img.alt = 'Tin tức';
            img.style.width = '120px';
            img.style.height = '80px';
            img.style.borderRadius = '10px';
            img.style.margin = '10px'
            
            const cardDescript = document.createElement('p');
            cardDescript.className = 'card-description';
            cardDescript.style.fontSize = '10px';
            cardDescript.style.paddingLeft = '5px';
            cardDescript.textContent = descript;

            const cardDate = document.createElement('p');
            cardDate.className = 'card-date';
            cardDate.style.fontSize = '10px';
            cardDate.style.paddingLeft = '5px';
            cardDate.textContent = date;

            card.appendChild(cardTitle);
            cardBody.appendChild(img);
            cardBody.appendChild(cardBodyText);
            cardBodyText.appendChild(cardDescript);
            cardBodyText.appendChild(cardDate);
            card.appendChild(cardBody);
            // card.appendChild(linktag);

            const newsitems = document.querySelector('.newsitems');
            newsitems.appendChild(card);
        }
    })
    .catch(error => {console.error(error)});
}

function getCurrentPositionWithGeolocation(callback) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
  
    function success(pos) {
        var lat = pos.coords.latitude;
        var long = pos.coords.longitude;
        callback(long, lat);
    } 
    function error(err) {console.warn(`ERROR(${err.code}): ${err.message}`);} 
    navigator.geolocation.getCurrentPosition(success, error, options);
}
  
function getWeather(url, long, lat){
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'text/plain'}, 
        body: [long, lat]}
    )
    .then(response => response.json())
    .then(message => {
        // console.log(message);
        descriptionweather.textContent = message.weather[0].description;
        locationWeather.textContent = message.name;
        tempWeather.textContent = message.main.temp + ' \u00B0' + 'C';
        icon.src = `https://openweathermap.org/img/wn/${message.weather[0].icon}@2x.png`;
    })
    .catch(error => {console.error(error)});
}

function getWifiCurrentNetwork(url){
    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}})
    .then(response => response.json())
    .then(message => {console.log(JSON.stringify(message))})
    .catch(error => {console.error(error)});
}

function getWifiDeviceConnectList(url){
    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}})
    .then(response => response.json())
    .then(message => {
        console.log(JSON.stringify(message));
    })
    .catch(error => {console.error(error)});
}

function getInfoIPPublic(){
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        fetch('http://ip-api.com/json/' + data.ip)
        .then(response => response.json())
        .then(message => {console.log(JSON.stringify(message))})
        .catch(error => {console.log('Đã xảy ra lỗi khi truy vấn thông tin:', error.message)});
    })
    .catch(error => {console.log(error)});
}

function getDeviceList(){
}  

setInterval(() => {
    getCurrentPositionWithGeolocation(function(lat, long) {
      getWeather("http://127.0.0.1:8000/api/weather", lat, long);
    });
}, 60000);

window.addEventListener('load', () => {
    getCurrentPositionWithGeolocation(function(long, lat) {
        getWeather("http://127.0.0.1:8000/api/weather", long, lat);
    });
    getIOT("http://127.0.0.1:8000/api/smarthome.json");
    getNews("http://127.0.0.1:8000/api/news");  
    getIOTManager("http://127.0.0.1:8000/api/smarthome.json");
    getWifiCurrentNetwork("http://127.0.0.1:8000/api/wifiCurrentNetwork");
    getWifiDeviceConnectList("http://127.0.0.1:8000/api/wifiDeviceConnectList");
    getInfoIPPublic();
    getDeviceList();
    pillsChatbotTab.className = 'nav-link';
    pillsNewsTab.className = 'nav-link active';
    pillsShoppingTab.className = 'nav-link';
    pillsChatbot.className = 'tab-pane fade';
    pillsNews.className = 'tab-pane fade show active';
    pillsShopping.className = 'tab-pane fade';    
});