const getServices = require('../config/default_service_keys');
const SerpApi = require('google-search-results-nodejs');

class Shopping {
    constructor() {
        this.search = new SerpApi.GoogleSearch(getServices.getGoogleSearchKey());
    }

    async GetInfoItems(message) {
        return new Promise((resolve, reject) => {
            let web = '';
            let tbsweb = '';
            let mess = '';
            let checkweb = 0;
            let item;
            let jsondata;

            const webArray = ['shopee', 'tiki', 'lazada'];
            const removeArray = [
                'tìm', 'mua', 'mở', 'mở shopee', 'mở tiki', 'mở lazada', 'kiếm', 'trang',
                'vào', 'để', 'lướt', 'xem', 'và', 'sản phẩm', 'trên', 'truy cập', 'các',
                'chất lượng', 'mẫu', 'shopee', 'tiki', 'lazada', 'web', 'website'              
            ];
            
            for (const webItem of webArray) {
                if (message.includes(webItem)) {
                    web = webItem;
                    checkweb = 1;
                }
            }

            for (const Item of removeArray) {
                if (message.includes(Item)) {
                    message = message.replace(Item, '');
                }
            }  

            item = message.trim();
            if (item == ''){
                mess = 'Không tìm thấy sản phẩm';
                jsondata = null;
                resolve ({mess, jsondata});
            } 
            else {
                if (checkweb == 1) {
                    if (web == 'shopee') {tbsweb = "mr:1,merchagg:g115784110";}
                    if (web == 'tiki') {tbsweb = "mr:1,merchagg:g248710977";}
                    if (web == 'lazada') {tbsweb = "mr:1,merchagg:g116709387";}

                    const params = {
                        engine: "google_shopping",
                        q: item,
                        hl: "vi",
                        gl: "vn",
                        tbs: tbsweb,
                    };
                    const callback = function(data) {
                        jsondata = data["shopping_results"];
                        mess = 'Đây là các sản phẩm liên quan đến ' + item + ' trên ' + web;
                        console.log(`item: ${item} -- web: ${web}`);
                        resolve ({mess, jsondata});            
                    };       
                    this.search.json(params, callback);
                }
                else {
                    const params = {
                        engine: "google_shopping",
                        q: item,
                        hl: "vi",
                        gl: "vn",
                    };
                    const callback = function(data) {
                        jsondata = data["shopping_results"];
                        mess = 'Đây là các sản phẩm liên quan đến ' + item;
                        console.log(`item: ${item}`);
                        resolve ({mess, jsondata});                    
                    };     
                    this.search.json(params, callback);
                }                
            }           
        }); 
    }

}

module.exports = {Shopping}