window.onload = function() {

    'use strict';

    //-------------------------------
    //Поиск
    //-------------------------------
    var $headerTopNavSearch = $('.header__top-nav-serch'),
        $headerTopNavSerchButton = $('.header__top-nav-serch-button'),
        $headerTopNavList = $('.header__top-nav-list');

    $headerTopNavSerchButton.click(function(e) {
        e.stopPropagation();
        var w = $(window).width();
        var $this = $(this);
        if ($this.hasClass('active')) {
            if (w > 640) {
                $this.removeClass('active');
                $headerTopNavSearch.fadeOut(600);
                $headerTopNavList.fadeTo(600, 1);
            } else {
                $this.removeClass('active');
                $headerTopNavSearch.slideUp(200);
            }
        } else {
            if (w > 640) {
                $headerTopNavSearch.fadeIn(600);
                $headerTopNavList.fadeTo(660, 0);
            } else {
                $this.addClass('active');
                $headerTopNavSearch.slideDown(200);
            }
        }
    });

    //-------------------------------
    //sitemap
    //-------------------------------

    var $headerSitemap = $('.header__sitemap'),
        $headerSitemapButton = $('.header__sitemap-button');

     $headerSitemapButton.click(function(e) {
         e.stopPropagation();
         var $this = $(this);
         if(!$this.hasClass('active')) {
             $this.addClass('active');
             $headerSitemap.slideDown(400);
         } else {
             $this.removeClass('active');
             $headerSitemap.slideUp(400);
         }
     });

    //-------------------------------
    //Выключение интерактивных элементов по клику на документ
    //-------------------------------
    $(document).on('click', function(e) {
        e.stopPropagation();
        var w = $(window).width();
        if (w > 640 && !$(e.target).closest($headerTopNavSearch).length) {
            $headerTopNavSerchButton.removeClass('active');
            $headerTopNavSearch.fadeOut(200);
            $headerTopNavList.fadeTo(660, 1);
        }
        if (!$(e.target).closest($headerSitemap).length) {
            $headerSitemapButton.removeClass('active');
            $headerSitemap.slideUp(400);
        }
    });

    //-------------------------------
    //Выключение скрытых интерактивных элементов по ресайзу
    //-------------------------------

    $(window).resize(function() {
        var w = $(window).width();
        //Выключение скрытого меню по ресайзу
        if (w < 641) {
            $headerTopNavSearch.removeAttr('style');
            $headerTopNavSerchButton.removeClass('active');
            $headerTopNavList.removeAttr('style');
        }
        if (w > 640) {
            $headerTopNavList.removeAttr('style');
            $headerTopNavSearch.removeAttr('style');
            $headerTopNavSerchButton.removeClass('active');
        }
    });



    //-------------------------------
    //navigation появление списков меню
    //-------------------------------

    var $navigationItem = $('.navigation__item'),
        $navigationItemText = $('.navigation__item-text'),
        $navigationItemMenu = $('.navigation__item-menu');

    $navigationItemMenu.hide();
    $navigationItem.hover(
        function() {
            $(this).addClass('active')
            .find($navigationItemText).stop().slideUp(500).end()
            .find($navigationItemMenu).stop().slideDown(500);
        },
        function() {
            $(this).removeClass('active')
            .find($navigationItemMenu).stop().slideUp(500).end()
            .find($navigationItemText).stop().slideDown(500);
        }
    );
    $navigationItem.mouseover(function() {
        $(this).addClass('active')
        .find($navigationItemText).stop().slideUp(500).end()
        .find($navigationItemMenu).stop().slideDown(500);
    });



    //------------------------------------
    //Выравнивание блоков по высоте
    //------------------------------------

    $(".services__item_big").equalHeight();
    $(".services__item_small").equalHeight();
    $(".services__item_hight").equalHeight();
    $(".footer__item-title").equalHeight();


    //---------------------------------
    //Адаптивный слайдер
    //---------------------------------

    var $sliderDotsLi = $('.slider__dots li');
    $('.slider__box').addClass('owl-carousel').owlCarousel({
        loop: true,
        items: 1,
        nav: true,
        navText: '',
        //autoHeight: true,
        autoplayTimeout: 10000,
        autoplay: true,
        smartSpeed: 1200,
        onInitialized: function() {
            $sliderDotsLi.removeClass('active').eq($('.owl-dot.active').index()).addClass('active');
        },
        onChanged: function(){
            $sliderDotsLi.removeClass('active').eq($('.owl-dot.active').index()).addClass('active');
        }
    });
    $sliderDotsLi.click(function() {
        $('.owl-dot').eq($(this).index()).trigger('click');
    });

    //--------------------------------------------------
    //Табы serch
    //--------------------------------------------------
    var $serchFilterSection = $(".serch__filter-section"),
        $serchFilterLine = $('.serch__filter-line'),
        $serchFilterButtons = $('.serch__filter-buttons');
    $('.serch__filter-reset').hide();
    $serchFilterSection.hide();
    $serchFilterButtons.on('click', 'button', function(e) {
        e.stopPropagation();
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $serchFilterLine.addClass('disabled');
            $this.addClass('active').siblings().removeClass('active');
            $serchFilterSection.slideUp(300).eq($this.index()).slideDown(300);
        } else {
            $serchFilterLine.removeClass('disabled');
            $this.removeClass('active');
            $serchFilterSection.slideUp(300);
        }
    });

    $(".serch__filter-section").on('click', '.serch__filter-button button', function() {
        if ($(this).closest('.serch__filter-button').prev('.serch__filter-section-box').find('input').is(':checked')) {
            $('.serch__filter-buttons button').eq($(this).closest('.serch__filter-section').index()).removeClass('active').addClass('selected');
            $('.serch__filter-line').removeClass('disabled');
            $('.serch__filter-reset').fadeIn(300);
            $(".serch__filter-section").slideUp(300);

        }
    });

    $('.serch__filter-buttons').on('click', 'button.selected i', function() {
        $(this).closest('button').removeClass('selected');
        if(!$('.serch__filter-buttons').find('button').hasClass('selected')) {
            $('.serch__filter-reset').fadeOut(300);
        }
    });

    $('.serch__filter-reset').click(function() {
        $('.serch__filter-buttons button').removeClass('selected');
        $('.serch__filter-check input').prop( "checked", false );
        $(this).fadeOut(300);
    });

    $(document).on('click', function(e) {
        e.stopPropagation();
        if (!$(e.target).closest($serchFilterSection).length) {
            $serchFilterLine.removeClass('disabled');
            $serchFilterButtons.find('button').removeClass('active');
            $serchFilterSection.slideUp(300);
        }
    });

    $('.serch__filter-date').on('change', 'input', function() {
        var $this = $(this);
        if ($this.val() != '') {
            $this.parents('label').addClass('selected');
        } else {
            $this.parents('label').removeClass('selected');
        }
    });

    //------------------------------------------------
    //Табы page
    //------------------------------------------------

    var $pageMainTabButtons = $('.page__tab-buttons'),
        $pagemaintabsection = $(".page__tab-section");

    $pageMainTabButtons.find('button:first').addClass('active');
    $pagemaintabsection.not(":first").hide();

    $pageMainTabButtons.on('click', 'button:not(.active)', function() {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $pagemaintabsection.hide().eq($this.index()).fadeIn(300);
    });

    //------------------------------------------------
    // zoom-gallery картинок
    //------------------------------------------------
    $('.gallery-popup').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: true,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
            horizontalFit: true,
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});

    //------------------------------------
    //popup
    //------------------------------------

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });

    //------------------------------------
    //datepicker
    //------------------------------------

    $( ".datepicker" ).datepicker({
        minDate: 0,
        dateFormat : 'dd.mm.yy'
    });

    //------------------------------------
    //Сокрытие длинных отзывов на странице преподавателя
    //------------------------------------

    var $asideEducationReviewsItemText = $('.aside-education__reviews-item-text');

    $asideEducationReviewsItemText.each(function() {
        var $this = $(this),
            $thisHeight = $this.height();
        if($thisHeight >= 82) {
            $this.css({
                'max-height' : '82px'
            }).after('<button type="button" class="hide">Раскрыть полностью</button>');
        }
    });

    $('.aside-education__reviews-item').on('click', 'button', function() {
        var $this = $(this);
        if ($this.hasClass('hide')) {
            $this.removeClass('hide').prev($asideEducationReviewsItemText);
            var $thisTextHeight = $this.prev($asideEducationReviewsItemText).removeAttr('style').height();
            $this.prev($asideEducationReviewsItemText).css({
                'max-height' : '82px'
            }).animate({
                'max-height' : $thisTextHeight + 'px'
            }, 300).next('button').html('Скрыть');
        } else {
            $this.addClass('hide').prev($asideEducationReviewsItemText).animate({
                'max-height' : '82px'
            }, 300).next('button').html('Раскрыть полностью');
        }
    });

    //-----------------------------------------------------
    //Сокрытие цен
    //-----------------------------------------------------
    var $pagePricesItem = $('.page__prices-item'),
        $pagePricesTable = $('.page__prices-table');

    $pagePricesItem.removeClass('active');
    $pagePricesTable.hide();

    $('.page__prices').on('click', '.page__prices-item', function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active').find($pagePricesTable).slideDown(300);
        } else {
            $this.removeClass('active').find($pagePricesTable).slideUp(300);
        }
    });


    //-----------------------------------------------------
    //Яндекс карта
    //-----------------------------------------------------

    var $map = $('#map');
    if ($map.length) {

        ymaps.ready(function() {
            var myMap = new ymaps.Map('map', {
                center: [55.698116, 37.800592],
                zoom: 13,
                controls: ['zoomControl'],
                behaviors: ["drag", "dblClickZoom", "rightMouseButtonMagnifier", "multiTouch"]
            }, {
                searchControlProvider: 'yandex#search'
            });
            var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                hintContent: '',
                balloonContent: ''
            }, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/favicon/icon-map.png',
                // Размеры метки.
                iconImageSize: [26, 26],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-9, -26]
            });
            function disableDrag() {
                var w = $(window).width();
                if (w < 768) {
                    myMap.behaviors.disable('drag');
                } else {
                    myMap.behaviors.enable('drag');
                }
            }
            disableDrag();
            $(window).resize(function() {
                disableDrag();
            });

            myMap.geoObjects.add(myPlacemark);
        });
    }

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });
}
