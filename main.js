(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 動きを減らす設定の方には、最初からすべて表示する
  if (reduce || !('IntersectionObserver' in window)) return;

  // 画像をスクロールでふわっと出す
  var parts = document.querySelectorAll('.part:not(.is-first)');
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
