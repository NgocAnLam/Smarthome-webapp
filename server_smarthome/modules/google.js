const getServices = require('../config/default_service_keys');
const textToSpeech = require('@google-cloud/text-to-speech');
const speech = require('@google-cloud/speech').v1p1beta1;

class GoogleSTT extends speech.SpeechClient {
    constructor(){
        let authConfig = getServices.getGoogleAuthConfig();
        super(authConfig);
    }

    async speech_to_text(audioBytes){
        let audio = {content: audioBytes};
        let config = {
            encoding: 'MP3', 
            sampleRateHertz: 16000, 
            languageCode: 'vi-VN', 
            speechContexts:[{
                phrases: ["$POSTALCODE", "$PERCENT"],
            }
                
            ]};
        let request = {audio: audio, config: config};
        try {
            let [response] = await this.recognize(request);
            let transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            return(transcription);
        } catch (err) {
            console.log('ERROR:', err);
            return 'Error occured from Google STT'
        }
    }    
}

class GoogleTTS extends textToSpeech.TextToSpeechClient {
    constructor(){
        let authConfig = getServices.getGoogleAuthConfig();
        super(authConfig);
    }

    async text_to_speech(message){
        let input = {text: message};
        let voice = {languageCode: 'vi-VN', ssmlGender: 'MALE'};
        let audioConfig = {audioEncoding: 'LINEAR16'};
        let request = {input: input, voice: voice, audioConfig: audioConfig};
        try {
            const [response] = await this.synthesizeSpeech(request);
            return(response.audioContent);
        } catch (err) {
            console.log('ERROR:', err);
            return 'Error occured from Google TTS'
        }
    } 
}

module.exports = {
    GoogleSTT,
    GoogleTTS
};