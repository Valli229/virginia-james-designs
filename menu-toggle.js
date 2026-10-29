(function () {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const toggle = header.querySelector('.menu-toggle');
    const nav = header.querySelector('.nav-links');
    if (!toggle || !nav) return;

    const mobileQuery = window.matchMedia('(max-width: 1000px)');

    function closeMenu() {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation');
        toggle.textContent = '☰';
    }

    function syncForViewport() {
        if (!mobileQuery.matches) closeMenu();
    }

    toggle.addEventListener('click', function () {
        if (!mobileQuery.matches) return;
        const isOpening = !nav.classList.contains('is-open');
        nav.classList.toggle('is-open', isOpening);
        toggle.setAttribute('aria-expanded', String(isOpening));
        toggle.setAttribute('aria-label', isOpening ? 'Close navigation' : 'Open navigation');
        toggle.textContent = isOpening ? '✕' : '☰';
    });

    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
        if (mobileQuery.matches && !header.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            closeMenu();
            toggle.focus();
        }
    });

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener('change', syncForViewport);
    } else {
        window.addEventListener('resize', syncForViewport);
    }
    syncForViewport();
})();
