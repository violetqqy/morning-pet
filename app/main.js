import 'html-loader!./pages/main.html';
import '../node_modules/swiper/dist/css/swiper.min.css';
import './scss/main.scss';
import $ from 'jquery';

$(document).ready(function() {
  //配置幻灯片动画
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: 3000,
    autoplayDisableOnInteraction: false,
    speed: 300,
    // 分页器
    pagination: '.swiper-pagination',
    paginationClickable: true,
  });
  //滚动渐隐幻灯片
  $(window).scroll(function() {
    var oSwiper = $('.swiper-container');
    var iScrollTop = $(this).scrollTop(); //滚动高度  
    var iWindowHeight = $(this).height(); //窗口高度
    if (iScrollTop <= iWindowHeight) {
      //设置幻灯片的透明度
      oSwiper.css('opacity', (iWindowHeight - iScrollTop) / iWindowHeight);
    }
    if (iScrollTop > 0) {
      // $('#pet-header').addClass('pet-header--active');
    }
    if (iScrollTop < 1) {
      // $('#pet-header').removeClass('pet-header--active');
    }
  });
  //控制菜单按钮
  var oHeader = $('#pet-header');
  var oMenu = $('#pet-menu');
  var oNav = $('#pet-nav');
  oMenu.on('click', function() {
    oHeader.toggleClass('dark');
    oNav.toggleClass('active');
  });
});
