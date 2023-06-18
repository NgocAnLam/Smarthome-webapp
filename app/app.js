if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    const constraints = { audio: true };
    let chunks = [];
    let onSuccess = function (stream) {
        const mediaRecorder = new MediaRecorder(stream);

        recordhome.onclick = function (){
            console.log("recorder started");
            mediaRecorder.start();
            searchbarhome.value = '';
            const elementsToRemove = document.querySelectorAll('.d-flex .flex-row .cardshopping');
            elementsToRemove.forEach(element => {element.parentNode.removeChild(element);});
            $('.TTS').attr('src', '');
        }
        
        stoprecordhome.onclick = function () {
            console.log("recorder stopped");
            mediaRecorder.stop();
        }
        
        recordside.onclick = function () {
            mediaRecorder.start();
            console.log("recorder started");
            searchbarside.value = '';
            const elementsToRemove = document.querySelectorAll('.d-flex .flex-row .cardshopping');
            elementsToRemove.forEach(element => {element.parentNode.removeChild(element);});
            $('.TTS').attr('src', '');
        }
        
        stoprecordside.onclick = function () {
            console.log("recorder stopped");
            mediaRecorder.stop();
        }
  
        mediaRecorder.onstop = function (e) {
            console.log("data available after MediaRecorder.stop() called.");
            const blob = new Blob(chunks, { 'type' : 'audio/mp3' });
            chunks = [];
            let url = "http://127.0.0.1:8000/api/category";
            let formData = new FormData();
            formData.append('audio', blob, 'recording.mp3');
            fetch(url, {method: 'POST', body: formData})
            .then(response => response.json())
            .then(message => {
                console.log(message.STTRes);
                console.log(message.category);
                searchbarhome.value = message.STTRes;
    
                // IOT
                if(message.category == 1) {
                    let url = "http://127.0.0.1:8000/api/iot";
                    fetch(url, {
                        method: 'POST',
                        headers: {'Content-Type': 'text/plain'}, 
                        body: message.STTRes}
                    )
                    .then(response => response.json())
                    .then(message => {
                        const data = message.Data;
                        valueLivLight.textContent = data["phòng khách"]["đèn"]["độ sáng"];
                        valueLivFan.textContent = data["phòng khách"]["quạt"]["tốc độ"];
                        valueBedLight.textContent = data["phòng ngủ"]["đèn"]["độ sáng"];
                        valueBedTivi.textContent = data["phòng ngủ"]["tivi"]["âm lượng"];
                        statusLivLight.checked = data["phòng khách"]["đèn"]['trạng thái'] === 1;
                        statusLivFan.checked = data["phòng khách"]["quạt"]['trạng thái'] === 1;
                        statusBedLight.checked = data["phòng ngủ"]["đèn"]['trạng thái'] === 1;
                        statusBedTivi.checked = data["phòng ngủ"]["tivi"]['trạng thái'] === 1;
                    })
                    .catch(error => {console.error(error)});     
                }

                // Shopping
                if (message.category == 2) {
                    pillsChatbotTab.className = 'nav-link';
                    pillsHomeTab.className = 'nav-link';
                    pillsNewsTab.className = 'nav-link';
                    pillsShoppingTab.className = 'nav-link active';
                    pillsChatbot.className = 'tab-pane fade';
                    pillsHome.className = 'tab-pane fade';
                    pillsNews.className = 'tab-pane fade';
                    pillsShopping.className = 'tab-pane fade show active';
    
                    let url = "http://127.0.0.1:8000/api/shopping";
                    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}, body: message.STTRes})
                    .then(response => response.json())
                    .then(message => {
                        const jsondata = message.jsondata;
        
                        for (let i = 0; i < jsondata.length; i++) {
                            const { title, link, extracted_price, thumbnail } = jsondata[i];
                            
                            const card = document.createElement('div');
                            card.className = 'd-flex flex-row cardshopping';
                            card.style.width = '90%';
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

                // Question
                if (message.category == 3) {
                    addChatUser(message.STTRes);
                    pillsChatbotTab.className = 'nav-link active';
                    pillsHomeTab.className = 'nav-link';
                    pillsNewsTab.className = 'nav-link';
                    pillsShoppingTab.className = 'nav-link';
                    pillsChatbot.className = 'tab-pane fade show active';
                    pillsHome.className = 'tab-pane fade';
                    pillsNews.className = 'tab-pane fade';
                    pillsShopping.className = 'tab-pane fade';
        
                    let url = "http://127.0.0.1:8000/api/question";
                    let audio = "http://127.0.0.1:8000/api/TTS.mp3";
                    fetch(url, {
                        method: 'POST', 
                        headers: {'Content-Type': 'text/plain'}, 
                        body: message.STTRes
                    })
                    .then(response => response.json())
                    .then(message => {
                        console.log(message.ChatGPTRes);
                        addChatbot(message.ChatGPTRes);
                        $('.TTS').attr('src', audio);
                    })
                    .catch(error => {console.error(error)});
                }

                // News
                if (message.category == 4) {
                    addChatUser(message.STTRes);
                    pillsChatbotTab.className = 'nav-link ';
                    pillsHomeTab.className = 'nav-link';
                    pillsNewsTab.className = 'nav-link active';
                    pillsShoppingTab.className = 'nav-link';
                    pillsChatbot.className = 'tab-pane fade ';
                    pillsHome.className = 'tab-pane fade';
                    pillsNews.className = 'tab-pane fade show active';
                    pillsShopping.className = 'tab-pane fade';
        
                    let url = "http://127.0.0.1:8000/api/news";
                    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}})
                    .then(response => response.json())
                    .then(message => {
                        for (let i = 0; i < 20; i++) {
                            const { title, descript, link, image, date} = message.news[i];
                            
                            const card = document.createElement('div');
                            card.className = 'd-flex flex-row cardshopping';
                            card.style.width = '90%';
                            card.style.border = '1px solid black';
                            card.style.margin = '5px';
                            
                            const img = document.createElement('img');
                            img.className = 'd-flex flex-row card-img-top';
                            img.src = image;
                            img.style.width = '30%';
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
                            
                            // Append elements to the card
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
    
            }).catch(error => {console.error(error)});
        }
        mediaRecorder.ondataavailable = function (e) {chunks.push(e.data);}   
    }
    let onError = function (err) {console.log('The following error occured: ' + err);}
    navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
} 
else {console.log('getUserMedia not supported on your browser!')}