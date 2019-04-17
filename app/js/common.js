$(document).ready(function() {
	initHeaderPopups();
	initHeaderDD();
	initClearBtn();
	initSaleSlider();
	initFiltersFunctional();
	initSectionStoneMovements();

	function initHeaderPopups() {
		var topHeader = $('.top-header'),
			wrapper = topHeader.find('.header-popups'),
			popupSubstrate = topHeader.find('.header-popups__popup-substrate'),
			popup = popupSubstrate.find('.header-popup'),
			btn = wrapper.find('.header-popups__btn'),
			closeBtn = popup.find('.header-popup__close-btn');

		btn.on('click', function(evt) {
			evt.preventDefault();
			popupSubstrate.addClass('opened');
			popupSubstrate.animate({
				opacity: 1
			},500);

			popup.css({
				display: 'block'
			}).animate({
				opacity: 1
			},500);
		});

		popupSubstrate.on('click', function(evt) {
			if ($(evt.target).is(popupSubstrate)) {
				popupSubstrate.animate({
					opacity: 0
				},500);

				setTimeout(function () {
					popupSubstrate.removeClass('opened');
					popup.css({
							display: 'none'
						});
				}, 500);
			}
		});

		closeBtn.on('click', function(evt) {
			evt.preventDefault();
			popupSubstrate.animate({
				opacity: 0
			},500);

			setTimeout(function () {
				popupSubstrate.removeClass('opened');
				popup.css({
					display: 'none'
				});
			}, 500);
		});
	}
	function initHeaderDD() {
		var nav      = $('.navigation'),
			navDD    = nav.find('.navigation__drop-down');

		navDD.each(function(i,el) {
			var btn        = $(el).find('.navigation__drop-down-btn'),
				list       = $(el).find('.navigation__drop-down-list'),
				listHeight = list.outerHeight(),
				openDD     = function() {
					btn.addClass('opened');
					list.css({
						clip: 'rect(0, 9999px, '+listHeight+'px, 0)'
					});
				},
				closeDD    = function() {
					btn.removeClass('opened');
					list.css({
						clip: 'rect(0, 9999px, 0, 0)'
					});
				};

			btn.on('mouseenter', function(){
				openDD();
			});
			btn.on('mouseleave', function(){
				closeDD();
			});
			list.on('mouseenter', function(){
				openDD();
			});
			list.on('mouseleave', function(){
				closeDD();
			});
		});
	}
	function initClearBtn() {
		var form = $('.header-search'),
			searchInput = form.find('.header-search__input'),
			clearBtn = form.find('.header-search__btn_reset');

		searchInput.on('keyup', function() {
			if(searchInput.val()!=='') {
				clearBtn.addClass('show');
			} else {
				clearBtn.removeClass('show');
			}
		});

		clearBtn.on('click', function() {
			clearBtn.removeClass('show');
		});
	}
	function initSaleSlider() {
		var wrapper = $('.sale__slider-wrapper'),
			slider = wrapper.find('.sale__slider'),
			controls = wrapper.find('.sale__slider-controls'),
			lArr = controls.find('.sale__slider-arrow_left'),
			rArr = controls.find('.sale__slider-arrow_right');

		slider.slick({
			appendArrows: controls,
			prevArrow: lArr,
			nextArrow: rArr
		});
	}
	function initFiltersFunctional() {
		var form        = $('.filters'),
			selectsList = form.find('.filters__selects-list'),
			selects     = selectsList.find('.filters__select'),
			closeAll = function(count) {
				selects.each(function(c,element) {
					if(count!==c) {
						$(element).find('.filters__select-btn').removeClass('opened');
						$(element).find('.filters__option-list').css({
							clip: 'rect(0, 9999px, 0, 0)'
						});
					}
				});
			};

		selects.each(function(i,el){
			var btn            = $(el).find('.filters__select-btn'),
				list           = $(el).find('.filters__option-list'),
				listHeight     = list.outerHeight(),
				options        = list.find('.filters__option'),
				input          = $(el).find('.filters__select-input'),
				openSelectList = function() {
					btn.addClass('opened');
					list.css({
						clip: 'rect(0, 9999px, '+listHeight+'px, 0)'
					});
				},
				closeSelectList = function() {
					btn.removeClass('opened');
					list.css({
						clip: 'rect(0, 9999px, 0, 0)'
					});
				};

			btn.on('click', function(evt) {
				evt.preventDefault();
				closeAll(i);
				if (btn.hasClass('opened')) {
					closeSelectList();
				} else {
					openSelectList();
				}
			});

			options.each(function(i,option){
				$(option).on('click',function(evt){
					evt.preventDefault();
					input.val($(option).attr('data-value'));
					btn.text($(option).text());
					closeAll();
				});
			});
		});
	}
	function initSectionStoneMovements() {
		var hold           = $('.stone'),
			selects        = hold.find('.stone__select'),
			contentWrapper = hold.find('.stone__content-wrapper'),
			tabs           = contentWrapper.find('.stone__tabs-list').find('.stone__tab'),
			children       = contentWrapper.find('.stone__content').children(),
			orderBtn       = hold.find('.stone__order-btn'),
			openChild      = function(count) {
				children.each(function(i,el){
					if (count == i) {
						$(el).css({
							display: 'block'
						});
					} else {
						$(el).css({
							display: 'none'
						});
					}
				});
			},
			closeAllTabs   = function(count) {
				tabs.each(function(c,element) {
					if(count!==c) {
						$(element).removeClass('stone__tab_selected');
					}
				});
			},
			closeAll       = function(count) {
				selects.each(function(c,element) {
					if(count!==c) {
						$(element).find('.stone__select-btn').removeClass('opened');
						$(element).find('.stone__option-list').css({
							clip: 'rect(0, 9999px, 0, 0)'
						});
					}
				});
			};

		if (tabs.length == children.length) {
			openChild(0);
			tabs.each(function(i,el){
				$(el).on('click', function(){
					if (!$(el).hasClass('stone__tab_selected')) {
						closeAllTabs(i);
						openChild(i);
						$(el).addClass('stone__tab_selected');
					}
				});
			});
		}

		selects.each(function(i,el){
			var btn            = $(el).find('.stone__select-btn'),
				list           = $(el).find('.stone__option-list'),
				listHeight     = list.outerHeight(),
				options        = list.find('.stone__option'),
				input          = $(el).find('.stone__select-input'),
				openSelectList = function() {
					btn.addClass('opened');
					list.css({
						clip: 'rect(0, 9999px, '+listHeight+'px, 0)'
					});
				},
				closeSelectList = function() {
					btn.removeClass('opened');
					list.css({
						clip: 'rect(0, 9999px, 0, 0)'
					});
				};

			btn.on('click', function(evt) {
				evt.preventDefault();
				closeAll(i);
				if (btn.hasClass('opened')) {
					closeSelectList();
				} else {
					openSelectList();
				}
			});

			options.each(function(i,option){
				$(option).on('click',function(evt){
					evt.preventDefault();
					input.val($(option).attr('data-value'));
					btn.text($(option).text());
					closeAll();
				});
			});
		});

		orderBtn.on('click', function(evt) {
			evt.preventDefault();

			var topHeader      = $('.top-header'),
				popupSubstrate = topHeader.find('.header-popups__popup-substrate'),
				popup          = popupSubstrate.find('.header-popup');

			popupSubstrate.addClass('opened');
			popupSubstrate.animate({
				opacity: 1
			},500);

			popup.css({
				display: 'block'
			}).animate({
				opacity: 1
			},500);
		});
	}
});