normalMode.onclick = function(){
    homesrceen.style.width = '55%';
    sidebarright.style.width = '30%';
    searchhome.style.display = '';
    searchbarhome.style.display = '';
    hello.style.display = '';
    clock.style.display = '';
    locationWeather.style.display = '';
    tempWeather.style.display = '';
    iconWeather.style.display = '';
    descriptionweather.style.display = '';
    cardshopping.forEach((div) => {div.style.width = '95%';});
    shoppingitems.forEach((div) => {div.style.flexDirection = 'column';});
    cardnews.forEach((div) => {div.style.width = '95%';});
    newsitems.forEach((div) => {div.style.flexDirection = 'column';});
    iot.style.display = '';
    pillsHomeTab.style.display = '';
    pillsNewsTab.style.display = '';
    pillsChatbotTab.style.display = '';
    pillsShoppingTab.style.display = '';
    pillsHome.style.display = '';
    pillsNews.style.display = '';
    pillsChatbot.style.display = '';
    pillsShopping.style.display = '';
    iotManager.style.display = 'none';
}
  
focusMode.onclick = function(){
    homesrceen.style.width = '0%';
    sidebarright.style.width = '85%';
    searchhome.style.display = 'none';
    searchbarhome.style.display = 'none';
    hello.style.display = 'none';
    clock.style.display = 'none';
    locationWeather.style.display = 'none';
    tempWeather.style.display = 'none';
    iconWeather.style.display = 'none';
    descriptionweather.style.display = 'none';
    iot.style.display = 'none';
    pillsHomeTab.style.display = '';
    pillsNewsTab.style.display = '';
    pillsChatbotTab.style.display = '';
    pillsShoppingTab.style.display = '';
    pillsHome.style.display = '';
    pillsNews.style.display = '';
    pillsChatbot.style.display = '';
    pillsShopping.style.display = '';
    iotManager.style.display = 'none';
}

deviceMode.onclick = function() {
    homesrceen.style.width = '0%';
    sidebarright.style.width = '85%';
    searchhome.style.display = 'none';
    searchbarhome.style.display = 'none';
    hello.style.display = 'none';
    clock.style.display = 'none';
    locationWeather.style.display = 'none';
    tempWeather.style.display = 'none';
    iconWeather.style.display = 'none';
    descriptionweather.style.display = 'none';
    iot.style.display = 'none';
    pillsHomeTab.style.display = 'none';
    pillsNewsTab.style.display = 'none';
    pillsChatbotTab.style.display = 'none';
    pillsShoppingTab.style.display = 'none';
    pillsHome.style.display = 'none';
    pillsNews.style.display = 'none';
    pillsChatbot.style.display = 'none';
    pillsShopping.style.display = 'none';
    iotManager.style.display = '';
}