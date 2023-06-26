const { Configuration, OpenAIApi } = require("openai");
const getServices = require('../config/default_service_keys');

class ImageGenerator {
    constructor(){
        this.config = new Configuration(getServices.getOpenAIKey());
        this.openai = new OpenAIApi(this.config);
        this.size_dict = {"small": "256x256",
                        "medium": "512x512",
                        "large": "1024x1024"};
    }

    async generate(text, n, size="medium"){
        console.log(n);
        var response = await this.openai.createImage({
            prompt: text,
            n: n,
            size: this.size_dict[size],
          })
        return response.data.data;
    }
}


module.exports = ImageGenerator;
