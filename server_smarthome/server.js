const express = require('express');
const multer = require('multer');
const Google = require('./modules/google.js');
const IOT = require('./modules/iot.js');
const {Chatbot, ChatbotWithLinks}= require('./modules/chatbot.js');
const bodyParser = require('body-parser');
const shopping = require('./modules/shopping.js');
const getType = require('./utils/command_classify');
const news = require('./modules/news.js');
const Weather = require('./modules/weather.js');
const ImageGenerator = require('./modules/image_gen.js');
const fs = require('fs');
const { Console } = require('console');
const wifi = require('./modules/wifi.js');


const app = express();
const port = 8000;

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json());
app.use(bodyParser.text());

const storage = multer.memoryStorage();
const upload = multer({storage});
const stt = new Google.GoogleSTT();
const tts = new Google.GoogleTTS();
const chatbot = new Chatbot();
const smarthome = new IOT.IOT();
const shoppingItems = new shopping.Shopping(); 
const newsItems = new news.News();
const imageGen = new ImageGenerator();
const weather = new Weather();
const Wifi = new wifi();

let ChatGPT;

app.post('/api/question', async (req, res) => {
    const STTRes = req.body;
    ChatGPT = await chatbot.generate(STTRes);
    res.send({ChatGPT});

    app.get('/api/TTS.mp3', async (req, res) => {
        const TTSRes = await tts.text_to_speech(ChatGPT);
        res.setHeader('Content-Type', 'audio/mpeg');
        res.send(TTSRes);
    });    
});

app.post('/api/image_gen', async (req, res) => {
    const text = req.body;
    const arrText = text.split(" ");
    const dictDigit = {
        'một': 1,
        'hai': 2,
        'ba': 3,
    }
    var n;
    if (arrText[1]==='hình'){
        n=1;
    }
    else if (arrText[1] in dictDigit){
        n = dictDigit[arrText[1]];
    }
    else {
        n = parseInt(arrText[1])
    }
    urls = await imageGen.generate(text, n=n);
    res.send({urls}); // array of dicts
});

app.post('/api/news', async (req, res) => {
    newsInfo = newsItems.getNews();
    newsInfo
    .then((news) => {res.send({news})})
    .catch(error => {console.error(error);});
})

app.post('/api/shopping', async (req, res) => {
    getInfoItems = shoppingItems.GetInfoItems(req.body);
    getInfoItems
    .then(response => {
        const mess = response.mess;
        const jsondata = response.jsondata;
        res.send({mess, jsondata});

        app.get('/api/ShoppingTTS.mp3', async (req, res) => {
            TTSRes = await tts.text_to_speech(mess);
            res.setHeader('Content-Type', 'audio/mpeg');
            res.send(TTSRes);
        }); 
    })
    .catch(error => {console.error(error);});
});

app.post('/api/iot', async (req, res) => {
    IOTProcess = smarthome.process(req.body);
    IOTProcess
    .then(Res => {
        console.log(`jsondata: ${JSON.stringify(Res.jsondata)}`);
        res.send({State: Res.state, Mess : Res.mess, Data : Res.jsondata});
    })
    .catch(error => {console.error(error);});
});

app.get('/api/smarthome.json', (req, res) => {
    res.sendFile('D:/Smarthome-webapp/server_smarthome/smarthome.json');
});

app.post('/api/category', upload.single('audio'), async (req, res) => {
    const file = req.file;
    var category;
    const audioBytes = file.buffer.toString('base64');
    STTRes = await stt.speech_to_text(audioBytes);
    STTRes = STTRes.toLowerCase();
    console.log(`STTRes: ${STTRes}`);

    if (STTRes.includes('tin tức')) {
        category = 5;
        res.send({STTRes, category});
    }
    else{
        getType(STTRes).then(category => {
            res.send({STTRes, category});
        });
    }
     
});

app.post('/api/categoryType', async (req, res) => {
    const STTRes = req.body;
    if (STTRes.includes('tin tức')) {
        category = 5;
        res.send({STTRes, category});
    }
    else{
        getType(STTRes).then(category => {
            res.send({STTRes, category});
        });
    }
});

app.post('/api/weather', async (req, res) => {
    var location = req.body;
    location = location.split(',');
    const lat = location[1];
    const long = location[0];
    weatherInfo = await weather.getData(long, lat);
    res.send(weatherInfo);    
})

app.post('/api/wifiCurrentNetwork', async (req, res) => {
    try {
        const wifiInfoCurrentNetwork = await Wifi.currentNetwork();
        const ipPublic = await Wifi.getPublicIP('192.168.31.80');
        const infoIPPublic = await Wifi.getInfoIPPublic(ipPublic);
        res.send(wifiInfoCurrentNetwork);
    } 
    catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.post('/api/wifiDeviceConnectList', async (req, res) => {
    try {
        DeviceConnectList = await Wifi.deviceConnectList('192.168.31.1', '192.168.31.254');
        res.send(DeviceConnectList);
    } 
    catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => console.log(`Server is running http://localhost:${port}`));