function getNews (url){
    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}})
    .then(response => response.json())
    .then(message => {
        for (let i = 0; i < 10; i++) {
            const { title, descript, link, image, date} = message.news[i];
            
            const card = document.createElement('div');
            card.className = 'd-flex flex-row cardnews';
            card.style.width = '100%';
            card.style.border = '1px solid black';
            card.style.margin = '10px';
            
            const img = document.createElement('img');
            img.className = 'd-flex flex-row card-img-top';
            img.src = image;
            img.style.width = '40%';
            img.style.height = '100%';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'd-flex flex-column card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.style.paddingTop = '5px';
            cardTitle.style.paddingLeft = '5px';
            cardTitle.textContent = title;
            
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
            
            const buyLink = document.createElement('a');
            buyLink.href = link;
            buyLink.className = 'btn btn-primary';
            buyLink.textContent = 'Xem thêm';

            card.appendChild(img);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescript);
            cardBody.appendChild(cardDate);
            cardBody.appendChild(buyLink);
            card.appendChild(cardBody);

            const newsitems = document.querySelector('.newsitems');
            newsitems.appendChild(card);
        }
    })
    .catch(error => {console.error(error)});
}

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
                iotInfoCard.style.height = "100px";
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
            card.style.width = '98%';
            card.style.border = '1px solid black';
            card.style.margin = '5px';
            card.style.padding = '5px';
            card.href = link;

            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.style.paddingTop = '5px';
            cardTitle.style.paddingLeft = '5px';
            cardTitle.textContent = title;

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
            
            const Link = document.createElement('a');
            Link.href = link;

            card.appendChild(cardTitle);
            cardBody.appendChild(img);
            cardBody.appendChild(cardBodyText);
            cardBodyText.appendChild(cardDescript);
            cardBodyText.appendChild(cardDate);
            card.appendChild(cardBody);

            const newsitems = document.querySelector('.newsitems');
            newsitems.appendChild(card);
        }
    })
    .catch(error => {console.error(error)});
}

function getWeather(url){
    fetch(url)
    .then(response => response.json())
    .then(message => {
        console.log(message);
        descriptionweather.textContent = message.weather[0].description;
        locationWeather.textContent = message.name;
        tempWeather.textContent = message.main.temp + ' oC';
        icon.src = `https://openweathermap.org/img/wn/${message.weather[0].icon}@2x.png`;

    })
    .catch(error => {console.error(error)});
}

setInterval(() => getWeather("http://127.0.0.1:8000/api/weather"), 60000);
window.addEventListener('load', () => {
    getIOT("http://127.0.0.1:8000/api/smarthome.json");
    getNews("http://127.0.0.1:8000/api/news");
    getWeather("http://127.0.0.1:8000/api/weather");
    getIOTManager("http://127.0.0.1:8000/api/smarthome.json");
});