(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var toggle = document.querySelector('.motion-toggle');

  function setStopped(stopped) {
    root.classList.toggle('no-motion', stopped);
    toggle.setAttribute('aria-pressed', stopped ? 'true' : 'false');
    toggle.textContent = stopped ? '動きを再開する' : '動きを止める';
    if (stopped) showAll();
  }

  // 画像をスクロールでふわっと出す
  var parts = document.querySelectorAll('.part:not(.is-first)');

  function showAll() {
    parts.forEach(function (part) { part.classList.add('is-visible'); });
  }

  toggle.addEventListener('click', function () {
    setStopped(!root.classList.contains('no-motion'));
  });

  if (reduce) {
    toggle.hidden = true;
    return;
  }

  if (!('IntersectionObserver' in window)) return;

  root.classList.add('can-reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  parts.forEach(function (part) { observer.observe(part); });
})();
