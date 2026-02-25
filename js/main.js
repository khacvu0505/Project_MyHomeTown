(function(){
    // Back to Top - by CodyHouse.co (requires Util from util.js)
    if (typeof Util === 'undefined') return;
	var backTop = document.getElementsByClassName('js-cd-top')[0],
		offset = 300, // browser window scroll (in pixels) after which the "back to top" link is shown
		offsetOpacity = 1200, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
		scrollDuration = 700,
		scrolling = false;

	if( backTop ) {
		//update back to top visibility on scrolling
		window.addEventListener("scroll", function(event) {
			if( !scrolling ) {
				scrolling = true;
				(!window.requestAnimationFrame) ? setTimeout(checkBackToTop, 250) : window.requestAnimationFrame(checkBackToTop);
			}
		});

		//smooth scroll to top
		backTop.addEventListener('click', function(event) {
			event.preventDefault();
			(!window.requestAnimationFrame) ? window.scrollTo(0, 0) : Util.scrollTo(0, scrollDuration);
		});
	}

	function checkBackToTop() {
		var windowTop = window.scrollY || document.documentElement.scrollTop;
		( windowTop > offset ) ? Util.addClass(backTop, 'cd-top--is-visible') : Util.removeClass(backTop, 'cd-top--is-visible cd-top--fade-out');
		( windowTop > offsetOpacity ) && Util.addClass(backTop, 'cd-top--fade-out');
		scrolling = false;
	}
})();

// ========================================
// Navbar Mobile Toggle
// ========================================
(function() {
    var toggler = document.querySelector('.navbar-toggler');
    var collapse = document.querySelector('.navbar-collapse');

    if (toggler && collapse) {
        toggler.addEventListener('click', function() {
            collapse.classList.toggle('show');
        });
    }
})();

// ========================================
// Dropdown (mobile tap support)
// ========================================
(function() {
    var dropdowns = document.querySelectorAll('.nav-item.dropdown');

    dropdowns.forEach(function(dropdown) {
        var toggle = dropdown.querySelector('.dropdown-toggle');
        var menu = dropdown.querySelector('.dropdown-menu');

        if (toggle && menu) {
            toggle.addEventListener('click', function(e) {
                // On mobile, toggle dropdown on click
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    menu.classList.toggle('show');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                menu.classList.remove('show');
            });
        }
    });
})();

// ========================================
// Custom Carousel
// ========================================
(function() {
    var carousel = document.querySelector('.carousel');
    if (!carousel) return;

    var items = carousel.querySelectorAll('.carousel-item');
    var indicators = carousel.querySelectorAll('.carousel-indicators li');
    var prevBtn = carousel.querySelector('.carousel-control-prev');
    var nextBtn = carousel.querySelector('.carousel-control-next');
    var currentIndex = 0;
    var intervalTime = 5000;
    var autoSlideTimer;

    function showSlide(index) {
        // Wrap around
        if (index >= items.length) index = 0;
        if (index < 0) index = items.length - 1;

        // Remove active from all items and indicators
        items.forEach(function(item) {
            item.classList.remove('active');
        });
        indicators.forEach(function(ind) {
            ind.classList.remove('active');
        });

        // Set active
        items[index].classList.add('active');
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }

        currentIndex = index;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, intervalTime);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    // Next/Prev controls
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            prevSlide();
            resetAutoSlide();
        });
    }

    // Indicator clicks
    indicators.forEach(function(indicator, idx) {
        indicator.addEventListener('click', function() {
            showSlide(idx);
            resetAutoSlide();
        });
    });

    // Start auto-slide
    startAutoSlide();
})();
