/* ==================================================================
 * Treehouse — main.js
 * Vanilla JavaScript, no jQuery. One function per feature, each with
 * guard clauses, so every page can load this same file.
 * ================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------
   * DATA: school calendar (home page).
   * Dates are YYYY-MM-DD. Add "end" for events that span several days.
   * type: school | family | sports | closed
   * "short" is an optional compact label for the month grid.
   * ---------------------------------------------------------------- */
  var EVENTS = [
    { date: "2026-09-02", title: "First day of school", short: "First day", time: "8:10 am", type: "school" },
    { date: "2026-09-07", title: "Labor Day, no school", short: "Labor Day", type: "closed" },
    { date: "2026-09-10", title: "Back-to-school picnic", short: "Picnic", time: "5:30 pm", type: "family" },
    { date: "2026-09-17", title: "Curriculum night for parents", short: "Info night", time: "6:00 pm", type: "family" },
    { date: "2026-09-22", title: "School photo day", short: "Photo day", type: "school" },
    { date: "2026-09-25", title: "Cross-country fun run", short: "Fun run", time: "2:00 pm", type: "sports" },
    { date: "2026-09-30", title: "Club sign-up closes", short: "Sign-ups", type: "school" },

    { date: "2026-10-02", title: "Walk to School Day", short: "Walk day", time: "8:00 am", type: "school" },
    { date: "2026-10-09", title: "Staff development day, no school", short: "No school", type: "closed" },
    { date: "2026-10-15", title: "Grade 4 trip to the science museum", short: "Field trip", time: "9:00 am", type: "school" },
    { date: "2026-10-17", title: "Admissions open morning", short: "Open day", time: "9:30 am", type: "family" },
    { date: "2026-10-21", end: "2026-10-23", title: "Book fair in the library", short: "Book fair", time: "8:00 am to 4:00 pm", type: "family" },
    { date: "2026-10-23", title: "Fall family festival", short: "Festival", time: "4:00 pm", type: "family" },
    { date: "2026-10-27", title: "Soccer vs. Brookside Elementary", short: "Soccer", time: "3:45 pm", type: "sports" },
    { date: "2026-10-29", title: "School-day tour for new families", short: "Tour", time: "9:00 am", type: "family" },
    { date: "2026-10-30", title: "Costume parade", short: "Parade", time: "8:45 am", type: "school" },

    { date: "2026-11-04", end: "2026-11-05", title: "Parent–teacher conferences", short: "Conference", time: "Afternoons, 1:00 to 6:00 pm", type: "family" },
    { date: "2026-11-11", title: "Veterans Day assembly", short: "Assembly", time: "9:00 am", type: "school" },
    { date: "2026-11-14", title: "Admissions open morning", short: "Open day", time: "9:30 am", type: "family" },
    { date: "2026-11-18", title: "Grade 2 poetry café", short: "Poetry", time: "2:15 pm", type: "family" },
    { date: "2026-11-19", title: "Cross-country league final", short: "XC final", time: "3:30 pm", type: "sports" },
    { date: "2026-11-20", title: "Coat and food drive ends", short: "Food drive", type: "school" },
    { date: "2026-11-25", end: "2026-11-27", title: "Thanksgiving break, no school", short: "Holiday", type: "closed" },

    { date: "2026-12-02", title: "Evening information session", short: "Info night", time: "6:30 pm", type: "family" },
    { date: "2026-12-04", title: "Winter choir concert", short: "Concert", time: "6:00 pm", type: "family" },
    { date: "2026-12-09", title: "Basketball skills night", short: "Basketball", time: "4:00 pm", type: "sports" },
    { date: "2026-12-11", title: "Winter art show", short: "Art show", time: "3:15 pm", type: "family" },
    { date: "2026-12-16", title: "Winter reports go home", short: "Reports", type: "school" },
    { date: "2026-12-18", title: "Early dismissal at 12:30", short: "Half day", time: "12:30 pm", type: "school" },
    { date: "2026-12-21", end: "2026-12-31", title: "Winter break, no school", short: "Holiday", type: "closed" }
  ];

  var EVENT_TYPES = {
    school: "School day",
    family: "Families welcome",
    sports: "Sports",
    closed: "No school"
  };

  /* ----------------------------------------------------------------
   * DATA: specialist minutes per week (academics page chart).
   * One number per subject, in the same order as "subjects".
   * ---------------------------------------------------------------- */
  var SPECIALIST_MINUTES = {
    subjects: [
      { key: "music", label: "Music" },
      { key: "art", label: "Art" },
      { key: "pe", label: "PE" },
      { key: "spanish", label: "Spanish" },
      { key: "stem", label: "STEM lab" }
    ],
    grades: [
      { label: "Kindergarten", minutes: [60, 45, 90, 60, 30] },
      { label: "Grade 1", minutes: [60, 45, 90, 90, 45] },
      { label: "Grade 2", minutes: [80, 60, 90, 90, 45] },
      { label: "Grade 3", minutes: [80, 60, 90, 90, 60] },
      { label: "Grade 4", minutes: [80, 60, 90, 90, 60] },
      { label: "Grade 5", minutes: [80, 60, 90, 90, 90] }
    ]
  };

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
  var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ----------------------------------------------------------------
   * Mobile navigation: close the collapse after a link is tapped and
   * keep the toggler's label in step with its state.
   * ---------------------------------------------------------------- */
  function initNav() {
    var toggler = document.querySelector(".navbar-toggler");
    var collapse = document.getElementById("primary-nav");
    if (!toggler || !collapse) return;

    collapse.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!collapse.classList.contains("show") || !window.bootstrap) return;
        var inst = window.bootstrap.Collapse.getInstance(collapse);
        if (inst) inst.hide();
      });
    });
    collapse.addEventListener("show.bs.collapse", function () {
      toggler.setAttribute("aria-label", "Close the menu");
    });
    collapse.addEventListener("hide.bs.collapse", function () {
      toggler.setAttribute("aria-label", "Open the menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !collapse.classList.contains("show") || !window.bootstrap) return;
      var inst = window.bootstrap.Collapse.getInstance(collapse);
      if (inst) { inst.hide(); toggler.focus(); }
    });
  }

  /* ----------------------------------------------------------------
   * Sticky header: add a shadow once the page scrolls.
   * ---------------------------------------------------------------- */
  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 10); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ----------------------------------------------------------------
   * Reveal-on-scroll. Content is only hidden when JS runs (.js class).
   * A rAF-throttled position check (rather than IntersectionObserver
   * alone) means anything the visitor has scrolled past, even in one
   * jump from an anchor link, is revealed too.
   * ---------------------------------------------------------------- */
  function initReveal() {
    var pending = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!pending.length) return;
    if (reduceMotion) {
      pending.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var ticking = false;
    function check() {
      ticking = false;
      var limit = window.innerHeight * 0.92;
      pending = pending.filter(function (el) {
        if (el.getBoundingClientRect().top < limit) { el.classList.add("in"); return false; }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
  }

  /* ----------------------------------------------------------------
   * Smooth scrolling for same-page anchor links (the sticky header
   * offset comes from scroll-padding-top in the CSS). Focus moves to
   * the target so keyboard users continue from there.
   * ---------------------------------------------------------------- */
  function initSmoothAnchors() {
    var here = location.pathname.replace(/index\.html$/, "");
    document.addEventListener("click", function (e) {
      var link = e.target.closest ? e.target.closest('a[href*="#"]') : null;
      if (!link || e.defaultPrevented) return;
      var url = new URL(link.getAttribute("href"), location.href);
      if (url.pathname.replace(/index\.html$/, "") !== here || url.hash.length < 2) return;
      var target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (history.pushState) history.pushState(null, "", url.hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  /* ----------------------------------------------------------------
   * Count-up numbers ([data-count], optional data-suffix).
   * The final value is already in the HTML for no-JS visitors.
   * ---------------------------------------------------------------- */
  function initCountUp() {
    var nums = document.querySelectorAll("[data-count]");
    if (!nums.length || reduceMotion || !("IntersectionObserver" in window)) return;

    function run(el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var suffix = el.getAttribute("data-suffix") || "";
      if (isNaN(target)) return;
      var start = null;
      var dur = 1200;
      function tick(ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { io.observe(n); });
  }

  /* ----------------------------------------------------------------
   * Grade tabs (WAI-ARIA tabs pattern, automatic activation).
   * Without JS the tablist is hidden and every grade panel shows.
   * ---------------------------------------------------------------- */
  function initGradeTabs() {
    var root = document.querySelector("[data-tabs]");
    if (!root) return;
    var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    if (panels.some(function (p) { return !p; })) return;

    panels.forEach(function (p, i) {
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", tabs[i].id);
      p.setAttribute("tabindex", "0");
    });

    function select(index, moveFocus) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        panels[i].classList.toggle("is-entering", on && !reduceMotion);
      });
      if (moveFocus) tabs[index].focus();
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(i, false); });
      tab.addEventListener("keydown", function (e) {
        var next = null;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        select(next, true);
      });
    });

    var initial = tabs.findIndex(function (t) { return t.getAttribute("aria-selected") === "true"; });
    select(initial > -1 ? initial : 0, false);
  }

  /* ----------------------------------------------------------------
   * After-school clubs: filter cards by weekday.
   * Cards list their days in data-days="mon thu".
   * ---------------------------------------------------------------- */
  function initClubFilter() {
    var group = document.querySelector("[data-club-filter]");
    if (!group) return;
    var buttons = Array.prototype.slice.call(group.querySelectorAll("[data-day]"));
    var cards = Array.prototype.slice.call(document.querySelectorAll(".club-card[data-days]"));
    if (!buttons.length || !cards.length) return;
    var status = document.querySelector("[data-club-status]");
    var empty = document.querySelector("[data-club-empty]");
    var dayNames = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday" };

    function meets(card, day) {
      return day === "all" || card.getAttribute("data-days").split(/\s+/).indexOf(day) > -1;
    }

    buttons.forEach(function (b) {
      var badge = b.querySelector(".count");
      var day = b.getAttribute("data-day");
      if (badge) badge.textContent = cards.filter(function (c) { return meets(c, day); }).length;
    });

    function apply(day) {
      var shown = 0;
      cards.forEach(function (card) {
        var match = meets(card, day);
        card.hidden = !match;
        card.classList.remove("pop");
        if (match) {
          shown += 1;
          if (!reduceMotion) { void card.offsetWidth; card.classList.add("pop"); }
        }
      });
      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-day") === day ? "true" : "false");
      });
      if (status) {
        status.textContent = day === "all"
          ? "Showing all " + shown + " clubs"
          : "Showing " + shown + (shown === 1 ? " club" : " clubs") + " on " + dayNames[day];
      }
      if (empty) empty.hidden = shown > 0;
    }

    buttons.forEach(function (b) {
      b.addEventListener("click", function () { apply(b.getAttribute("data-day")); });
    });
  }

  /* ----------------------------------------------------------------
   * Events calendar: month grid + agenda, built from EVENTS.
   * Opens on the current month when it has data, otherwise on the
   * next month with upcoming events.
   * ---------------------------------------------------------------- */
  function initCalendar() {
    var root = document.querySelector("[data-calendar]");
    if (!root || !EVENTS.length) return;
    var titleEl = root.querySelector("[data-cal-title]");
    var gridEl = root.querySelector("[data-cal-grid]");
    var prevBtn = root.querySelector("[data-cal-prev]");
    var nextBtn = root.querySelector("[data-cal-next]");
    var agendaTitle = root.querySelector("[data-agenda-title]");
    var agendaList = root.querySelector("[data-agenda-list]");
    var resetBtn = root.querySelector("[data-agenda-reset]");
    if (!titleEl || !gridEl || !agendaList) return;

    function parse(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
    function dayKey(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
    function monthIndex(d) { return d.getFullYear() * 12 + d.getMonth(); }
    function iso(d) {
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    }

    var events = EVENTS.map(function (e) {
      var start = parse(e.date);
      return { title: e.title, short: e.short || e.title, time: e.time || "", type: e.type || "school",
        start: start, end: e.end ? parse(e.end) : start };
    }).sort(function (a, b) { return a.start - b.start; });

    var first = monthIndex(events[0].start);
    var last = Math.max.apply(null, events.map(function (e) { return monthIndex(e.end); }));
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var current = monthIndex(today);
    if (current < first || current > last) {
      var upcoming = events.filter(function (e) { return e.end >= today; })[0];
      current = upcoming ? monthIndex(upcoming.start) : first;
    }
    var selected = null;

    function eventsOn(d) {
      var k = dayKey(d);
      return events.filter(function (e) { return dayKey(e.start) <= k && k <= dayKey(e.end); });
    }
    function eventsInMonth(mi) {
      return events.filter(function (e) { return monthIndex(e.start) <= mi && mi <= monthIndex(e.end); });
    }
    function longDate(d) { return DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate(); }

    function renderGrid() {
      var y = Math.floor(current / 12);
      var m = current % 12;
      var firstDay = new Date(y, m, 1);
      var daysIn = new Date(y, m + 1, 0).getDate();
      var lead = firstDay.getDay();
      var cells = Math.ceil((lead + daysIn) / 7) * 7;

      titleEl.textContent = MONTHS[m] + " " + y;
      if (prevBtn) prevBtn.disabled = current <= first;
      if (nextBtn) nextBtn.disabled = current >= last;

      var html = '<table class="cal-table"><caption class="visually-hidden">' + MONTHS[m] + " " + y +
        ": days with events are buttons</caption><thead><tr>";
      DAYS.forEach(function (d) { html += '<th scope="col"><abbr title="' + d + '">' + d.slice(0, 3) + "</abbr></th>"; });
      html += "</tr></thead><tbody>";

      for (var i = 0; i < cells; i++) {
        if (i % 7 === 0) html += "<tr>";
        var date = new Date(y, m, i - lead + 1);
        var inMonth = date.getMonth() === m;
        if (!inMonth) {
          html += '<td class="out"><span class="cal-num" aria-hidden="true">' + date.getDate() + "</span></td>";
        } else {
          var list = eventsOn(date);
          var isToday = dayKey(date) === dayKey(today);
          var closed = list.some(function (e) { return e.type === "closed"; });
          var cls = [isToday ? "is-today" : "", closed ? "is-closed" : ""].join(" ").trim();
          var todayText = isToday ? '<span class="visually-hidden"> (today)</span>' : "";
          if (!list.length) {
            html += "<td" + (cls ? ' class="' + cls + '"' : "") + '><span class="cal-num">' + date.getDate() + "</span>" + todayText + "</td>";
          } else {
            var label = longDate(date) + (isToday ? " (today)" : "") + ", " + list.length +
              (list.length === 1 ? " event: " : " events: ") + list.map(function (e) { return e.title; }).join("; ");
            var pressed = selected && dayKey(selected) === dayKey(date);
            html += '<td class="has-events ' + cls + '"><button type="button" class="cal-btn" data-date="' + iso(date) +
              '" aria-pressed="' + (pressed ? "true" : "false") + '" aria-label="' + esc(label) + '">' +
              '<span class="cal-num">' + date.getDate() + "</span>";
            list.slice(0, 2).forEach(function (e) {
              html += '<span class="cal-chip t-' + e.type + '">' + esc(e.short) + "</span>";
            });
            if (list.length > 2) html += '<span class="cal-more">+' + (list.length - 2) + " more</span>";
            html += '<span class="cal-dots">' + list.map(function (e) { return '<i class="t-' + e.type + '"></i>'; }).join("") + "</span>";
            html += "</button></td>";
          }
        }
        if (i % 7 === 6) html += "</tr>";
      }
      html += "</tbody></table>";
      gridEl.innerHTML = html;
    }

    function agendaItem(e) {
      var multi = dayKey(e.start) !== dayKey(e.end);
      var when = longDate(e.start) + (multi ? " to " + longDate(e.end) : "");
      return '<li class="agenda-item"><span class="date-chip t-' + e.type + '" aria-hidden="true"><span class="m">' +
        MONTHS[e.start.getMonth()].slice(0, 3) + '</span><span class="d">' + e.start.getDate() + "</span></span><div><h4>" +
        esc(e.title) + '</h4><p class="meta">' + esc(when) + (e.time ? " &middot; " + esc(e.time) : "") +
        '</p><span class="type-pill t-' + e.type + '">' + EVENT_TYPES[e.type] + "</span></div></li>";
    }

    function renderAgenda() {
      var list = selected ? eventsOn(selected) : eventsInMonth(current);
      if (agendaTitle) {
        agendaTitle.textContent = selected
          ? longDate(selected)
          : "Events in " + MONTHS[current % 12];
      }
      if (resetBtn) resetBtn.hidden = !selected;
      agendaList.innerHTML = list.length
        ? list.map(agendaItem).join("")
        : '<li class="agenda-empty">No events this month yet.</li>';
    }

    function render() { renderGrid(); renderAgenda(); }

    gridEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".cal-btn");
      if (!btn) return;
      var d = parse(btn.getAttribute("data-date"));
      selected = selected && dayKey(selected) === dayKey(d) ? null : d;
      gridEl.querySelectorAll(".cal-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", selected && b === btn ? "true" : "false");
      });
      renderAgenda();
    });
    if (prevBtn) prevBtn.addEventListener("click", function () {
      if (current <= first) return;
      current -= 1; selected = null; render();
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      if (current >= last) return;
      current += 1; selected = null; render();
    });
    if (resetBtn) resetBtn.addEventListener("click", function () {
      selected = null;
      gridEl.querySelectorAll(".cal-btn").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      renderAgenda();
    });

    render();
  }

  /* ----------------------------------------------------------------
   * Specialist minutes chart (academics): stacked CSS bars built from
   * SPECIALIST_MINUTES. The HTML holds a plain list for no-JS visitors.
   * ---------------------------------------------------------------- */
  function initMinutesChart() {
    var host = document.querySelector("[data-minutes-chart]");
    if (!host) return;
    var legend = document.querySelector("[data-chart-legend]");
    var data = SPECIALIST_MINUTES;
    var totals = data.grades.map(function (g) { return g.minutes.reduce(function (a, b) { return a + b; }, 0); });
    var scale = Math.ceil(Math.max.apply(null, totals) / 50) * 50;

    if (legend) {
      legend.innerHTML = data.subjects.map(function (s) {
        return '<li><i class="seg-' + s.key + '"></i>' + esc(s.label) + "</li>";
      }).join("");
    }

    var html = '<div class="chart-rows">';
    data.grades.forEach(function (g, gi) {
      var parts = data.subjects.map(function (s, si) { return s.label + " " + g.minutes[si]; }).join(", ");
      html += '<div class="chart-row" role="img" aria-label="' + esc(g.label + ": " + totals[gi] + " minutes a week (" + parts + ")") + '">' +
        '<span class="label" aria-hidden="true">' + esc(g.label) + "</span>" +
        '<div class="chart-track" aria-hidden="true"><div class="chart-bar" data-width="' + (totals[gi] / scale * 100).toFixed(1) + '">';
      g.minutes.forEach(function (min, si) {
        html += '<span class="seg-' + data.subjects[si].key + '" style="width:' + (min / totals[gi] * 100).toFixed(2) +
          '%" title="' + esc(data.subjects[si].label + ": " + min + " min") + '"></span>';
      });
      html += '</div></div><span class="total" aria-hidden="true">' + totals[gi] + "<small>min / week</small></span></div>";
    });
    html += "</div>";
    host.innerHTML = html;

    var bars = host.querySelectorAll(".chart-bar");
    function grow() { bars.forEach(function (b) { b.style.width = b.getAttribute("data-width") + "%"; }); }
    if (reduceMotion || !("IntersectionObserver" in window)) { grow(); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      if (!entries.some(function (e) { return e.isIntersecting; })) return;
      grow();
      obs.disconnect();
    }, { threshold: 0.25 });
    io.observe(host);
  }

  /* ----------------------------------------------------------------
   * Number stepper (+ / − buttons around a number input).
   * ---------------------------------------------------------------- */
  function initSteppers() {
    document.querySelectorAll("[data-stepper]").forEach(function (wrap) {
      var input = wrap.querySelector("input[type=number]");
      if (!input) return;
      var min = parseInt(input.min || "1", 10);
      var max = parseInt(input.max || "9", 10);
      var minus = wrap.querySelector('[data-step="-1"]');
      var plus = wrap.querySelector('[data-step="1"]');

      function clamp(v) { return Math.min(max, Math.max(min, isNaN(v) ? min : v)); }
      function sync() {
        if (minus) minus.disabled = parseInt(input.value, 10) <= min;
        if (plus) plus.disabled = parseInt(input.value, 10) >= max;
      }
      wrap.querySelectorAll("[data-step]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          input.value = clamp(parseInt(input.value, 10) + parseInt(btn.getAttribute("data-step"), 10));
          sync();
        });
      });
      input.addEventListener("change", function () { input.value = clamp(parseInt(input.value, 10)); sync(); });
      input.form && input.form.addEventListener("reset", function () { setTimeout(sync, 0); });
      sync();
    });
  }

  /* ----------------------------------------------------------------
   * Form validation (front-end only). Fields with [data-required];
   * radio groups in a fieldset with [data-required-group].
   * On success the form shows its .form-success panel. Nothing is sent:
   * point the form at your backend or a form service to go live.
   * ---------------------------------------------------------------- */
  function initForms() {
    var forms = document.querySelectorAll("form[data-validate]");
    if (!forms.length) return;

    function errorFor(el) {
      var id = el.getAttribute("aria-describedby");
      return id ? document.getElementById(id.split(" ")[0]) : null;
    }
    function checkField(field) {
      var val = (field.value || "").trim();
      var ok = val.length > 0;
      if (ok && field.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      field.classList.toggle("is-invalid", !ok);
      field.setAttribute("aria-invalid", ok ? "false" : "true");
      var err = errorFor(field);
      if (err) err.classList.toggle("show", !ok);
      return ok;
    }
    function checkGroup(group) {
      var ok = !!group.querySelector("input:checked");
      group.classList.toggle("is-invalid", !ok);
      var err = errorFor(group);
      if (err) err.classList.toggle("show", !ok);
      return ok;
    }

    forms.forEach(function (form) {
      var success = form.querySelector(".form-success");
      var fields = Array.prototype.slice.call(form.querySelectorAll("[data-required]"));
      var groups = Array.prototype.slice.call(form.querySelectorAll("[data-required-group]"));

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var firstBad = null;
        groups.forEach(function (g) {
          if (!checkGroup(g) && !firstBad) firstBad = g.querySelector("input:not(:disabled)");
        });
        fields.forEach(function (f) {
          if (!checkField(f) && !firstBad) firstBad = f;
        });
        if (firstBad) { firstBad.focus(); return; }

        if (success) {
          var fill = function (key, text) {
            var el = success.querySelector('[data-summary="' + key + '"]');
            if (el) el.textContent = text;
          };
          var name = form.querySelector("[name=name]");
          var visit = form.querySelector("[name=visit]:checked");
          var count = form.querySelector("[name=count]");
          if (name) fill("name", ", " + name.value.trim().split(/\s+/)[0]);
          if (visit) fill("visit", visit.value);
          if (count) fill("count", count.value + (count.value === "1" ? " adult" : " adults"));
          form.classList.add("is-sent");
          success.classList.add("show");
          success.focus();
        }
        form.reset();
      });

      fields.forEach(function (f) {
        var evt = f.tagName === "SELECT" ? "change" : "input";
        f.addEventListener(evt, function () { if (f.classList.contains("is-invalid")) checkField(f); });
      });
      groups.forEach(function (g) {
        g.addEventListener("change", function () { if (g.classList.contains("is-invalid")) checkGroup(g); });
      });

      var again = form.querySelector("[data-form-reset]");
      if (again && success) {
        again.addEventListener("click", function () {
          success.classList.remove("show");
          form.classList.remove("is-sent");
          var firstInput = form.querySelector(".form-fields input:not(:disabled)");
          if (firstInput) firstInput.focus();
        });
      }
    });
  }

  /* ---------------------------------------------------------------- */
  function boot() {
    initNav();
    initStickyHeader();
    initReveal();
    initSmoothAnchors();
    initCountUp();
    initGradeTabs();
    initClubFilter();
    initCalendar();
    initMinutesChart();
    initSteppers();
    initForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
