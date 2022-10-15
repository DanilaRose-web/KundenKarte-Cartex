/* ВАЛИДАЦИЯ ФОРМЫ (REGISTRATION)
====================================================================== */
var form = document.querySelector('#register-form');
var username = document.querySelector('#name');
var surname = document.querySelector('#surname');
var email = document.querySelector('#email');
var phone = document.querySelector('#phone');
var button = document.querySelector('button[type=submit]');
var formItem = document.querySelectorAll('.form-item');

form.onsubmit = function (e) {

    var usernameVal = username.value.trim();
    // var surnameVal = surname.value.trim();
    // var emailVal = email.value.trim();
    var phoneVal = phone.value.trim();
    var error = false;

    if (usernameVal == '') {
        // Показываем текст ошибка
        // Добавляем класс error
        setErrorFor(username);
        error = true;
    } else if (!isNaN(usernameVal)) {
        setErrorFor(username);
        error = true;
    } else {
        // добавляем класс success
        setSuccessFor(username);
    }

    // if (surnameVal == '') {
    //     // Показываем текст ошибка
    //     // Добавляем класс error
    //     setErrorFor(surname);
    //     error = true;
    // } else if (!isNaN(surnameVal)) {
    //     setErrorFor(surname);
    //     error = true;
    // } else {
    //     // добавляем класс success
    //     setSuccessFor(surname);
    // }

    // if (emailVal === '') {
    //     setErrorFor(email);
    //     error = true;
    // } else if (!isEmail(emailVal)) {
    //     setErrorFor(email);
    //     error = true;
    // } else {
    //     setSuccessFor(email);
    // }

    if (phoneVal == '') {
        // Показываем текст ошибка
        // Добавляем класс error
        setErrorFor(phone);
        error = true;
    } else if (isNaN(phoneVal)) {
        setErrorFor(phone);
        error = true;
    }
    else {
        // добавляем класс success
        setSuccessFor(phone);
    }


    if (error) {
        e.preventDefault();
    }
};


for (let i = 0; i < formItem.length; i++) {
    formItem[i].onclick = function () {
        this.classList.remove('error');
        this.classList.remove('success');
    };
}



function setErrorFor(input) {
    var item = input.parentElement; // Получаем родителя Input

    // добавляем класс error
    item.className = 'form-item error';
}

function setSuccessFor(input) {
    var item = input.parentElement; // Получаем родителя Input
    item.className = 'form-item success';
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}








/* enter-in-profile - masonry */
var elem = document.querySelector('.grid');
var msnry = new Masonry(elem, {
    // options
    itemSelector: '.grid-item'
});

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry('.grid', {
    // options
});




$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3.99,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true
});





//  открытие оферты на странице register

var overlayModal = document.querySelector('.overlay-modal');
    var modal = document.querySelector('.modal-window');
    var wrapModal = document.querySelector('.wrap-modal');
    var closeModal = document.querySelector('.close-modal');
    console.log(overlayModal);

    modal.onclick = open;
    overlayModal.onclick = close;
    closeModal.onclick = close;

    function open() {
        modal.classList.add('show');
        overlayModal.classList.add('show');
        wrapModal.classList.add('show');
    }

    function close() {
        modal.classList.remove('show');
        overlayModal.classList.remove('show');
        wrapModal.classList.remove('show');
    }