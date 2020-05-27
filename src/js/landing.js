import './../scss/landing.scss';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper';
import './../img/landing_hero.png';
$(function() {
    $(document).on('click', '.anchor-link', function(e) {
        e.preventDefault();
        $('#navbar-collapse').collapse('hide');
        $("html, body").stop().animate({
            scrollTop: Math.round($(this.getAttribute('href')).offset().top-80) + 'px'
        }, 1500);
    });
    const mySwiper = new Swiper('#usage_swiper', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
});