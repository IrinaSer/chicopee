"use strict";

let kokoc = {
  init() {
    this.plugins.catalogToggle.init();
    this.plugins.mobileMenu.init();
    this.plugins.siteSliders.init();
    this.pages.base.init();
    this.pages.scrollIndent.init();
  },

  plugins: {
    catalogToggle: {
      init: function init() {
        let panel = $('.tabs-panel');
        panel.each(function () {
          let count = $(this).find('.catalog-list-item').length;
          if (count > 6) {
            $(this).children('.show-all').addClass('show');
          }
        });
        panel.on('click', '.show-all', function () {
          $(this).siblings('.catalog-list').addClass('open');
          $(this).hide();
        });
      }
    },
    mobileMenu: {
      init() {
        function closeMenu() {
          $('#m-menu').removeClass('open');
          $('.layout').removeClass('open');
          $('.mobile-btn').removeClass('open');
          $('.site-header').removeClass('open');
        };

        $('.mobile-btn').on('click', function (e) {
          e.stopPropagation();
          $('#m-menu').toggleClass('open');
          $('.layout').toggleClass('open');
          $('.mobile-btn').toggleClass('open');
          $('.site-header').toggleClass('open');
        });


        $('.layout').on('click', function () {
          if ($('#m-menu').hasClass('open')) {
            closeMenu();
          }
        });

        $('[data-close]').on('click', function () {
          closeMenu();
        });

      }
    },
    siteSliders: {
      init() {
        this.indexSlider();
        this.productDetailSlider.init();
      },
      indexSlider() {
        let mainSlider = $('.main-slider').slick({
          arrows: false,
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 15000,
          speed: 600,

        });
      },
      productDetailSlider: {
        init() {
          $("[data-product]").fancybox({
            touch: false,
            afterShow: function (instance, slide) {
              $('html, body').addClass('over');

              $('#product-detail').css({'opacity': '1', 'visibility': 'visible'});

              $('.slider-for').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '.slider-nav',
                responsive: [
                  {
                    breakpoint: 861,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                      fade: true,
                      asNavFor: '.slider-nav',
                      autoplay: true,
                      autoplaySpeed: 2000,
                    }
                  }
                ]
              });

              $('.slider-nav').not('.slick-initialized').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.slider-for',
                dots: false,
                focusOnSelect: true,
                arrows: true,
                responsive: [
                  {
                    breakpoint: 1025,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      asNavFor: '.slider-for',
                      dots: false,
                      focusOnSelect: true,
                      arrows: true
                    }
                  },
                  {
                    breakpoint: 861,
                    settings: {
                      vertical: true,
                      slidesToShow: 2,
                      slidesToScroll: 1,
                      asNavFor: '.slider-for',
                      dots: false,
                      focusOnSelect: true,
                      arrows: true,
                      autoplay: true,
                      autoplaySpeed: 2000,
                    }
                  }
                ]
              });

              function popupScroll() {
                if (!Foundation.MediaQuery.atLeast('large')) {
                  $('#product-detail .product-detail_wrap').mCustomScrollbar({
                    theme: "minimal-dark",
                    axis: "y"
                  });
                } else {
                  $('#product-detail .product-detail_wrap').mCustomScrollbar("disable");
                }

                $(window).on('changed.zf.mediaquery', function (event, newSize, oldSize) {
                  if ((newSize == 'medium') || (newSize == 'small')) {
                    $('#product-detail .product-detail_wrap').mCustomScrollbar({
                      theme: "minimal-dark",
                      axis: "y"
                    });
                  } else {
                    $('#product-detail .product-detail_wrap').mCustomScrollbar("disable");
                  }
                });
              }

              popupScroll();

            },
            afterClose: function () {
              $('html, body').removeClass('over');
            }
          });
        }
      }
    }
  },
  pages: {
    base: {
      init() {
        $("input[type='tel']").mask("+7 (999) 999-9999");


        $('.file input').on('change', function () {
          if ($(this).value != '') {
            console.log(1);
            $(this).siblings('.clear').addClass('avail');
          }
        });

        $('.file').on('click', '.clear', function () {
          document.getElementById("uploaded-file").value = "";
          $(this).removeClass('avail');
        });


        $("[data-fancybox]").fancybox({
          touch: false,
          afterShow: function (instance, slide) {
            $('html').addClass('over');
            $('body').addClass('over');
          },
          afterClose: function () {
            $('html').removeClass('over');
            $('body').removeClass('over');
          }
        });

        ymaps.ready(init);

        function init() {
          var myMap = new ymaps.Map("map", {
            center: [55.761740, 37.608311],
            zoom: 14
          });

          var myPlacemark = new ymaps.Placemark([55.761740, 37.608311], {
            hintContent: 'Содержимое всплывающей подсказки',
            balloonContent: 'Содержимое балуна'
          }, {
            iconLayout: 'default#image',
            iconImageHref: 'assets/img/base64/map.svg',
            iconImageSize: [37, 50],
            iconImageOffset: [-5, -38]
          });

          myMap.geoObjects.add(myPlacemark);
          myMap.container.fitToViewport();
        }

        $(document)
          .on("invalid.zf.abide", function (ev, elem) {
            console.log(elem);
            elem.removeClass('valid');
          })
          // field element is valid
          .on("valid.zf.abide", function (ev, elem) {
            if (elem.prop("required")) {
              elem.addClass('valid');
            }
          })
          .on("submit", function (ev) {
            ev.preventDefault();
          });
      }
    },
    scrollIndent: {
      init() {
        function calcIndent() {
          let indent = $('.site-header').height();
          Foundation.Magellan.defaults.offset = indent;
        }

        calcIndent();
        $(window).on('resize', function () {
          calcIndent();
        });
      }
    }
  }
};

window.addEventListener('DOMContentLoaded', function () {
  kokoc.init();
  $(document).foundation();
});
