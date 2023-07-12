btnCall.onclick = function (){

    const phoneNumber = callNumber.value;
    linkCall.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'tel:' + phoneNumber;
        linkCall.href = 'tel:' + phoneNumber;
    });
    
}