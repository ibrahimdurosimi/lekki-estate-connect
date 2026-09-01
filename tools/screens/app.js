/* ==========================================================================
   Lighthouse Lekki Estate — shared vanilla JS. Inlined into every screen.
   No frameworks, no network calls. Prototype interactions only.
   ========================================================================== */
(function () {
  var LH = (window.LH = {});

  /* ---------- tiny helpers ---------------------------------------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  LH.$ = $; LH.$$ = $$;

  /* ---------- bottom sheets --------------------------------------------- */
  LH.openSheet = function (id) {
    var s = document.getElementById(id);
    if (!s) return;
    var scrim = document.getElementById('scrim');
    if (scrim) scrim.classList.add('open');
    s.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  LH.closeSheets = function () {
    $$('.sheet').forEach(function (s) { s.classList.remove('open'); });
    var scrim = document.getElementById('scrim');
    if (scrim) scrim.classList.remove('open');
    document.body.style.overflow = '';
  };

  /* ---------- toggle groups (chips / segmented / slots / days) ----------- */
  function bindGroups() {
    $$('[data-group]').forEach(function (grp) {
      grp.addEventListener('click', function (e) {
        var btn = e.target.closest('button');
        if (!btn || btn.disabled || !grp.contains(btn)) return;
        var multi = grp.hasAttribute('data-multi');
        if (!multi) {
          $$('button', grp).forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        }
        var t = btn.getAttribute('data-target');
        if (t) {
          $$('[data-panel]', document).forEach(function (p) {
            if (p.getAttribute('data-owner') === grp.getAttribute('data-group')) {
              p.hidden = p.getAttribute('data-panel') !== t;
            }
          });
        }
        grp.dispatchEvent(new CustomEvent('lh:change', { detail: { value: btn.getAttribute('data-value') || btn.textContent.trim() } }));
      });
    });
  }

  /* ---------- switches --------------------------------------------------- */
  function bindSwitches() {
    $$('.switch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        var on = sw.getAttribute('aria-checked') === 'true';
        sw.setAttribute('aria-checked', on ? 'false' : 'true');
        sw.dispatchEvent(new CustomEvent('lh:toggle', { detail: { on: !on } }));
      });
    });
  }

  /* ---------- filter chips just filter [data-tags] lists ------------------ */
  function bindFilters() {
    $$('[data-filter-group]').forEach(function (grp) {
      var scope = document.querySelector('[data-filter-scope="' + grp.getAttribute('data-filter-group') + '"]');
      grp.addEventListener('lh:change', function (e) {
        if (!scope) return;
        var v = e.detail.value;
        $$('[data-tags]', scope).forEach(function (item) {
          var tags = item.getAttribute('data-tags').split(',');
          item.hidden = !(v === 'all' || tags.indexOf(v) !== -1);
        });
      });
    });
  }

  /* ---------- PIN keypad (never a native input) -------------------------- */
  /* opts: { length, onChange, onComplete, strength } */
  LH.keypad = function (root, opts) {
    opts = opts || {};
    var len = opts.length || 6;
    var value = '';
    var mode = 'num';

    var dots = document.createElement('div');
    dots.className = 'pin-dots';
    var pad = document.createElement('div');
    pad.className = 'keypad';
    var modeWrap = document.createElement('div');
    modeWrap.className = 'keypad-mode';
    var strengthEl = null;

    root.appendChild(dots);
    root.appendChild(pad);
    root.appendChild(modeWrap);

    if (opts.strength) {
      strengthEl = document.createElement('div');
      strengthEl.className = 'strength';
      strengthEl.innerHTML =
        '<div class="strength-bars"><i></i><i></i><i></i><i></i></div>' +
        '<div class="tiny muted" style="margin-top:6px" data-strength-text>' +
        'Use 4 digits and 2 letters. Avoid your house number or a birth year.</div>';
      root.appendChild(strengthEl);
    }

    function score() {
      var digits = (value.match(/[0-9]/g) || []).length;
      var letters = (value.match(/[A-Z]/g) || []).length;
      var uniq = new Set(value.split('')).size;
      var seq = /0123|1234|2345|3456|4567|5678|6789|1111|0000|2222/.test(value);
      var s = 0;
      if (value.length >= 6) s++;
      if (digits >= 4 && letters >= 2) s++;
      if (uniq >= 5) s++;
      if (!seq && value.length >= 6) s++;
      return s;
    }
    function renderStrength() {
      if (!strengthEl) return;
      var s = score();
      var bars = strengthEl.querySelector('.strength-bars');
      bars.className = 'strength-bars ' + (s <= 1 ? 'weak' : s <= 3 ? 'mid' : '');
      $$('i', bars).forEach(function (b, i) { b.className = i < s ? 'on' : ''; });
      var txt = strengthEl.querySelector('[data-strength-text]');
      txt.textContent =
        value.length === 0 ? 'Use 4 digits and 2 letters. Avoid your house number or a birth year.'
        : s <= 1 ? 'Too weak — mix digits and letters, avoid repeats.'
        : s <= 2 ? 'Getting there — add letters and vary the digits.'
        : s <= 3 ? 'Good. One more varied character makes it strong.'
        : 'Strong PIN. Memorise it — it identifies you at the gate.';
    }

    function renderDots() {
      dots.innerHTML = '';
      for (var i = 0; i < len; i++) {
        var d = document.createElement('div');
        d.className = 'pin-dot' + (i < value.length ? ' filled' : '') + (i === value.length ? ' active' : '');
        d.textContent = i < value.length ? (opts.mask ? '•' : value[i]) : '';
        dots.appendChild(d);
      }
      renderStrength();
      if (opts.onChange) opts.onChange(value);
      if (value.length === len && opts.onComplete) opts.onComplete(value);
    }

    function push(ch) {
      if (value.length >= len) return;
      value += ch;
      renderDots();
    }
    function del() { value = value.slice(0, -1); renderDots(); }

    function renderPad() {
      pad.innerHTML = '';
      pad.className = 'keypad' + (mode === 'abc' ? ' letters' : '');
      var keys;
      if (mode === 'num') {
        keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'del'];
      } else {
        keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').concat(['clear', 'del']);
      }
      keys.forEach(function (k) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'key' + (k === 'del' || k === 'clear' ? ' key-util' : '');
        b.textContent = k === 'del' ? '⌫' : k === 'clear' ? 'Clear' : k;
        b.addEventListener('click', function () {
          if (k === 'del') del();
          else if (k === 'clear') { value = ''; renderDots(); }
          else push(k);
        });
        pad.appendChild(b);
      });
      modeWrap.innerHTML = '';
      var m = document.createElement('button');
      m.type = 'button';
      m.className = 'btn btn-ghost btn-sm';
      m.textContent = mode === 'num' ? 'Switch to letters (ABC)' : 'Switch to digits (123)';
      m.addEventListener('click', function () { mode = mode === 'num' ? 'abc' : 'num'; renderPad(); });
      modeWrap.appendChild(m);
    }

    renderPad();
    renderDots();
    return {
      get value() { return value; },
      clear: function () { value = ''; renderDots(); }
    };
  };

  /* ---------- charts: hand-rolled SVG, no libraries ---------------------- */
  var C = { mint: '#3FAE7A', deep: '#123528', gold: '#E8C547', grey: '#A9B5AF', info: '#2C6E9B', danger: '#C6413B' };
  LH.colors = C;

  function svg(w, h) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    s.setAttribute('width', '100%');
    s.setAttribute('preserveAspectRatio', 'none');
    s.style.display = 'block';
    s.style.height = h + 'px';
    return s;
  }
  function node(n, attrs) {
    var e = document.createElementNS('http://www.w3.org/2000/svg', n);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* line chart: { labels:[], series:[{name,color,values:[]}], compare:bool } */
  LH.line = function (el, cfg) {
    el.innerHTML = '';
    var W = 320, H = 148, P = { l: 12, r: 12, t: 10, b: 20 };
    var s = svg(W, H);
    s.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    var series = cfg.series.filter(function (x) { return cfg.compare || !x.isCompare; });
    var all = series.reduce(function (a, x) { return a.concat(x.values); }, []);
    var max = Math.max.apply(null, all) || 1, min = 0;
    var iw = W - P.l - P.r, ih = H - P.t - P.b;

    [0, .5, 1].forEach(function (f) {
      s.appendChild(node('line', { x1: P.l, x2: W - P.r, y1: P.t + ih * f, y2: P.t + ih * f, stroke: '#E3E9E6', 'stroke-width': 1 }));
    });

    series.forEach(function (ser) {
      var n = ser.values.length;
      var pts = ser.values.map(function (v, i) {
        var x = P.l + (n === 1 ? iw / 2 : (iw * i) / (n - 1));
        var y = P.t + ih - ((v - min) / (max - min)) * ih;
        return [x, y];
      });
      var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
      if (!ser.isCompare) {
        var area = node('path', {
          d: d + ' L' + pts[pts.length - 1][0] + ' ' + (P.t + ih) + ' L' + pts[0][0] + ' ' + (P.t + ih) + ' Z',
          fill: (ser.color || C.mint), opacity: .10
        });
        s.appendChild(area);
      }
      s.appendChild(node('path', {
        d: d, fill: 'none', stroke: ser.color || C.mint, 'stroke-width': ser.isCompare ? 1.6 : 2.4,
        'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'stroke-dasharray': ser.isCompare ? '4 4' : ''
      }));
      if (!ser.isCompare) {
        pts.forEach(function (p) {
          s.appendChild(node('circle', { cx: p[0], cy: p[1], r: 2.6, fill: '#fff', stroke: ser.color || C.mint, 'stroke-width': 1.8 }));
        });
      }
    });

    (cfg.labels || []).forEach(function (lb, i) {
      var n = cfg.labels.length;
      var x = P.l + (n === 1 ? iw / 2 : (iw * i) / (n - 1));
      var t = node('text', { x: x, y: H - 5, 'text-anchor': 'middle', fill: '#77857E', 'font-size': 9, 'font-family': 'Plus Jakarta Sans, sans-serif' });
      t.textContent = lb;
      s.appendChild(t);
    });
    el.appendChild(s);
  };

  /* bar chart: { labels:[], values:[], colors?:[] , unit? } */
  LH.bar = function (el, cfg) {
    el.innerHTML = '';
    var W = 320, H = 150, P = { l: 4, r: 4, t: 14, b: 22 };
    var s = svg(W, H); s.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    var max = Math.max.apply(null, cfg.values) || 1;
    var n = cfg.values.length, iw = W - P.l - P.r, ih = H - P.t - P.b;
    var slot = iw / n, bw = Math.min(34, slot * 0.56);
    cfg.values.forEach(function (v, i) {
      var h = (v / max) * ih;
      var x = P.l + slot * i + (slot - bw) / 2;
      var y = P.t + ih - h;
      s.appendChild(node('rect', { x: x, y: y, width: bw, height: Math.max(h, 2), rx: 5, fill: (cfg.colors && cfg.colors[i]) || C.mint }));
      var t = node('text', { x: x + bw / 2, y: y - 4, 'text-anchor': 'middle', fill: '#101915', 'font-size': 9.5, 'font-weight': 700, 'font-family': 'Plus Jakarta Sans, sans-serif' });
      t.textContent = v + (cfg.unit || '');
      s.appendChild(t);
      var l = node('text', { x: x + bw / 2, y: H - 6, 'text-anchor': 'middle', fill: '#77857E', 'font-size': 9, 'font-family': 'Plus Jakarta Sans, sans-serif' });
      l.textContent = cfg.labels[i];
      s.appendChild(l);
    });
    el.appendChild(s);
  };

  /* donut: { items:[{label,value,color}] } */
  LH.donut = function (el, cfg) {
    el.innerHTML = '';
    var size = 160, r = 62, cx = size / 2, cy = size / 2, sw = 22;
    var s = svg(size, size);
    s.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    s.style.height = size + 'px';
    s.style.maxWidth = size + 'px';
    s.style.margin = '0 auto';
    var total = cfg.items.reduce(function (a, x) { return a + x.value; }, 0) || 1;
    var acc = -90;
    cfg.items.forEach(function (it) {
      var ang = (it.value / total) * 360;
      var a0 = (acc * Math.PI) / 180, a1 = ((acc + ang) * Math.PI) / 180;
      var large = ang > 180 ? 1 : 0;
      var d = 'M' + (cx + r * Math.cos(a0)) + ' ' + (cy + r * Math.sin(a0)) +
        ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + (cx + r * Math.cos(a1)) + ' ' + (cy + r * Math.sin(a1));
      s.appendChild(node('path', { d: d, fill: 'none', stroke: it.color, 'stroke-width': sw, 'stroke-linecap': 'butt' }));
      acc += ang;
    });
    var t1 = node('text', { x: cx, y: cy - 2, 'text-anchor': 'middle', fill: '#101915', 'font-size': 22, 'font-weight': 700, 'font-family': 'Bricolage Grotesque, sans-serif' });
    t1.textContent = cfg.centerValue || total;
    s.appendChild(t1);
    var t2 = node('text', { x: cx, y: cy + 14, 'text-anchor': 'middle', fill: '#77857E', 'font-size': 10, 'font-family': 'Plus Jakarta Sans, sans-serif' });
    t2.textContent = cfg.centerLabel || 'total';
    s.appendChild(t2);
    el.appendChild(s);

    var lg = document.createElement('div');
    lg.className = 'legend';
    cfg.items.forEach(function (it) {
      var sp = document.createElement('span');
      sp.innerHTML = '<i style="background:' + it.color + '"></i>' + it.label + ' <b style="color:#101915;margin-left:2px">' + it.value + '</b>';
      lg.appendChild(sp);
    });
    el.appendChild(lg);
  };

  /* heatmap: { rows:[], cols:[], values:[[..]] } day x hour */
  LH.heat = function (el, cfg) {
    el.innerHTML = '';
    var max = 1;
    cfg.values.forEach(function (r) { r.forEach(function (v) { if (v > max) max = v; }); });
    var g = document.createElement('div');
    g.className = 'heat-grid';
    g.style.gridTemplateColumns = '34px repeat(' + cfg.cols.length + ',1fr)';
    g.appendChild(document.createElement('span'));
    cfg.cols.forEach(function (c) {
      var e = document.createElement('span');
      e.className = 'hl'; e.style.textAlign = 'center'; e.textContent = c;
      g.appendChild(e);
    });
    cfg.rows.forEach(function (rw, i) {
      var lab = document.createElement('span');
      lab.className = 'hl'; lab.textContent = rw;
      g.appendChild(lab);
      cfg.values[i].forEach(function (v) {
        var c = document.createElement('div');
        c.className = 'heat-cell';
        var f = v / max;
        c.style.background = f === 0 ? '#EEF2F0' : 'rgba(63,174,122,' + (0.14 + f * 0.86).toFixed(2) + ')';
        c.title = rw + ' — ' + v + ' visits';
        g.appendChild(c);
      });
    });
    el.appendChild(g);
    var sc = document.createElement('div');
    sc.className = 'chart-note';
    sc.innerHTML = 'Quieter <i style="display:inline-block;width:12px;height:8px;border-radius:2px;background:#EEF2F0;margin:0 3px"></i>' +
      '<i style="display:inline-block;width:12px;height:8px;border-radius:2px;background:rgba(63,174,122,.4);margin:0 3px"></i>' +
      '<i style="display:inline-block;width:12px;height:8px;border-radius:2px;background:rgba(63,174,122,1);margin:0 3px"></i> Busier';
    el.appendChild(sc);
  };

  /* auto-render charts declared via data-chart="line|bar|donut|heat" + JSON */
  function renderCharts(scope) {
    $$('[data-chart]', scope || document).forEach(function (el) {
      var cfg = JSON.parse(el.getAttribute('data-cfg'));
      var kind = el.getAttribute('data-chart');
      if (kind === 'line') { cfg.compare = el.hasAttribute('data-compare'); LH.line(el, cfg); }
      else if (kind === 'bar') LH.bar(el, cfg);
      else if (kind === 'donut') LH.donut(el, cfg);
      else if (kind === 'heat') LH.heat(el, cfg);
    });
  }
  LH.renderCharts = renderCharts;

  /* ---------- poll result bars -------------------------------------------- */
  LH.revealPoll = function (pollEl) {
    pollEl.querySelectorAll('[data-options]').forEach(function (o) { o.hidden = true; });
    pollEl.querySelectorAll('[data-results]').forEach(function (o) {
      o.hidden = false;
      requestAnimationFrame(function () {
        o.querySelectorAll('.rb-fill').forEach(function (f) { f.style.width = f.getAttribute('data-pct') + '%'; });
      });
    });
  };

  /* ---------- boot --------------------------------------------------------- */
  function boot() {
    bindGroups(); bindSwitches(); bindFilters(); renderCharts();

    document.addEventListener('click', function (e) {
      var o = e.target.closest('[data-open-sheet]');
      if (o) { e.preventDefault(); LH.openSheet(o.getAttribute('data-open-sheet')); return; }
      if (e.target.closest('[data-close-sheet]') || e.target.id === 'scrim') { LH.closeSheets(); return; }
      var p = e.target.closest('[data-vote]');
      if (p) { LH.revealPoll(p.closest('[data-poll]')); return; }
      var cmp = e.target.closest('[data-compare-toggle]');
      if (cmp) {
        var target = document.querySelector(cmp.getAttribute('data-compare-toggle'));
        if (target.hasAttribute('data-compare')) target.removeAttribute('data-compare');
        else target.setAttribute('data-compare', '');
        renderCharts(target.parentNode);
      }
    });

    $$('[data-keypad]').forEach(function (el) {
      LH.keypad(el, {
        length: parseInt(el.getAttribute('data-length') || '6', 10),
        strength: el.hasAttribute('data-strength'),
        mask: el.hasAttribute('data-mask'),
        onComplete: function () {
          var sel = el.getAttribute('data-cta');
          var cta = sel ? document.querySelector(sel) : null;
          if (cta) cta.removeAttribute('disabled');
        },
        onChange: function (v) {
          var sel = el.getAttribute('data-cta');
          var cta = sel ? document.querySelector(sel) : null;
          if (cta && v.length < parseInt(el.getAttribute('data-length') || '6', 10)) cta.setAttribute('disabled', '');
        }
      });
    });

    /* SOS: hold 5 seconds */
    $$('[data-sos]').forEach(function (btn) {
      var timer = null, held = 0, iv = null;
      function start() {
        held = 0;
        iv = setInterval(function () { held += 100; btn.style.boxShadow = '0 0 0 ' + (held / 160) + 'px rgba(198,65,59,.25)'; }, 100);
        timer = setTimeout(function () { stop(); LH.openSheet('sheet-sos'); }, 5000);
      }
      function stop() { clearTimeout(timer); clearInterval(iv); btn.style.boxShadow = ''; }
      btn.addEventListener('pointerdown', start);
      ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { btn.addEventListener(ev, stop); });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
