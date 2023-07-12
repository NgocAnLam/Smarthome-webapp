const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'vi-VN';
recognition.continuous = true;
recognition.interimResults = false;
recognition.start();
let isRecognizing = false;

recognition.onstart = function() {console.log('Speech recognition started.')};
recognition.onend = function() {recognition.start()};
recognition.onresult = (event) => {
    isRecognizing = true;
    const results = event.results;
    const transcript = results[event.resultIndex][0].transcript;
    console.log(`transcript ${transcript}`);
    
    if (transcript.toLowerCase().includes('ok google')) {
        const constraints = { audio: true };
        let chunks = [];
        let onSuccess = function (stream) {
            const mediaRecorder = new MediaRecorder(stream);   
                
            // start record
            var audio = document.createElement("audio");
            audio.controls = true;
            audio.autoplay = true;
            var source = document.createElement("source");
            source.src = "./okgoogle.mp3";
            source.type = "audio/mpeg";
            audio.appendChild(source);

            console.log("recorder started");
            mediaRecorder.start();
            searchbarhome.value = '';
            const elementsToRemove = document.querySelectorAll('.d-flex .flex-row .cardshopping');
            elementsToRemove.forEach(element => {element.parentNode.removeChild(element);});
            $('.TTS').attr('src', '');
    
            setTimeout(() => {
                if (isRecognizing) {
                    console.log("Recognition stopped due to no sound.");
                    recognition.stop();
                    mediaRecorder.stop();
                }
            }, 5000);
        
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

                    if (message.STTRes != '') {
                        // IOT
                        if(message.category == 1) { 
                            postIOT("http://127.0.0.1:8000/api/iot", message.STTRes); 
                        }
        
                        // Shopping
                        if (message.category == 2) {
                            pillsChatbotTab.className = 'nav-link';
                            pillsNewsTab.className = 'nav-link';
                            pillsShoppingTab.className = 'nav-link active';
                            pillsChatbot.className = 'tab-pane fade';
                            pillsNews.className = 'tab-pane fade';
                            pillsShopping.className = 'tab-pane fade show active';
                            getShopping("http://127.0.0.1:8000/api/shopping", message.STTRes);       
                        }
        
                        // Question
                        if (message.category == 3) {
                            addChatUser(message.STTRes);
                            pillsChatbotTab.className = 'nav-link active';
                            pillsNewsTab.className = 'nav-link';
                            pillsShoppingTab.className = 'nav-link';
                            pillsChatbot.className = 'tab-pane fade show active';
                            pillsNews.className = 'tab-pane fade';
                            pillsShopping.className = 'tab-pane fade';
                            getQuestion('http://127.0.0.1:8000/api/question', 'http://127.0.0.1:8000/api/TTS.mp3', message.STTRes)
                        }
        
                        // Image
                        if (message.category == 4) {
                            addChatUser(message.STTRes);
                            pillsChatbotTab.className = 'nav-link active';
                            pillsNewsTab.className = 'nav-link';
                            pillsShoppingTab.className = 'nav-link';
                            pillsChatbot.className = 'tab-pane fade show active';
                            pillsNews.className = 'tab-pane fade';
                            pillsShopping.className = 'tab-pane fade';   
                            getImage('http://127.0.0.1:8000/api/image_gen', message.STTRes);
                        }
        
                        // News
                        if (message.category == 5) {
                            pillsChatbotTab.className = 'nav-link ';
                            pillsNewsTab.className = 'nav-link active';
                            pillsShoppingTab.className = 'nav-link';
                            pillsChatbot.className = 'tab-pane fade ';
                            pillsNews.className = 'tab-pane fade show active';
                            pillsShopping.className = 'tab-pane fade';

                            getNews('http://127.0.0.1:8000/api/news');
                        }
                    }
                }).catch(error => {console.error(error)});
            } 
            mediaRecorder.ondataavailable = function (e) {chunks.push(e.data);}   
        }
        let onError = function (err) {console.log('The following error occured: ' + err);}
        navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    }    
};
