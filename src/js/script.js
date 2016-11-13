jQuery(document).ready(function() {
  var app = new App();
  app.Menu();
  app.Range();
  app.Select();
  app.Tabs();
  app.Mask();
  app.Posted();
  app.AddMore();
  app.Hide();
  app.Scrollbar();
  app.Cities();
  app.Overlay();
  app.MenuAction();
  app.Autocomplete();
  app.NextStep();
  app.Datepicker();

  $(window).resize(function(event) {
    app.MenuAction();
    app.Slider();
    app.Posted();
  });

  $(window).resize();
  $(window).scroll();
});


function App() {
  console.log('App init');

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
        $(this).parent().find(block).fadeIn('fast');

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
          var value = +this.value;

          if (value > +info.attr('data-max')) {
            this.value = +info.attr('data-max')
          } else if (value < +info.attr('data-min')) {
            this.value = +info.attr('data-min')
          }

          slider.update({
              from: this.value
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
        menuHeight = 200,
        menuBtn = $('.main-header__menu-btn'),
        _this = this;

    this.fixed = function(status) {
      if ($(window).width() > desktopWIdth) {
        if (status) {
          $( 'body' ).css({
            'padding-top': '200px'
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
      $('.main-header__search-close').addClass('main-header__search-close--active');
    });

    $('.main-header__search').focusout(function() {
      menu.removeClass('main-header--input');
      $('.main-header__search-close').removeClass('main-header__search-close--active');
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
    var btn = $('.main-header__place-link');
    btn.on('click', function(event) {
      event.preventDefault();
      $('.cities').attr('data-action', 'modal');;
      $('.cities').fadeIn('fast');

      _this.Overlay(true);
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
    $('.main-header__search').autocomplete({
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
  }

  // Overlay
  this.Overlay = function(status) {
    if (status) {
      overlay.fadeIn('fast');
      $('body').addClass('menu-open')

      overlay.on('click', function(event) {
        event.preventDefault();
        _this.Overlay(false);
      });
    } else {
      overlay.fadeOut('fast');
      $('body').removeClass('menu-open');

      if ($('[data-action=modal]')) {
        $('[data-action=modal]').fadeOut('fast');
      };

      overlay.off();
    }
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
      $(window).scrollTop(0)
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
          btnNext.on('click', function(event) {
            location.pathname = 'questionnaire-complete.html'
          });
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

}

// Youtube
var tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('head')[0];
firstScriptTag.parentNode.appendChild(tag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('features__video', {
    height: '720',
    width: '1280',
    videoId: 'aqqYGd4RtRA',
  });
}

$('a.features__more-title').on('click', function(event) {
  event.preventDefault();
  $('.features__wrap').addClass('features__wrap--active');
  player.playVideo();
});

$('.features__btn').on('click', function(event) {
  event.preventDefault();
  $('.features__wrap').removeClass('features__wrap--active');
  player.stopVideo();
});
