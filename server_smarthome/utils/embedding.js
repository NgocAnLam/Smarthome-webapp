const { Configuration, OpenAIApi } = require('openai');
const getServices = require('../config/default_service_keys');


async function getEmbedding(message){
    const configuration = new Configuration(getServices.getOpenAIKey());
    const openai = new OpenAIApi(configuration);
    try {
        let response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: message    
        })
        let embeddings = response.data.data[0].embedding;
        return embeddings
            
    } catch (err) {
        console.error('ERROR:', err);
        return "An error occurred from OpenAI Embedding API";
    }
}
module.exports = getEmbedding;