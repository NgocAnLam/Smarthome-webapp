const {Chatbot, ChatbotWithLinks}= require('./chatbot.js');
const fs = require('fs');
const csv = require('csv-parser');
const math = require('mathjs');

class Features {
    async embeddingMessage(message) {
      const chatbot = new Chatbot();
      const embedding = await chatbot.getEmbedding(message);
      return embedding;
    }
  
    async getCategory(message) {
      try {
        const results = await new Promise((resolve, reject) => {
          const results = [];
          fs.createReadStream('Commands.csv')
            .pipe(csv())
            .on('data', (data) => {
              results.push(data);
            })
            .on('end', () => {
              resolve(results);
            })
            .on('error', (error) => {
              reject(error);
            });
        });
  
        const vectorPromise = this.embeddingMessage(message);
        const vector = await vectorPromise;
  
        const distanceArr = [];
        for (let i = 0; i < results.length; i++) {
          const distance = math.distance(
            JSON.parse(results[i].Embedding),
            vector
          );
          distanceArr.push(distance);
        }
  
        const numMinValues = 7;
        const minValues = [];
        const minIndices = [];
        const minTypeOfValues = [];
  
        for (let i = 0; i < numMinValues; i++) {
          let minValue = Infinity;
          let minIndex = -1;
          for (let j = 0; j < distanceArr.length; j++) {
            if (distanceArr[j] < minValue && minIndices.indexOf(j) === -1) {
              minValue = distanceArr[j];
              minIndex = j;
            }
          }
          minValues.push(minValue);
          minIndices.push(minIndex);
          minTypeOfValues.push(results[minIndex].Type);
        }
  
        const sum = minValues.reduce((acc, val) => acc + val, 0);
        const average = sum / minValues.length;
        let mode;
  
        if (average > 0.5) {mode = 3;} 
        else {
          const count1 = minTypeOfValues.filter((value) => value === '1').length;
          const count2 = minTypeOfValues.filter((value) => value === '2').length;
          if (count1 > count2) {mode = 1;} 
          else {mode = 2;}
        }
        return mode;
      } 
      catch (error) {console.error(error);}
    }
}

module.exports = {Features}
