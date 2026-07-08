// Back to top behavior: show after scrolling, smooth scroll to top
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') return fn();
    document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    // Smooth scroll when clicked
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      btn.blur();
    });

    // Show/hide based on scroll position
    var showAfter = 240; // px
    var lastScroll = window.pageYOffset || document.documentElement.scrollTop;

    function check() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > showAfter) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
      lastScroll = y;
    }

    // Throttle using requestAnimationFrame
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          check();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    check();
  });
})();
