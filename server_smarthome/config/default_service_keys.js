function getGoogleAuthConfig() {
    return({
        projectId: 'speech-to-text-385414',
        keyFile: 'key.json'
    });
}

function getOpenAIKey(){
    return({
        apiKey: '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',
    })
}

function getGoogleSearchKey(){
    return("63daba7ceabeb61847926b9c15e86db1c0f8277eb7380c3edd12c3df693fb61d");
}

function getOpenWeatherKey(){
    return("6bac67fed78bca4e103b20dd1b87aecd")
}

module.exports = {
    getGoogleAuthConfig,
    getOpenAIKey,
    getGoogleSearchKey,
    getOpenWeatherKey
}
