const getServices = require('../config/default_service_keys');

class Weather {
    constructor(){
        this.apiKey = getServices.getOpenWeatherKey();
        this.url = 'https://api.openweathermap.org/data/2.5/weather';
        this.modeExclude = 'hourly,daily,minutely';
        this.lat = 10.868348;
        this.long = 106.795424;       
    }

    async getData(long, lat){
        if (long!=null && lat!=null){
            this.long = long;
            this.lat = lat;
        }
        let apiUrlWithParams = `${this.url}?lat=${this.lat}&lon=${this.long}&units=metric&lang=vi&exclude=${this.modeExclude}&appid=${this.apiKey}`;
        try{
            const response = await fetch(apiUrlWithParams);
            const data = response.json();
            if(response.status == 200){return data}
            else{console.log("Error: Weather API call error"); return data;}
        }
        catch (err){console.log("Error:",err); return "An error occurred from OpenWeather chat module";}
    }
}
module.exports = Weather;