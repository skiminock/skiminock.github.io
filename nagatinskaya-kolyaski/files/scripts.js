$("img.lazy").lazyload();


$(function(){
    $('body').tooltip({
        selector: "[rel=tooltip]",
        placement: "bottom" 
    });
});

$("body").on('click', '.html5threed', function(event) {

    $(this).parents('.product-row').find(".picture").find(".fancybox").hide();
    $(this).parents('.product-row').find("#block_id").html('<iframe id="iframe_3d" src="' + $(this).data('src') + '" width="390" height="400" style="border: none;"></iframe>');

    $("#block_id").show();

    return false;
});


$(function(){
    $('body').tooltip({
        selector: "[rel=popover]",
        placement: "top" 
    });
});

$('.read-raty').each(function() {
    $(this).raty({ 
    readOnly: $(this).attr('data-readOnly'),
    score: $(this).attr('data-score'),
    starHalf : '/img/star-half.png',
    starOff : '/img/star-off.png',
    starOn  : '/img/star-on.png',
    click: function(score, evt) {
        $("#Reviews_rate").val(score);
     }
  });
});

$(".btn.btn-small.bron.disabled").click(function() {
    return false;
});

var $container = $('#container');
// init
$container.isotope({
  // options
  itemSelector: '.item',
  layoutMode: 'fitRows'

});

$container.isotope({ filter: '.popular'});

$('.right-content').on('click','.pagination li a', function(){
    setTimeout(function(){
      $('body, html').animate({
          scrollTop: 160
      }, 600);
    }, 500);
});


$("a[data-filter]").click(function(e) {
    e.preventDefault();
    $("a[data-filter]").removeClass('btn-danger');
    $(this).addClass('btn-danger');
    $container.isotope({ filter: $(this).attr('data-filter')});
});

function fastorder() {
    $("#fast-order").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "ajax",
            method: 'post',
            url: '/fast/',
            data: $("#fast-order").serialize(),
            success: function(data){
                $("#fast-order").parents('.alert').removeClass('alert-info').addClass('alert-success');
                
                $("#fast-order").parents('.alert').find('.row-fluid').html("<b class='fast-order-title'>Благодарим Вас за заказ, ожидайте звонка менеджера.</b>");

            }
        });
    });
}

fastorder();

function addViewport(port) {
    $('meta [name=viewport]').remove();
    $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale='+port+'">');
}

if(window.moved !== undefined) {
    $('#moved').modal('show');
    window.history.replaceState('', '', '/profile/price/');
}

var viewport;
function getViewport()
{
    if(device.mobile() && device.portrait()) {
        viewport = '0.3';
    } else if(device.mobile() && device.landscape()) {
        viewport = '0.5';
    } else if(device.tablet() && device.portrait()) {
        viewport = '0.6';
    } else if(device.tablet() && device.landscape()) {
        viewport = '0.9';
    } else {
        viewport = '1';
    }
    addViewport(viewport);
}

getViewport();

window.addEventListener("orientationchange", function() {
    getViewport();
}, false);

var slider = function(object) {
    var $frame  = $(object);
    var $wrap   = $frame.parent();

    var horizontal = ($frame.attr('data-horizontal') == 1)?1:0;
    var scrollBy = ($frame.attr('data-scrollBy') == 1)?1:0;
    var mouseDragging = ($frame.attr('data-mouseDragging') == 1)?1:0;
    var pagesBar = ($frame.attr('data-pagesBar') == 1)?$wrap.find('.pages'):false;
    var startAt = ($frame.attr('data-startAt'))?$frame.attr('data-startAt'):null;
    var cycleBy = ($frame.attr('data-cycleBy'))?'pages':false;

    // Call Sly on frame
    $frame.sly({
        horizontal: horizontal,
        itemNav: 'basic',
        smart: 1,
        activateOn: 'click',
        mouseDragging: mouseDragging,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: startAt,
        scrollBy: scrollBy,
        activatePageOn: 'click',
        pagesBar: pagesBar,
        speed: 300,
        //elasticBounds: 1,
        //easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 0,

        cycleBy: cycleBy,
        cycleInterval: 3000,
        pauseOnHover: 1,
        startPaused: 0,

        // Buttons
        prevPage: $($wrap.find('.car-prev')),
        nextPage: $($wrap.find('.car-next')),
    });
}

function sliders()
{
    $('[data-carousel="1"]').each(function(){ 
        slider(this);
    });
}

// Обратный звонок
$('#send-callback').submit(function () {
    $.ajax({
        type: "POST",
        url: "/callback/",
        dataType: "html", 
        data: $('#send-callback').serialize(),
        success: function (data) {
            data = JSON.parse(data);

            $('#callback').find('.modal-body').html(data['message']);

            $('#callback').find('button').remove();

            setTimeout(function(){
                $('#callback').modal('hide');
            }, 5000);

        }
    });
    return false;
});


// Настройка SEO ссылок
function seo_link()
{
    $("a[data-link]").each(function(event){
      $(this).attr('href', $(this).attr('data-link')).removeAttr('data-link');
    });
}

// Смена главной картинки из выбранной доп картинки
function thumbs_more()
{
    $('.thumbs-more .thumb a').click(function(e) {
        e.preventDefault();
        $wrap = $(this).parents('.product-row');

        $wrap.find('#block_id').hide();
        $wrap.find('.picture .fancybox').show();

        $wrap.find('.mainPreviewImg').attr('src', $(this).attr('data-src-image'));
        $wrap.find('.mainPreviewImg').parent().attr('href', $(this).attr('data-origin-image'));
    });
}

// Смена главной картинки из выбранной доп картинки
function thumbs_colors()
{
    $('.thumbs-colors .thumb a').click(function(e) {
        e.preventDefault();

        var id = $(this).parent().attr('data-color-id');

        $wrap = $(this).parents('.product-row');
        $wrap.find('.mainPreviewImg').attr('src', $(this).parent().attr('data-color-picture'));
        $wrap.find('.mainPreviewImg').parent().attr('href', $(this).parent().attr('data-origin-image'));
        $wrap.find('.prices').text($(this).parent().attr('data-color-price'));
        $wrap.find('.add-to-cart').removeAttr('data-variants-require').attr('data-variant-id', id);

        $wrap.find('.variant_id').val(id);

        $wrap.find('.variants-list li').each(function() {
            $(this).removeClass('active');
            if($(this).attr('data-color-id') == id){
                $(this).addClass('active');

                $wrap.find('.variants-list > a').text($(this).text());
            }
        })
    });
}

// Смена главной картинки из выбранного списка названий картинки
function thumbs_colors_list()
{
    $('.variants-list ul a').click(function(e) {
        e.preventDefault();

        var id = $(this).parent().attr('data-color-id');

        $wrap = $(this).parents('.product-row');
        $wrap.find('.variants-list > a').text($(this).parent().text());
        $wrap.find('.mainPreviewImg').attr('src', $(this).parent().attr('data-color-picture'));
        $wrap.find('.mainPreviewImg').parent().attr('href', $(this).parent().attr('data-color-picture'));
        $wrap.find('.prices').text($(this).parent().attr('data-color-price'));
        $wrap.find('.add-to-cart').removeAttr('data-variants-require').attr('data-variant-id', id);

        $wrap.find('.variant_id').val(id);

        // Удаляем active класс в списке
        $wrap.find('.variants-list li').each(function() {
            $(this).removeClass('active');
        });

        // Выделяем выбранный
        $(this).parent().addClass('active')

        // Выделяем выбранный цвет миниатюры
        $wrap.find('.thumbs-colors .thumb').each(function() {
            $(this).removeClass('active');
            if($(this).attr('data-color-id') == id){
                $(this).addClass('active');
                var item = $(this).prev().data('color-id');
                $wrap.find('.thumbs-colors').sly('toCenter', item);
            }
        });

    });
}

// Обновление корзины
function cartUpdate()
{
    $('#cartContainer').load('/cart/mini/').fadeOut().fadeIn();
}

function cartIndexUpdate()
{
    $.ajax({
        type: "POST",
        url: "/cart/?ajax=1",
        dataType: "html", 
        data: $('#busketForm').serialize(),
        success: function (data) {
            $('.content').html(data);
        }
    });
}

// + -
function numbered()
{
        $('body').on('click','.numbered > .clickable', function(ev){
        ev.preventDefault();
        var number = parseInt($(this).siblings('input[type="text"]').val(), 10);
        if (isNaN(number)) {
            number = 1;
        }
        if ($(this).hasClass("add-one")) {
            var num = number + 1;
        } else {
            number = number < 2 ? 2 : number;
            var num = number - 1;
        }

        $(this).siblings('input[type="text"]').val(num);

        if ($(this).hasClass('update')) {
            cartIndexUpdate();
        }
    });
}

$('body').on('change','.form-order .numbered input', function(ev){
    cartIndexUpdate();
});

numbered();
sliders();
seo_link();
thumbs_more();

function ajax() {
    var ajax;
    if(document.location.href.indexOf('?') == -1) {
        ajax = "?ajax=1";
    } else {
        ajax = "&ajax=1";
    }

    return ajax;
}

// Отправка запроса с данными в корзину
function Addtocart(id, variant_id, qty) {
    return $.ajax({
        type: "POST",
        url: "/cart/add/",
        data: {id: id, variant_id:variant_id, qty:qty},
        success: function(){
            return true;
        },
        error: function() {
            return false;
        }
    });
}


$('body').on('click','.show_variants', function(e){

    e.preventDefault();

    var th = $(this);
    th.addClass('openned');
    th.text('Скрыть');

    $('[data-parent-id].showing').each(function(){ 
        $(this).removeClass('showing').addClass('hidden');
    });

    $('[data-parent-id="'+$(this).data('product-id')+'"]').each(function(){ 
        $(this).removeClass('hidden').addClass('showing');
    });

    setTimeout(function(){
      $('body, html').animate({
          scrollTop: th.offset().top - 150
      }, 600);
    }, 400);
    
}); 

$('body').on('click','.openned', function(e) {

    var th = $(this);
    th.addClass('show_variants').removeClass('openned');
    th.text('Показать');

    $('[data-parent-id="'+$(this).data('product-id')+'"]').each(function(){ 
        $(this).removeClass('showing').addClass('hidden');
    });

});

// Добавить товар в корзину
$('body').on('click','.add-to-cart', function(e){
    e.preventDefault();
    $wrap = $(this).parents('.product-row');
    if($(this).attr('data-variants-require') == 1)
    {
        $wrap.find('.variants-list').addClass('open');

        return false;
    }
    var qty = $wrap.find('.numbered input').val();
    var result = Addtocart($(this).attr('data-product-id'), $(this).attr('data-variant-id'), qty);
    if(result) {
        if($(this).hasClass("btn btn-success")) {
            $(this).removeClass("btn btn-success").addClass("btn btn-danger");
        }
        $(this).removeClass('add-to-cart').html('<i class="fa fa-shopping-cart"></i> Товар в корзине').attr('href', '/cart/');
        
        cartUpdate();
    }
}); 

// Добавить товар в корзину
$('body').on('click','.addtocart', function(e){
    e.preventDefault();
    var result = Addtocart($(this).attr('data-product-id'), $(this).attr('data-variant-id'), 1);
    if(result) {
        if($(this).data('type') == 1) {
            $(this).removeClass("addtocart").addClass("btn-success");
        }
        if($(this).data('type') == 2) {
            $(this).removeClass("addtocart");
            $(this).html('<i class="fa fa-shopping-cart"></i> В корзине');
        }
        $(this).attr('href', '/cart/');
        
        cartUpdate();
    }
}); 

function QuickviewPrev() {
    $('body').on('click','#quickview .prev', function(e){
        e.preventDefault();
        var ob = $('.quickview[data-product-id='+ $(this).attr('data-product-id') +']');
        var id = $(ob).parents('.item').prev().find('.quickview').attr('data-product-id');
        if(typeof id == 'undefined')
        {
            $(this).addClass('disabled');
        }
        $('#quickview .next').removeClass('disabled');
        Quickview(id);
    });
}

function QuickviewNext() {
    $('body').on('click','#quickview .next', function(e){
        e.preventDefault();
        var ob = $('.quickview[data-product-id='+ $(this).attr('data-product-id') +']');
        var id = $(ob).parents('.item').next().find('.quickview').attr('data-product-id');
        if(typeof id == 'undefined')
        {
            $(this).addClass('disabled');
        }
        $('#quickview .prev').removeClass('disabled');
        Quickview(id);
    });
}


// быстрый просмотр
function Quickview(id, variant) {
    $.ajax({
        type: "POST",
        url: "/quickview/",
        dataType: "html", 
        data: {id: id, variant_id: variant},
        success: function (data) {
            $('#quickview').html(data);
            sliders();
            seo_link();
            thumbs_more();
            numbered();
            thumbs_colors();
            thumbs_colors_list();
            fastorder();
            QuickviewPrev();
            QuickviewNext();
            
            $('#quickview').modal('show');
        }
    });
}

// быстрый просмотр
function Quickvariant(id) {
    $.ajax({
        type: "POST",
        url: "/quickvariant/",
        dataType: "html", 
        data: {id: id},
        success: function (data) {
            $('#quickview').html(data);
            fastorder();
            
            $('#quickview').modal('show');
        }
    });
}

// быстрый просмотр вариантов
$('body').on('click','.quickvariant', function(e){
    e.preventDefault();
    Quickvariant($(this).attr('data-product-id'))
});


// быстрый просмотр
$('body').on('click','.quickview', function(e){
    e.preventDefault();
    Quickview($(this).attr('data-product-id'), $(this).attr('data-variant-id'))
});

// Сравнение товаров
$('body').parent().on('click','.compare', function(e){
    e.preventDefault();
    var id = $(this).attr('data-product-id');
    var btn = $(this);

    $.ajax({
        type: "POST",
        url: "/compare/add/",
        data: {id: id},
        success: function(data){
            if($(btn).data("type") == 1) {
                $(btn).removeClass("compare").addClass("btn-danger");
            }
            if($(btn).data("type") == 2) {
                $(btn).removeClass("compare").addClass("btn-danger");
            }

            $(btn).attr('href', '/compare/');

            $('.compare-count').text(data);
        },
        error: function() {
            return false;
        }
    });
});  

// Оставить отзыв
$('#send-reviews').submit(function () {
    $.ajax({
        type: "POST",
        url: "/reviews/",
        dataType: "html", 
        data: $('#send-reviews').serialize(),
        success: function (data) {
            data = JSON.parse(data);
            $('#send-reviews .span12').html(data['message']);

            $('#send-reviews .btn').addClass('disabled');

            setTimeout(function(){
                $('#add-review').modal('hide');
            }, 5000);
        }
    });
    return false;
});

// Ставим куки
function setCookie(name, value, expires, path, domain, secure) {
  document.cookie = name + "=" + escape(value) +
    ((expires) ? "; expires=" + expires : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

$("body").on('click', '.edit-price', function(e) {
    $(this).html('<input type="text" class="span6" data-color-id="'+$(this).attr('data-color-id')+'" name="" value="'+$(this).attr($(this).attr('data-type-price'))+'"><a class="update-price" href="#">ок</a>');
    $(this).removeClass('edit-price');
});

$("body").on('click', '.update-price', function(e) {
    e.preventDefault();
    var id = $(this).parent().attr('data-color-id');
    var btn = $(this);

    $.ajax({
      type: "ajax",
      data: {id:id, type:$(btn).parent().attr('data-type-price'), price:$(btn).prev().val()},
      url: '/admin/store/productvariants/update/?id='+$(this).parent().attr('data-color-id'),
      success: function(data){
            $(btn).parent().addClass('edit-price');
            $(btn).parent().attr($(btn).parent().attr('data-type-price'), $(btn).prev().val());
            $(btn).parent().html($(btn).prev().val() + ' <i class="fa fa-rub"></i>');
        }
    });
});

$("body").on('click', '.edit-value', function(e) {
    $(this).html('<input type="text" class="span12" data-product-id="'+$(this).attr('data-product-id')+'" name="" value="'+$(this).text()+'"><a class="update-value" href="#">ок</a>');
    $(this).removeClass('edit-value');
});

$("body").on('click', '.update-value', function(e) {
    e.preventDefault();
    var id = $(this).parent().attr('data-product-id');
    var btn = $(this);

    $.ajax({
      type: "ajax",
      data: {id:id, value:$(btn).prev().val()},
      url: '/admin/store/product/updating/?id='+id,
      success: function(data){
            $(btn).parent().addClass('edit-value');
            $('td[data-product-id='+id+']').html($(btn).prev().val());
        }
    });
});

// Смена типа шаблона
$(".right-content, .one-content").on('click', '[data-grid-type]', function(e) {
    e.preventDefault();
  //  alert(document.location.href + ajax()); return false;
    setCookie('gridType', $(this).attr('data-grid-type'));
    $.ajax({
      type: "ajax",
      url: document.location.href + ajax(),
      success: function(data){
            $(".right-content, .one-content").html(data);
        }
    });
});
(function() {
  (function($) {
    return $.fn.fixedHeader = function(options) {
      var config;
      config = {
        topOffset: 40,
        bgColor: "#EEEEEE"
      };
      if (options) {
        $.extend(config, options);
      }
      return this.each(function() {
        var $head, $win, headTop, isFixed, o, processScroll, ww;
        processScroll = function() {
          var headTop, i, isFixed, scrollTop, t;
          if (!o.is(":visible")) {
            return;
          }
          i = void 0;
          scrollTop = $win.scrollTop();
          t = $head.length && $head.offset().top - config.topOffset;
          if (!isFixed && headTop !== t) {
            headTop = t;
          }
          if (scrollTop >= headTop && !isFixed) {
            isFixed = 1;
          } else {
            if (scrollTop <= headTop && isFixed) {
              isFixed = 0;
            }
          }
          if (isFixed) {
            return $("thead.header-copy", o).removeClass("hide");
          } else {
            return $("thead.header-copy", o).addClass("hide");
          }
        };
        o = $(this);
        $win = $(window);
        $head = $("thead.header", o);
        isFixed = 0;
        headTop = $head.length && $head.offset().top - config.topOffset;
        $win.on("scroll", processScroll);
        $head.on("click", function() {
          if (!isFixed) {
            return setTimeout((function() {
              return $win.scrollTop($win.scrollTop() - 47);
            }), 10);
          }
        });
        $head.clone().removeClass("header").addClass("header-copy header-fixed").appendTo(o);
        ww = [];
        o.find("thead.header > tr:first > th").each(function(i, h) {
          return ww.push($(h).width());
        });
        $.each(ww, function(i, w) {
          return o.find("thead.header > tr > th:eq(" + i + "), thead.header-copy > tr > th:eq(" + i + ")").css({
            width: w
          });
        });
        o.find("thead.header-copy").css({
          margin: "0 auto",
          width: o.width(),
          "background-color": config.bgColor
        });
        return processScroll();
      });
    };
  })(jQuery);

}).call(this);

$(document).ready(function(){
  $('.table-fixed-header').fixedHeader();

  $("#back-to-top").hide();
  $(function () {
      $(window).scroll(function () {
          if ($(this).scrollTop() > 600) {
              $('#back-to-top').fadeIn();
          } else {
              $('#back-to-top').fadeOut();
          }
      });

      // scroll body to 0px on click
      $('#back-to-top a').click(function () {
          $('body,html').animate({
              scrollTop: 0
          }, 800);
          return false;
      });
  });
  
});

$('#mainNavigation').on('touchstart', 'a.parent', function (e) {
    e.preventDefault();
    // Убираем активные
    $('#mainNavigation a[link]').each(function() {
        $(this).addClass('parent').parent().removeClass('hover');
    });
    // Делаем выделеную активной
    $(this).removeClass('parent').parent().addClass('hover');
});

$('#mainNavigation').on('touchstart', '#mainNavigation > li > ul > li > a', function () {

}).on('touchmove', '.items', function () {
    $(this).off('touchend');
});

var owls_block = function(object) {
    var loop = ($(object).data('loop'))?$(object).data('loop'):0;
    var autoplay = ($(object).data('autoplay'))?$(object).data('autoplay'):0;
    var items = ($(object).data('items'))?$(object).data('items'):undefined;
    var nav = ($(object).data('nav'))?$(object).data('nav'):0;
    var top = ($(object).data('top'))?$(object).data('top'):0;
    var dots = ($(object).data('dots'))?$(object).data('dots'):0;
    var stagePadding = ($(object).data('padding'))?$(object).data('padding'):0;
    var margin = ($(object).data('margin'))?$(object).data('margin'):0;
    var responsive = ($(object).data('once'))?{0:{items:1}}:{};

    $(object).owlCarousel({
        loop:loop,
        autoplay:autoplay,
        items:items,
        nav:nav,
        margin: margin,
        top:top,
        lazyLoad: true,
        dots:dots,
        stagePadding: stagePadding,
        responsive:responsive
    });
}
function owls() {
    $('[data-toggle="owl-carousel"]').each(function(){ 
       owls_block(this);
    });
};

owls();