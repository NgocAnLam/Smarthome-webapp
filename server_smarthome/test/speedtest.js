const http = require('http');

function getNetworkSpeed(fileUrl, callback) {
  const startTime = Date.now();

  http.get(fileUrl, (response) => {
    const fileSize = parseInt(response.headers['content-length'], 10);
    const endTime = Date.now();

    const downloadTime = (endTime - startTime) / 1000; // Thời gian tải về tính bằng giây
    const downloadSpeed = fileSize / downloadTime; // Tốc độ tải về tính bằng byte/giây

    callback(null, downloadSpeed);
  }).on('error', (err) => {
    callback(err);
  });
}

// Sử dụng hàm để lấy tốc độ mạng
const fileUrl = 'http://google.com/';

getNetworkSpeed(fileUrl, (err, speed) => {
  if (err) {
    console.error('Lỗi:', err);
  } else {
    console.log('Tốc độ mạng:', speed, 'byte/giây');
  }
});


