import 'html-loader!./pages/main.html';
import '../node_modules/swiper/dist/css/swiper.min.css';
import './scss/main.scss';
import $ from 'jquery';

$('#test').html('Hello world!');
$('#test').on('click', function() {
  alert('hahaha~');
})

$(document).ready(function() {
  $(window).scrollTop(0);
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    // autoplay: 3000,
    // autoplayDisableOnInteraction: false,
    // speed: 300,
    // 分页器
    pagination: '.swiper-pagination',
    paginationClickable: true,
  });
  $(window).scroll(function() {
    var scrollTop = $(this).scrollTop(); //滚动高度  
    var height = $(this).height(); //窗口高度
    if(scrollTop <= height){
      $('.swiper-container').css('opacity', (height-scrollTop)/height);
    }
    if (scrollTop > 0) {
      $('#pet-header').addClass('pet-header--active');
    }
    if (scrollTop < 1) {
      $('#pet-header').removeClass('pet-header--active');
    }
    // if (scrollTop < height) {
    //   $('.swiper-container').removeClass('pet-swiper--active');
    // }
  });
});
