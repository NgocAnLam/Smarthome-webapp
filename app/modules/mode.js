normalMode.onclick = function(){
    homesrceen.style.width = '55%';
    sidebarright.style.width = '30%';
    recordhome.style.display = '';
    stoprecordhome.style.display = '';
    searchhome.style.display = '';
    searchbarhome.style.display = '';
    hello.style.display = '';
    clock.style.display = '';
    locationWeather.style.display = '';
    tempWeather.style.display = '';
    iconWeather.style.display = '';
    cardshopping.forEach((div) => {div.style.width = '95%';});
    shoppingitems.forEach((div) => {div.style.flexDirection = 'column';});
    cardnews.forEach((div) => {div.style.width = '95%';});
    newsitems.forEach((div) => {div.style.flexDirection = 'column';});
}
  
focusMode.onclick = function(){
    homesrceen.style.width = '0%';
    sidebarright.style.width = '85%';
    recordhome.style.display = 'none';
    stoprecordhome.style.display = 'none';
    searchhome.style.display = 'none';
    searchbarhome.style.display = 'none';
    hello.style.display = 'none';
    clock.style.display = 'none';
    locationWeather.style.display = 'none';
    tempWeather.style.display = 'none';
    iconWeather.style.display = 'none';
    cardshopping.forEach((div) => {div.style.width = '30%';});
    shoppingitems.forEach((div) => {div.style.flexDirection = 'row';});
    cardnews.forEach((div) => {div.style.width = '30%';});
    newsitems.forEach((div) => {div.style.flexDirection = 'row';});
}