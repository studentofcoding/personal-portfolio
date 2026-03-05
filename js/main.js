jQuery(document).ready(function ($) {


	/*
	 * Nav / Cycle Loader
	 */
	var doOnce = true;
	$('#nav').onePageNav({
		scrollSpeed: 350,
		//start cycle
		scrollChange: function (i) {
			if ($(i).attr('id') == 'trigger-cycle') {
				$('#cycle-loader').removeClass('hide');
				$('#cycle-loader').addClass('active');
				if (doOnce == true) {
					cycle();
					doOnce = false;
				}
			}
			else {
				$('#cycle-loader').addClass('hide');
			}
		}
	});
	// disable #cycle-loader if cycle is stopped
	$('#pager span').on('click', function (e) {
		$('#cycle-loader').addClass('disabled');
		setTimeout(function () {
			$('#cycle-loader').removeClass('active');
		}, 600);
	});
	// manage cycle-loader on nav click events
	$('#trigger-cycle').on('click', function (e) {
		$('#cycle-loader').removeClass('hide');
		$('#cycle-loader').addClass('active');
		if (doOnce == true) {
			cycle();
			doOnce = false;
		}
	});
	$('#nav > li').not('#trigger-cycle').on('click', function (e) {
		$('#cycle-loader').addClass('hide');
	});


	/*
	 * Work Cycle
	 */
	function cycle() {
		let index = 0;
		let $pager = $('#pager span');
		let $cycle = $('#cycle > a');
		let pagerTimer = setInterval(function () {
			index = (index < $pager.length - 1) ? index + 1 : 0;
			$cycle.removeClass('active').eq(index).addClass('active');
			$pager.removeClass('active').eq(index).addClass('active');
		}, 6000);
		$pager.click(function (e) {
			clearInterval(pagerTimer);
			if (!$(this).hasClass('active')) {
				index = $(this).index();
				$cycle.removeClass('active').eq(index).addClass('active');
				$pager.removeClass('active').eq(index).addClass('active');
			}
		});
	}


	/*
	 * Work Parallax
	 */
	$('#work').mousemove(function (e) {
		if (Modernizr.touch) return;
		// Get Cursor Coordinates
		let mouseX = e.pageX;
		let mouseY = e.pageY;
		// Loop through each element with the data attribute
		$('*[data-mouse-parallax]').each(function () {
			// Calculate mouse position minus the position of the center of each element
			let x = mouseX - $(this).offset().left - ($(this).width() / 2);
			let y = mouseY - $(this).offset().top - ($(this).height() / 2);
			// Get multiplier value from data attribute
			let factor = parseFloat($(this).data('mouse-parallax'));
			// Calculate transform values
			let newX = x * factor;
			let newY = y * factor;
			$(this).css({ 'transform': 'translate3d( ' + newX + 'px, ' + newY + 'px, 0 )' });
		});
	});


	/*
	 * Contact Form
	 */
	$('#trigger-contact').on('click', function (e) {
		e.preventDefault();
		$('#about > p').toggleClass('hide');
		$('#about > form').toggleClass('show');
	});
	$('#contact-form input, #contact-form textarea')
		.on('focus', function () {
			$(this).parent('label').addClass('focus');
		})
		.on('blur', function () {
			$(this).parent('label').removeClass('focus');
		})
		.on('change', function (e) {
			if ($(this).val().length > 0) {
				$(this).parent('label').addClass('not-empty');
			} else {
				$(this).parent('label').removeClass('not-empty');
			}
		});


	/*
	 * Loading
	 */
	$(window).load(function () {
		$('#ink').get(0).play();
		$('#loader').removeClass('loading');
	});

	/*
	 * Internationalization
	 */
	const translations = {
		en: {
			role: "Fullstack Software Engineer & Web Designer",
			home: "Home",
			about: "About Me",
			work: "My Recent Work",
			"number-example": "Number Format Example: ",
			toggle: "العربية",
			"about-intro": "A Fullstack Software Engineer, Who always aims for maximal impact from features and products through effective design, usability, and planning.",
			"about-current": "I'm Currently a Open-Source Contributor of",
			"about-consultant": "and Consultant of several Project whom needs to launch their MVP fast and efficient.",
			"about-connect": "Let's connect and discuss your need to me here:",
			"about-upwork": "or to my Upwork",
			"here": "here",
			"about-other": "For other projects, please see below",
			"work-wpoptic": "Wpoptic | React, Chrome Extension, Manifest 3, and Supabase",
			"work-reloadsol": "Reloadsol | Next.js, and Supabase",
			"work-neliti": "Neliti | Vue, Webflow, Django, and Figma",
			"work-twinoaks": "Twinoaks3d | Webflow, Javascript & CSS",
			"work-expensify": "Expensify | React Native Contributor"
		},
		ar: {
			role: "مهندس برمجيات ومصمم ويب",
			home: "الرئيسية",
			about: "من أنا",
			work: "أعمالي",
			"number-example": "مثال تنسيق الأرقام: ",
			toggle: "English",
			"about-intro": "مهندس برمجيات متكامل، يهدف دائمًا لتحقيق أقصى تأثير من الميزات والمنتجات من خلال التصميم الفعال وسهولة الاستخدام والتخطيط.",
			"about-current": "أعمل حاليًا كمساهم في المصادر المفتوحة لـ",
			"about-consultant": "ومستشار للعديد من المشاريع التي تحتاج لإطلاق منتجها الأولي (MVP) بسرعة وكفاءة.",
			"about-connect": "لنتواصل ونناقش احتياجاتك هنا:",
			"about-upwork": "أو على Upwork",
			"here": "هنا",
			"about-other": "للمشاريع الأخرى، يرجى الاطلاع أدناه",
			"work-wpoptic": "Wpoptic | React، إضافة كروم، Manifest 3، و Supabase",
			"work-reloadsol": "Reloadsol | Next.js و Supabase",
			"work-neliti": "Neliti | Vue، Webflow، Django، و Figma",
			"work-twinoaks": "Twinoaks3d | Webflow، Javascript و CSS",
			"work-expensify": "Expensify | مساهم في React Native"
		}
	};

	const $langToggle = $('#lang-toggle');
	const $numberExample = $('#number-example');
	let currentLang = localStorage.getItem('lang') || 'en';

	function setLanguage(lang) {
		currentLang = lang;
		const isArabic = lang === 'ar';

		// Update HTML attributes
		$('html').attr('lang', lang).attr('dir', isArabic ? 'rtl' : 'ltr');

		// Update Translations
		$('[data-i18n]').each(function () {
			const key = $(this).data('i18n');
			if (translations[lang][key]) {
				$(this).text(translations[lang][key]);
			}
		});

		// Update Toggle Button Text
		$langToggle.text(translations[lang].toggle);

		// Update Number Formatting
		const number = 123456;
		const formattedNumber = new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(number);
		$numberExample.text(formattedNumber);

		// Save to localStorage
		localStorage.setItem('lang', lang);
	}

	// Initial Set
	setLanguage(currentLang);

	// Toggle Event
	$langToggle.on('click', function () {
		const newLang = currentLang === 'en' ? 'ar' : 'en';
		setLanguage(newLang);
	});

});
