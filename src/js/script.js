jQuery(document).ready(function() {
  var app = new App();
  app.Menu();
  app.MenuIcon();
  app.Range();
  app.Select();
  app.Tabs();
  app.Mask();
  app.Posted();
  app.AddMore();
  app.Hide();
  app.Scrollbar();
  app.Cities();
  app.MenuAction();
  app.Autocomplete();
  app.NextStep();
  app.Datepicker();
  app.Catalog();
  app.Order();

  $(window).resize(function(event) {
    app.MenuAction();
    app.Slider();
    app.Posted();
  });

  $(window).resize();
  $(window).scroll();
});


function App() {
  var desktopWIdth = 1170,
      overlay = $('.overlay'),
      _this = this;

  // Hide parent
  this.Hide = function() {
    var item = $('[data-close=btn]');

    item.on('click', function(event) {
      event.preventDefault();
      $(this).parent().fadeOut('fast');

      _this.Overlay(false);
    });
  };

  // Form Posted
  this.Posted = function() {
    var btn = $('[data-post=btn]');
    var block = $('[data-post=wrap]');

    if ($(window).width() > desktopWIdth) {
      btn.on('click', function(event) {
        event.preventDefault();
        block.fadeIn('fast');
        _this.Overlay(block);

        $(document).mouseup(function (e) {
            if (block.has(e.target).length === 0){
                block.fadeOut('fast');
            }
        });
      });
    } else {
      btn.off();
    }
  };

  // Input type range
  this.Range = function() {
    $('.range').each(function(index, el) {
      if ($(this).parent().hasClass('input-helper--range')) {
        var input = $(this).parent().find('input'),
            slider = $(this).data('ionRangeSlider'),
            _this = $(this);

        input.val($(this).attr('data-from'));

        $(this).ionRangeSlider({
          onChange: function (data) {
            input.val(+_this.parent().find('.irs-single').html());
          }
        });

        $(this).parent().find('input').on('input', function () {
          var info = $(this).parent().find('.range');
          var value = +$(this).val();

          if (value > +info.attr('data-max')) {
            $(this).val(+info.attr('data-max'));
          } else if (value < +info.attr('data-min')) {
            $(this).val(+info.attr('data-min'));
          }

          slider.update({
              from: value
          });
        });

      } else {
        $(this).ionRangeSlider();
      }
    });
  };

  // Custom select
  this.Select = function() {
    $('.select__item').selectmenu();
  };

  // Tabs mobile
  this.Tabs = function() {
    $(window).resize(function(event) {
      if ($(window).width() < desktopWIdth) {
        $('.tabs').addClass('tabs--compress')
      } else {
        $('.tabs').removeClass('tabs--compress')
      }
    });

    $('.tabs__hidden').each(function(index, el) {
      var value = $(this).parent().find('.tabs__item--curent').html();
      var _this = $(this);
      $(this).html(value);

      $(this).on('click', function(event) {
        event.preventDefault();
        $(this).parent().find('.tabs__wrap').toggleClass('tabs__wrap--hide');
      });

      $(this).parent().find('.tabs__item').on('click', function(event) {
        _this.parent().find('.tabs__item--curent').toggleClass('tabs__item--curent');
        _this.parent().find('.tabs__wrap').toggleClass('tabs__wrap--hide');
        _this.html($(this).html());
        $(this).addClass('tabs__item--curent');

      });
    });
  };

  // Menu
  this.Menu = function() {
    var menu = $('.main-header'),
        menuHeight = 156,
        menuBtn = $('.main-header__menu-btn'),
        _this = this;

    this.fixed = function(status) {
      if ($(window).width() > desktopWIdth) {
        if (status) {
          $( 'body' ).css({
            'padding-top': menuHeight + 'px'
          });
          menu.addClass('main-header--fixed');
        } else {
          $( 'body' ).css({
            'padding-top': '0'
          });
          menu.removeClass('main-header--fixed');
        }
      }
    };

    this.status = function() {
      menuBtn.hasClass('main-header__menu-btn--active');
    };

    this.checkStatus = function(status) {
      $('.main-header__wrap').toggleClass('main-header__wrap--active', status);
      $('body').toggleClass('menu-open', status);

      if ($('.inner-menu--active')) {
        $('.inner-menu--active').removeClass('inner-menu--active');
      }
    };

    menuBtn.click(function() {
      $(this).toggleClass('main-header__menu-btn--active');
      _this.checkStatus(_this.status);
    });

    $('main').click(function() {
      menuBtn.toggleClass('main-header__menu-btn--active', false);
      _this.checkStatus(false);
    });

    $('.main-header__search').focus(function() {
      menu.addClass('main-header--input');
      $('.main-header__search-clear').addClass('main-header__search-clear--active');
    });

    $('.main-header__search').focusout(function() {
      menu.removeClass('main-header--input');
      $('.main-header__search-clear').removeClass('main-header__search-clear--active');
    });

    $('.main-header__search-clear').click(function(event) {
      $(this).parent().find('input').val('');
    });

    $('.main-header__search').keypress(function(event) {
      $('.main-header__search-clear').toggleClass('main-header__search-clear--active', !!$(this).val());
    });

    this.MenuAction = function() {
      if (!($(window).width() < desktopWIdth)) {
        $(window).scroll(function() {
          _this.fixed($(window).scrollTop() > menuHeight)
        });
      } else {
        $('.main-header__order-item').click(function(event) {
          event.preventDefault();
          var title = $(this).find('.main-header__order-title').html();
          $(this).addClass('main-header__order-item--active');
          $(this).find('.inner-menu').addClass('inner-menu--active');
          $(this).find('.inner-menu__back').html(title);
        });
        $('.inner-menu__back').click(function(event) {
          event.preventDefault();
          event.stopPropagation();
          $(this).parent().removeClass('inner-menu--active');
          $(this).parent().parent().removeClass('main-header__order-item--active');
        });
      }
    }
  };

  this.MenuIcon = function() {
    var icons = $('.inner-menu__title-icon');

    icons.each(function(index, el) {
      var _this = $(this);

      $(this).parent().parent().find('[data-icon]').hover(
        function() {
          _this.find('use').attr('xlink:href', $(this).attr('data-icon'));
        },
        function() {
          _this.find('use').attr('xlink:href', '');
        }
      );
    });
  };

  this.Mask = function() {
    $('[data-input=phone]').each(function(index, el) {
      $(this).mask('+7(999)999-99-99', {
        completed: function() {
          $(this).removeClass('input-error');
        }
      });
    });
  };

  // Add more btn
  this.AddMore = function() {
    var btn = $('[data-hide=btn]');
    var block = $('[data-hide=wrap]');

    btn.on('click', function(event) {
      event.preventDefault();
      $(this).fadeOut('fast');
      $(this).parent().parent().find(block).slideDown('fast');
    });
  };

  // Slider init
  this.Slider = function() {
    var owl = $('[data-slider=mobile]');
    var paramsDefault = {
      nav: false,
      margin: 20,
      items: 1,
      dots: true,
      center: true
    };

    owl.each(function(index, el) {
      var params = {};

      for (var key in paramsDefault) {
        params[key] = paramsDefault[key];
      }

      if ($(this).attr('data-slider-nav')) {
        params.dots = $.parseJSON($(this).attr('data-slider-nav'));
      }

      if ($(this).attr('data-slider-dots')) {
        params.dotClass = $(this).attr('data-slider-dots');
      }

      if ($(this).attr('data-slider-autoWidth')) {
        params.autoWidth = true;
      }

      if ($(window).width() < desktopWIdth) {
        $(this).owlCarousel(params);
      } else {
        if ($(this).data('owlCarousel')) {
          $(this).trigger('destroy.owl.carousel');
          $(this).html($(this).find('.owl-stage-outer').html()).removeClass('owl-loaded');
        }
      }

      var params = {};
    });
  };

  // Scrollbar
  this.Scrollbar = function() {
    var items = $('[data-scrollbar=true]');
    items.perfectScrollbar();
  }

  // Cities
  this.Cities = function() {
    var btnPlace = $('.main-header__place-link');
    btnPlace.on('click', function(event) {
      event.preventDefault();
      _this.Overlay($('.cities'));
    });


    var btnMap = $('.order-card__info-btn');
    btnMap.on('click', function(event) {
      event.preventDefault();
      _this.Overlay($('.order__map'));
    });
  }

  // Autocomplete
  this.Autocomplete = function(status) {
    var availableTags = [
      'ActionScript',
      'AppleScript',
      'Asp',
      'BASIC',
      'C',
      'C++',
      'Clojure',
      'COBOL',
      'ColdFusion',
      'Erlang',
      'Fortran',
      'Groovy',
      'Haskell',
      'Java',
      'JavaScript',
      'Lisp',
      'Perl',
      'PHP',
      'Python',
      'Ruby',
      'Scala',
      'Scheme'
    ];
    var termTemplate = '<span class=\"ui-autocomplete-term\">%s</span>';
    $('[data-autocomplete=search]').autocomplete({
      source: availableTags,
      open: function(e,ui) {
        var acData = $(this).data('ui-autocomplete');
        acData
        .menu
        .element
        .find('div')
        .each(function () {
            var me = $(this);
            var keywords = acData.term.split(' ').join('|');
            me.html(me.text().replace(new RegExp('(' + keywords + ')', 'gi'), '<b>$1</b>'));
         });
      }
    });

    $('[data-autocomplete=multiple]').chosen({
      width: "100%",
      no_results_text: "Нет резулятатов для",
      placeholder_text_multiple: "Напишите название или выберите его из списка"
    });

    $('[data-autocomplete=single]').chosen({
      width: "100%",
      no_results_text: "Нет резулятатов для",
      placeholder_text_single: "Напишите название или выберите его из списка"
    });
  }

  // Overlay
  this.Overlay = function(container) {
    if (!!container) {
      overlay.fadeIn('fast');
      container.fadeIn('fast');
      container.attr('data-action', 'modal');

      overlay.on('click', function(event) {
        event.preventDefault();
        _this.Overlay(false);
      });
    } else {
      overlay.fadeOut('fast');

      if ($('[data-action=modal]')) {
        $('[data-action=modal]').fadeOut('fast');
      };

      overlay.off();
    }

    $('body').toggleClass('menu-open', !!container);
  }

  // Next Step
  this.NextStep = function(status) {
    var steps = [
      '.questionnaire-setting__step-1',
      '.questionnaire-setting__step-2',
      '.questionnaire-setting__step-3',
      '.questionnaire-setting__step-4'
    ];

    function checkDataBlock(item) {
      if ($(window).width() < desktopWIdth) {
        if (item) {
          $('.questionnaire-data').hide();
        } else {
          $('.questionnaire-data').show();
        }
      }
    }

    function nextStep(item) {
      $(steps[item]).hide();
      $(steps[item + 1]).css("display", "flex").show();

      if ($(window).width() < desktopWIdth) {
        $(window).scrollTop(0)
      }
      checkDataBlock(true);
    }

    function prevStep(item) {
      $(steps[item]).hide();
      $(steps[item - 1]).css("display", "flex").show();
      checkDataBlock(item - 1);
    }

    $('[class^=questionnaire-setting__step]').each(function(index, el) {
      var btnNext = $(this).find('.questionnaire-setting__btn[data-step]');
      var btnPrev = $(this).find('[data-step=back]');

      switch (btnNext.attr('data-step')) {
        case '1':
          btnNext.on('click', function(event) {
            event.preventDefault();
            if (!$('#questionnaire-phone').val()) {
              $('#questionnaire-phone').addClass('input--error')
            } else {
              nextStep(index);
            }
          });
          break;

        case '2':
          btnNext.on('click', function(event) {
            nextStep(index);
          });
          break;

        case '3':
          btnNext.on('click', function(event) {
            nextStep(index);
          });
          break;

        case 'publish':

          break;

        default:
          console.log('step-false');
      }

      btnPrev.on('click', function(event) {
        event.preventDefault();
        prevStep(index);
      });
    });
  };

  this.Datepicker = function() {
    var params = {
      inline: true,
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      dayNamesMin: ['вс','пн','вт','ср','чт','пт','сб'],
      firstDay: 1,
      stepMonths: 1,
      showOtherMonths: true,
      nextText: '<svg aria-hidden=\"true\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#next\"></use></svg>',
      prevText: '<svg aria-hidden=\"true\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#next\"></use></svg>',
      currentText: 'Сегодня',
      showButtonPanel: true,
      hideIfNoPrevNext: false,
      selectOtherMonths: false
    };

    params.numberOfMonths = $(window).width() < desktopWIdth ? 1 : 2;
    $('.questionnaire-setting__datapicker').datepicker(params);
  };

  this.Catalog = function() {
    $('.catalog-item__phone-btn').each(function(index, el) {
      $(this).on('click', function(event) {
        event.preventDefault();
        $(this).parent().find('.catalog-item__phone-number').removeClass('catalog-item__phone-number--hide');
        $(this).addClass('catalog-item__phone-btn--hide');
      });
    });

    $('[data-slide=btn]').each(function(index, el) {
      var title = $(this).html(),
          titleHide = $(this).attr('data-title'),
          wrap = $(this).parent().parent().find('[data-slide=wrap]');

      $(this).on('click', function(event) {
        event.preventDefault();
        if ($(this).html() == titleHide) {
          $(this).html(title);
          wrap.slideUp('fast');
        } else {
          $(this).html(titleHide);
          wrap.slideDown('fast');
        }
      });
    });

    $('[data-catalog=slider]').each(function(index, el) {
      $(this).owlCarousel({
        nav: false,
        items: 1,
        dots: true,
        center: true
      })
    });

    $('[data-more=btn]').each(function(index, el) {
      $(this).on('click', function(event) {
        event.preventDefault();
        $(this).parent().find('[data-more=wrap]').slideDown(400);
        $(this).fadeOut('fast');
      });
    });

    $('.catalog-filter__slide > h3').each(function(index, el) {
      var parent = $(this).parent();
      $(this).on('click', function(event) {
        event.preventDefault();
        if (parent.hasClass('catalog-filter__slide--hide')) {
          parent.find('div').slideDown(400);
        } else {
          parent.find('div').slideUp(400);
        }

        parent.toggleClass('catalog-filter__slide--hide');
      });
    });

    $('[data-list=type] a').each(function(index, el) {
      $(this).on('click', function(event) {
        event.preventDefault();
        if (!$(this).hasClass('catalog-filter__link--active')) {
          $(this).addClass('catalog-filter__link--active');
          $(this).append('<button type="button">Закрыть</button>');
        } else {
          event.preventDefault();
          if (event.target == $(this).find('button')[0]) {
            $(this).removeClass('catalog-filter__link--active');
            $(this).find('button')[0].remove();
          }
        }
      });
    });

    $('.catalog-item__list').each(function(index, el) {
      var list = $(this),
          listHide = list.siblings('[data-slide=wrap]');

      $(this).find('li').each(function(index, el) {
        if ($(window).width() < desktopWIdth) {
          if (index > 2) {
            listHide.append(el);
          }
        } else {
          if (index > 8) {
            listHide.append(el);
          }
        }
      });
    });

    $('[data-show=fileter]').click(function(event) {
      event.preventDefault();
      $('.catalog__wrap').addClass('catalog__wrap--active');
    });

    $('.catalog__wrap-btn').click(function(event) {
      event.preventDefault();
      $('.catalog__wrap').removeClass('catalog__wrap--active');
    });

    var scroll = $(window).scrollTop();
    $(window).scroll(function(event) {
      if (scroll != $(window).scrollTop()) {
        $('.catalog__feedback').addClass('catalog__feedback--active');
      }
    });
  };

  this.Order = function() {
    $('a.responses-item__content').each(function(index, el) {
      $(this).on('click', function(event) {
        event.preventDefault();
        var parent = $(this).parent();

        event.preventDefault();
        if (parent.hasClass('responses-item--active')) {
          parent.removeClass('responses-item--active');
          $(this).siblings().slideUp('fast');
        } else {
          parent.addClass('responses-item--active');
          $(this).siblings().slideDown('fast');
        }
      });
    });
  }

  console.log('App init');
}

// Youtube
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('head')[0];
firstScriptTag.parentNode.appendChild(tag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('features__video', {
    videoId: 'aqqYGd4RtRA',
  });
}

$('a.features__more-title').on('click', function(event) {
  event.preventDefault();
  $('.features__wrap').addClass('features__wrap--active');
  player.playVideo();
});

$('.features [data-video=close]').on('click', function(event) {
  event.preventDefault();
  $('.features__wrap').removeClass('features__wrap--active');
  player.stopVideo();
});
