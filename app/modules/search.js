function sendMessageHome() {
    const inputField = searchbarhome.value;
    let input = inputField.trim();
    input != "" && output(input);
    inputField.value = "";
}

searchhome.onclick = function (){
    sendMessageHome();
    searchbarside.value = "";
    searchbarhome.value = "";
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
    userDiv.style = "width: 100%; border: 1px solid black; margin: 5px;";
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
        if(message.category == 1) {
            postIOT("http://127.0.0.1:8000/api/iot", message.STTRes)
            getIOT("http://127.0.0.1:8000/api/smarthome.json");       
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
            getShopping("http://127.0.0.1:8000/api/shopping", message.STTRes);       
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

            getQuestion('http://127.0.0.1:8000/api/question', 'http://127.0.0.1:8000/api/TTS.mp3', message.STTRes)
        }

        // Image
        if (message.category == 4) {
            addChatUser(message.STTRes);
            pillsChatbotTab.className = 'nav-link active';
            pillsHomeTab.className = 'nav-link';
            pillsNewsTab.className = 'nav-link';
            pillsShoppingTab.className = 'nav-link';
            pillsChatbot.className = 'tab-pane fade show active';
            pillsHome.className = 'tab-pane fade';
            pillsNews.className = 'tab-pane fade';
            pillsShopping.className = 'tab-pane fade';

            getImage('http://127.0.0.1:8000/api/image_gen', message.STTRes);
        }

        // News
        if (message.category == 5) {
            pillsChatbotTab.className = 'nav-link ';
            pillsHomeTab.className = 'nav-link';
            pillsNewsTab.className = 'nav-link active';
            pillsShoppingTab.className = 'nav-link';
            pillsChatbot.className = 'tab-pane fade ';
            pillsHome.className = 'tab-pane fade';
            pillsNews.className = 'tab-pane fade show active';
            pillsShopping.className = 'tab-pane fade';

            getNews('http://127.0.0.1:8000/api/news');
        }
    })
    .catch(error => {console.error(error)});
}

function sendMessageSide() {
    const inputField = searchbarside.value;
    let input = inputField.trim();
    input != "" && output(input);
    inputField.value = "";
}

searchside.onclick = function (){
    sendMessageSide();
    searchbarside.value = "";
    searchbarhome.value = "";
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
    userDiv.style.margin = '0px';
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;

    let dateDiv = document.createElement("div");
    const date = document.createElement('p');
    date.style.fontSize = '10px';
    date.style.textAlign = 'center';
    var now = new Date();
    const dayOfWeek = now.getDay();
    const vietnameseDaysOfWeek = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    var date1 = now.getDate() + '/' + formatDigits((Number(now.getMonth()) + 1)).toString() + '/' + now.getFullYear();
    var date2 = now.getHours() + ":" + formatDigits(now.getMinutes()) + ":" + formatDigits(now.getSeconds());
    var time = vietnameseDaysOfWeek[dayOfWeek] + '   ' + date1 + '   ' + date2;
    date.innerHTML = time;

    dateDiv.appendChild(date);
    mainDiv.appendChild(dateDiv);
    mainDiv.appendChild(userDiv);
}

function addChatbot(output){
    const mainDiv = document.getElementById("message-section");
    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.style.margin = '80px 0px 10px 0px';
    if (Array.isArray(output)) {
        for (let i = 0; i < output.length; i++) {
            const img = document.createElement('img');
            img.className = 'd-flex flex-row card-img-top';
            img.src = output[i].url;
            img.style.width = '100%';
            img.style.height = '100%';
            botDiv.appendChild(img);
        }
    }
    else {
        botDiv.classList.add("message");
        botDiv.style.whiteSpace = "pre-wrap";
        botDiv.innerHTML = `<span id="bot-response">${output}</span>`;
    }
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
}