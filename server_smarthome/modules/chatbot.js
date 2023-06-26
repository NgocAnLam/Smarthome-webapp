const { Configuration, OpenAIApi } = require('openai');
const getServices = require('../config/default_service_keys');
const SerpApi = require('google-search-results-nodejs');

class Chatbot {
    constructor() {
        
        this.config = new Configuration(getServices.getOpenAIKey());
        this.openai = new OpenAIApi(this.config);
    }

    async generate(message) {
        try {
            let chatCompletion = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
            })
            let response = chatCompletion.data.choices[0].message.content;
            // let total_token = chatCompletion.data.usage.total_tokens;
            console.log(response); 
            return (response);
        } catch (err) {
            console.error('ERROR:', err.response.status);
            return err.response.statusText;
        }
    }

    async getEmbedding(message){
        try {
            let response = await this.openai.createEmbedding({
                model: 'text-embedding-ada-002',
                input: message    
            });
            let embeddings = response.data.data[0].embedding;
            return embeddings;
        }
        catch(err){
            console.error('ERROR:', err);
            return "An error occurred from OpenAI";
        }
    }

    async TMDT_GPT(message) {
        try {
            let chatCompletion = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "assistant", content: "câu lệnh -> sản phẩm"},
                    {role: "assistant", content: "Mở shopee và tìm iphone 14 promax -> iphone 14 promax"},
                    {role: "assistant", content: "Tìm bánh snack trong tiki -> bánh snack"},
                    {role: "assistant", content: "Mở lazada đi chatbot-> ''"},
                    {role: "user", content: message + " -> "}
                ],
            })
            let response = chatCompletion.data.choices[0].message.content;
            return response;
        } catch (err) {
            console.error('ERROR:', err);
            return "An error occurred from OpenAI";
        }
    }
}

class ChatbotWithLinks {
    constructor() {
        this.config = new Configuration(getServices.getOpenAIKey());
        this.openai = new OpenAIApi(this.config);
        this.search = new SerpApi.GoogleSearch(getServices.getGoogleSearchKey());
    }

    async generate(message, num) {
        try {
            var links = [];
            var messageList = [];
            var numResults = 0;
            var searchResults = await this.search.json({
                q: "điểm đến du lịch tại Vũng Tàu?",
                num: num
            }, (data) => {
                for (let i = 0; i < data.organic_results.length; i++) {
                    links.push( data.organic_results[i].link );
                }
                
                for (let i = 0; i < numResults; i++) {
                    messageList.push({ role: "user", content: "Talk in the User\'s language. " + message + " by using information from the following links as supplementary materials: " + links[i] });
                }

                console.info(messageList);
            })
            var chatCompletion = await this.openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messageList,
                temperature: 0.5,
                max_tokens: 1000,
                frequency_penalty:0,
                presence_penalty:0
            })
            var response = chatCompletion.data.choices[0].message.content;
            return response;
        } catch (err) {
            console.error('ERROR:', err);
            return "An error raised from OpenAI";
        }
    }
}

module.exports = {
    Chatbot,
    ChatbotWithLinks
}
