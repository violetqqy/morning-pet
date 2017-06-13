import 'html-loader!./pages/main.html';
import '../node_modules/swiper/dist/css/swiper.min.css';
import './scss/main.scss';
import $ from 'jquery';
import i18next from 'i18next';
import jqueryI18next from 'jquery-i18next';
import translation_en from './i18n/translation_en.json';
import translation_zh from './i18n/translation_zh.json';

$(document).ready(function() {
  i18next.init({
    lng: 'en', // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
    resources: { // evtl. load via xhr https://github.com/i18next/i18next-xhr-backend
      en: {
        translation: translation_en
      },
      zh: {
        translation: translation_zh
      },
    }
  }, function(err, t) {
    jqueryI18next.init(i18next, $);
    $('body').localize();
  });
  $('.pet-language__button').on('click', function() {
    if (i18next.language == 'en') {
      i18next.changeLanguage('zh', function(err, t) {
        $('body').localize();
      });
    } else {
      i18next.changeLanguage('en', function(err, t) {
        $('body').localize();
      });
    }
  });
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
  if ($(this).scrollTop() !== 0) {
    $('#pet-header').addClass('active');
  }
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
      $('#pet-header').addClass('active');
    }
    if (iScrollTop < 1) {
      $('#pet-header').removeClass('active');
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
