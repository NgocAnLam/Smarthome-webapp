const axios = require('axios');
const { parseString } = require('xml2js');

class News {
    async getNews(){
        try {
            const response = await axios.get('https://vnexpress.net/rss/tin-moi-nhat.rss');        
            return new Promise((resolve, reject) => {
                const rssXML = response.data;
                parseString(rssXML, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML:', err);
                        reject(err);
                    }
                
                    const items = result.rss.channel[0].item;
                    const titles = [];
                    const links = [];
                    const images = [];
                    const pubDates = [];
                    const descripts = [];
                    const news = [];

                    items.forEach((item) => {
                        titles.push(item.title[0]);
                        links.push(item.link[0]);
                        const start_index = item.description[0].indexOf('src="') + 5;
                        const end_index = item.description[0].indexOf('"', start_index);
                        const image_url = item.description[0].slice(start_index, end_index);                           
                        images.push(image_url);
                        pubDates.push(item.pubDate[0]);
                        descripts.push(item.description[0].slice(item.description[0].indexOf('</br>') + 5));
                    });

                    for (let i = 0; i < titles.length; i++) {
                        const obj = {
                            title: titles[i],
                            descript: descripts[i],
                            link: links[i],
                            image: images[i],
                            date: pubDates[i] 
                        };
                        news.push(obj);
                    }
                    
                    resolve(news)    
                });  
            }) 
        } catch (error) {console.error('Error fetching RSS feed:', error);}
    }
}

module.exports = {News}