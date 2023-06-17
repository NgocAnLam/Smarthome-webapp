const hello = document.querySelector('.hello_main');
const clock = document.querySelector('.clock_main');

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    const dayOfWeek = now.getDay();
    const vietnameseDaysOfWeek = [
        'Chủ nhật',
        'Thứ hai',
        'Thứ ba',
        'Thứ tư',
        'Thứ năm',
        'Thứ sáu',
        'Thứ bảy'
    ];

    var date1 = now.getDate() + '/' + formatDigits((Number(now.getMonth()) + 1)).toString() + '/' + now.getFullYear();
    var date2 = now.getHours() + ":" + formatDigits(now.getMinutes()) + ":" + formatDigits(now.getSeconds());
    var time = vietnameseDaysOfWeek[dayOfWeek] + '   ' + date1 + '   ' + date2;
    if (hours >= 5 && hours < 12){hello.innerHTML = 'Chào buổi sáng, Viettel';}
    else if (hours >= 12 && hours < 18){hello.innerHTML = 'Chào buổi chiều, Viettel'; }
    else {hello.innerHTML = 'Chào buổi tối, Viettel'; }    
    clock.innerHTML = time;
}
  
function formatDigits(digit) {
    return digit < 10 ? "0" + digit : digit;
}

setInterval(updateClock, 1000);