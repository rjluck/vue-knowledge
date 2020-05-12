window.addEventListener('load', function () {

    var goBack = document.querySelector('.goBack');
    var box2 = document.querySelector('.box2');
    window.addEventListener('scroll', function (e) {
        if (window.pageYOffset >= box2.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })

    goBack.addEventListener('click', function () {
        window.scroll(0, 0)
    })
})