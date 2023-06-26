/**
 * @param {string} text - The string
 */

const clusterVectors = require('./type_cluster_vectors')
const getEmbedding = require('./embedding');

function euclideanDistance(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      throw new Error('Arrays must have the same length');
    }
  
    let sum = 0;
    for (let i = 0; i < arr1.length; i++) {
      const diff = arr1[i] - arr2[i];
      sum += diff * diff;
    }
  
    return Math.sqrt(sum);
  }

function compareDistances(arr) {
    //return 1, 2 or 3 for command type 1, 2 or 3
    let typeVector = clusterVectors;
    let closestIdx = -1
    let closestDist = Infinity;

    for (let i=1; i<=3; i++){
        const distance = euclideanDistance(arr, typeVector[i]);
        if (distance < closestDist){
            closestDist = distance;
            closestIdx = i;
        }
    }
    return closestIdx;
}

function isCommonQuestion(text){
  text = text.toLowerCase();

  // Define the keywords to check
  const keywords = ["cách", "làm sao", "làm gì", "làm thế nào"];

  // Check if the text starts with any of the keywords
  for (let keyword of keywords) {
    if (text.startsWith(keyword)) {
      return true;
    }
  }
  return false;
}

function isImageGenQuery(text){
  text = text.toLowerCase();
  const start_pattern = /^tạo/;
  const mid_pattern = /hình ảnh về/;
  return (start_pattern.test(text) && mid_pattern.test(text));
}

async function getType(text){
  
  if (isCommonQuestion(text)) {
    return 3;
  }
  else if (isImageGenQuery(text)){
    return 4;
  }
  else {
    var arr = await getEmbedding(text);
    return compareDistances(arr);
  }
}
module.exports = getType;