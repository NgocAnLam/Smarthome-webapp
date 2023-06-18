window.addEventListener('load', () => {
    // updateIOT();
    updateNews();
});
  
// function updateIOT() {
//     fetch('http://127.0.0.1:8000/api/smarthome.json')
//     .then(response => response.json())
//     .then(data => {
//         valueLivLight.textContent = data["phòng khách"]["đèn"]["độ sáng"];
//         valueLivFan.textContent = data["phòng khách"]["quạt"]["tốc độ"];
//         valueBedLight.textContent = data["phòng ngủ"]["đèn"]["độ sáng"];
//         valueBedTivi.textContent = data["phòng ngủ"]["tivi"]["âm lượng"];
//         statusLivLight.checked = data["phòng khách"]["đèn"]['trạng thái'] === 1;
//         statusLivFan.checked = data["phòng khách"]["quạt"]['trạng thái'] === 1;
//         statusBedLight.checked = data["phòng ngủ"]["đèn"]['trạng thái'] === 1;
//         statusBedTivi.checked = data["phòng ngủ"]["tivi"]['trạng thái'] === 1;
//     })
//     .catch(error => {console.error('Error:', error);});
// }

function updateNews() {
    let url = "http://127.0.0.1:8000/api/news";
    fetch(url, {method: 'POST', headers: {'Content-Type': 'text/plain'}})
    .then(response => response.json())
    .then(message => {
        const jsondata = message;
        for (let i = 0; i < 20; i++) {
            const { title, descript, link, image, date} = jsondata.news[i];
            
            const card = document.createElement('div');
            card.className = 'd-flex flex-row cardshopping';
            card.style.width = '90%';
            card.style.border = '1px solid black';
            card.style.margin = '5px';
            
            const img = document.createElement('img');
            img.className = 'd-flex flex-row card-img-top';
            img.src = image;
            img.style.width = '30%';
            img.style.height = '100%';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'd-flex flex-column card-body';
            
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.style.paddingTop = '5px';
            cardTitle.style.paddingLeft = '5px';
            cardTitle.textContent = title;
            
            const cardDescript = document.createElement('p');
            cardDescript.className = 'card-description';
            cardDescript.style.fontSize = '10px';
            cardDescript.style.paddingLeft = '5px';
            cardDescript.textContent = descript;

            const cardDate = document.createElement('p');
            cardDate.className = 'card-date';
            cardDate.style.fontSize = '10px';
            cardDate.style.paddingLeft = '5px';
            cardDate.textContent = date;
            
            const buyLink = document.createElement('a');
            buyLink.href = link;
            buyLink.className = 'btn btn-primary';
            buyLink.textContent = 'Xem thêm';

            card.appendChild(img);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescript);
            cardBody.appendChild(cardDate);
            cardBody.appendChild(buyLink);
            card.appendChild(cardBody);

            const newsitems = document.querySelector('.newsitems');
            newsitems.appendChild(card);
        }
    })
    .catch(error => {console.error(error)});
}
