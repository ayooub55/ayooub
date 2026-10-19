/* ================================================================
   FMDC 1A — Page d'accueil · interactions
   Thème, menu mobile, compteurs et grille des modules.
   ================================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var head = document.getElementById('head');

  /* ------------------------------ Thème ------------------------------ */
  var LS_THEME = 'fmdc-theme';
  try {
    var saved = localStorage.getItem(LS_THEME);
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) { /* stockage indisponible */ }

  var themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(LS_THEME, next); } catch (e) { /* ignoré */ }
    });
  }

  /* --------------------------- Menu mobile --------------------------- */
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  function closeNav() {
    if (!head || !menuBtn) return;
    head.classList.remove('nav-open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && head) {
    menuBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = head.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!head.contains(e.target)) closeNav();
    });
    if (nav) nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* ------------------------- Ombre de l'en-tête ---------------------- */
  if (head) {
    var onScroll = function () { head.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------- Données du portail (si dispo) ---------------- */
  var DRIVE = window.DRIVE;
  function filesOf(node, out) {
    out = out || [];
    (node.fichiers || []).forEach(function (f) { out.push(f); });
    (node.sections || []).forEach(function (child) { filesOf(child, out); });
    return out;
  }
  var moduleCount = function (m) { return filesOf({ sections: m.profs || [] }).length; };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  if (DRIVE && Array.isArray(DRIVE.modules) && DRIVE.modules.length) {
    var total = 0;
    DRIVE.modules.forEach(function (m) { total += moduleCount(m); });

    document.querySelectorAll('[data-count="docs"]').forEach(function (el) {
      el.textContent = total;
    });
    document.querySelectorAll('[data-count="modules"]').forEach(function (el) {
      el.textContent = DRIVE.modules.length;
    });

    var grid = document.getElementById('modules-grid');
    if (grid) {
      grid.innerHTML = DRIVE.modules.map(function (m) {
        var n = moduleCount(m);
        return '<a class="module" href="portail.html#/m/' + encodeURIComponent(m.id) + '">' +
          '<span class="m-top"><span class="m-emoji" aria-hidden="true">' + esc(m.emoji || '📁') + '</span>' +
          '<span class="m-arr" aria-hidden="true">→</span></span>' +
          '<b>' + esc(m.nom) + '</b>' +
          '<span class="m-meta"><i style="background:' + esc(m.couleur || '#0e6a57') + '"></i>' +
          n + ' document' + (n > 1 ? 's' : '') + '</span></a>';
      }).join('');
    }
  }

  /* --------------------------- Apparition ---------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }
})();
