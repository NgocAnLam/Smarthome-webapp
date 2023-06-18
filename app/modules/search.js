function sendMessageHome() {
    const inputField = searchbarhome.value;
    console.log(inputField);
    let input = inputField.trim();
    input != "" && output(input);
    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = searchbarhome;
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            input != "" && output(input);
            inputField.value = "";
        }
    });
});
  
function addShoppingItems(data){
    const mainDiv = document.querySelector(".shoppingitems");
    let userDiv = document.createElement("div");
    userDiv.className = "d-flex flex-row cardshopping";
    userDiv.style = "width: 90%; border: 1px solid black; margin: 5px;";
    userDiv.classList.add("message1");
    userDiv.innerHTML = `<span>${data}</span>`;
    mainDiv.appendChild(userDiv);
}

function output(text) {
    let input = text.toLowerCase();
    let url = "http://127.0.0.1:8000/api/categoryType";
    fetch(url, {method: 'POST', body: input})
    .then(response => response.json())
    .then(message => {
        console.log(message.STTRes);
        console.log(message.category);

        // IOT
        // if (message.category == 1){
        //     let url = "http://127.0.0.1:8000/api/iot";
        //     fetch(url, {
        //         method: 'POST',
        //         headers: {'Content-Type': 'text/plain'}, 
        //         body: message.STTRes
        //     })
        //     .then(response => response.json())
        //     .then(message => {
        //         const data = message.Data;
        //         valueLivLight.textContent = data["phòng khách"]["đèn"]["độ sáng"];
        //         valueLivFan.textContent = data["phòng khách"]["quạt"]["tốc độ"];
        //         valueBedLight.textContent = data["phòng ngủ"]["đèn"]["độ sáng"];
        //         valueBedTivi.textContent = data["phòng ngủ"]["tivi"]["âm lượng"];
        //         statusLivLight.checked = data["phòng khách"]["đèn"]['trạng thái'] === 1;
        //         statusLivFan.checked = data["phòng khách"]["quạt"]['trạng thái'] === 1;
        //         statusBedLight.checked = data["phòng ngủ"]["đèn"]['trạng thái'] === 1;
        //         statusBedTivi.checked = data["phòng ngủ"]["tivi"]['trạng thái'] === 1;
        //     })
        //     .catch(error => {console.error(error)});    
        // }

        // Shopping
        if (message.category == 2){
            let url = "http://127.0.0.1:8000/api/shopping";

            pillsChatbotTab.className = 'nav-link';
            pillsHomeTab.className = 'nav-link';
            pillsNewsTab.className = 'nav-link';
            pillsShoppingTab.className = 'nav-link active';
            pillsChatbot.className = 'tab-pane fade';
            pillsHome.className = 'tab-pane fade';
            pillsNews.className = 'tab-pane fade';
            pillsShopping.className = 'tab-pane fade show active';
            
            fetch(url, {
                method: 'POST', 
                headers: {'Content-Type': 'text/plain'}, 
                body: message.STTRes
            })
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
        if (message.category == 3){
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
    })
    .catch(error => {console.error(error)});
}

function sendMessage() {
    const inputField = document.getElementById("input");
    let input = inputField.value.trim();
    input != "" && output(input);
    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            input != "" && output(input);
            inputField.value = "";
        }
    });
});
  
// function output(text) {
//     let input = text.toLowerCase();
//     addChatUser(input);
//     let url = "http://127.0.0.1:8000/api/question";
//     fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'},  body: input})
//     .then(response => response.json())
//     .then(message => {
//         console.log(message.ChatGPTRes);
//         addChatbot(message.ChatGPTRes);
//     })
//     .catch(error => {console.error(error)});
// }

function addChatUser(input){
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);
}

function addChatbot(output){
    const mainDiv = document.getElementById("message-section");
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${output}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
}