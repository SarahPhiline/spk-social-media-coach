// SPK — shared site behaviour (no build step, no dependencies)

(function () {
  "use strict";

  // Central business-data injection (see js/site-config.js).
  // Elements opt in via data-cfg (text) / data-cfg-href (link target).
  // Falls back to whatever static placeholder text already sits in the
  // HTML if a value is missing, empty, or JavaScript doesn't run at all.
  var LINK_KEYS = ["instagramUrl", "facebookUrl"];

  function applySiteConfig() {
    var cfg = window.SPK_CONFIG;
    if (!cfg || typeof cfg.isFilled !== "function") { return; }

    document.querySelectorAll("[data-cfg]").forEach(function (el) {
      var key = el.getAttribute("data-cfg");
      var val = cfg[key];
      if (cfg.isFilled(val)) {
        el.textContent = val;
        el.classList.remove("cfg-placeholder");
      }
    });

    document.querySelectorAll("[data-cfg-optional]").forEach(function (el) {
      var key = el.getAttribute("data-cfg-optional");
      if (cfg.isFilled(cfg[key])) { el.hidden = false; }
    });

    document.querySelectorAll("[data-cfg-href]").forEach(function (el) {
      var key = el.getAttribute("data-cfg-href");
      var val = cfg[key];
      if (!cfg.isFilled(val)) { return; }
      var href = val;
      if (key === "email") { href = "mailto:" + val; }
      else if (key === "phone") { href = "tel:" + val.replace(/\s+/g, ""); }
      el.setAttribute("href", href);
      el.classList.remove("cfg-placeholder");
      if (LINK_KEYS.indexOf(key) !== -1) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    });

    // Feed the contact form's mailto target from the central config.
    var form = document.getElementById("contact-form");
    if (form && cfg.isFilled(cfg.email)) {
      form.setAttribute("data-mailto", cfg.email);
    }
  }
  applySiteConfig();

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
    // Safety net: never leave content permanently invisible.
    window.setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }, 1200);
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Contact form (no backend on GitHub Pages: build a mailto: draft)
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();
      var status = document.getElementById("form-status");

      if (!name || !email || !message) {
        if (status) {
          status.textContent = "Bitte füllen Sie alle Felder aus.";
          status.classList.add("is-visible");
          status.classList.remove("ok");
        }
        return;
      }

      var to = form.getAttribute("data-mailto") || "";
      var subject = encodeURIComponent("Kooperationsanfrage über die Website");
      var body = encodeURIComponent(
        "Name: " + name + "\nE-Mail: " + email + "\n\nNachricht:\n" + message
      );
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;

      if (status) {
        status.textContent = "Ihr E-Mail-Programm wird geöffnet, um die Nachricht zu senden.";
        status.classList.add("is-visible", "ok");
      }
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
