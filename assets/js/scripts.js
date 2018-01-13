(function($) {

	"use strict";

	var win = $(window),
		ww = window.innerWidth,
		wh = window.innerHeight;

	/** wait for window load */
	win.on('load', function() {
		hero_heights();
		image_bg();

		$('body').waitForImages({
			finished: function() {
				setTimeout(function() {
					$('#site-loading').addClass('hide');
				}, 1000);
			},
			waitForAll: true
		});
	});

	/** resize */
	win.on('resize', function() {
		ww = window.innerWidth;
		wh = window.innerHeight;

		hero_heights();
		toggle_nav(false);
	});


	/** hero heights */
	function hero_heights() {
		$('.hero').each(function() {
			var $this = $(this),
				hh = wh - $('#site-header').height();

			$this.css('position', 'relative');

			if ($this.hasClass('small')) {
				$this.css('height', (hh * 0.7) + 'px');
			} else if ($this.hasClass('medium')) {
				$this.css('height', (hh * 0.8) + 'px');
			} else if ($this.hasClass('full')) {
				$this.css('height', wh + 'px');
			} else {
				$this.css('height', hh + 'px');
			}
		});
	}


	/** nav */
	$('#menu li:has(ul)').find('a:first').addClass('parent');
	$('#menu li:has(ul)').children('ul').hide();
	$('#menu li:has(ul)').find('a').on('click', function() {

		var parent = $(this).parent(),
			submenu = $(this).next('ul');

		if (submenu.is(':visible')) {
			$(this).parent().find('ul').slideUp(300);
		}

		if (submenu.is(':hidden')) {
			parent.siblings().find('ul').slideUp(300);
			parent.find('ul:first').slideDown(300);
		}

		if (parent.find('ul').children().length == 0) {
			return true;
		} else {
			return false;
		}

	});

	$('#burger').on('click', function() {
		if (!$('#site-nav').hasClass('open')) {
			toggle_nav(true);
		} else {
			toggle_nav(false);
		}
	});

	$('#nav-close, #main-overlay').on('click', function() {
		toggle_nav(false);
	});

	function toggle_nav(bool) {
		if (bool === true) {
			$('#site-nav, #site-main, #main-overlay').addClass('nav-open');
		} else {
			$('#site-nav, #site-main, #main-overlay').removeClass('nav-open');

			setTimeout(function() {
				$('#menu li.has-submenu a').next('.submenu').slideUp(300);
			}, 500);
		}
	}


	/** background images */
	function image_bg() {
		$('[data-bg]').each(function() {
			var image = $(this).data('bg');

			$(this).css({
				backgroundImage: 'url(' + image + ')',
				backgroundSize: 'cover',
				backgroundPosition: 'center center'
			});
		});
	}


	/** Ajax contact form */
	$('#contact-form').on('submit', function() {
		var action = $(this).attr('action');

		$('#contact-messages').slideUp(500, function() {

			$('#contact-messages').hide();
			$('#submit').attr('disabled', 'disabled');

			$.post(action, {
				name: $('#name').val(),
				email: $('#email').val(),
				comment: $('#comment').val()
			}, function(data) {
				document.getElementById('contact-messages').innerHTML = data;
				$('#contact-messages').slideDown(500);
				$('#submit').removeAttr('disabled');
				if (data.match('success') != null)
					$('#contact-form').slideUp(500);
			});

		});

		return false;
	});

})(jQuery);
