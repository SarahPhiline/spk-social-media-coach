// SPK — shared site behaviour (no build step, no dependencies)

(function () {
  "use strict";

  // Central business-data injection (see js/site-config.js).
  // Elements opt in via data-cfg (text) / data-cfg-href (link target).
  // Falls back to whatever static placeholder text already sits in the
  // HTML if a value is missing, empty, or JavaScript doesn't run at all.
  var LINK_KEYS = ["instagramUrl", "facebookUrl", "tiktokUrl"];

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

    // Privacy policy: show the paragraph matching the active contact-form
    // mode, so the legal text never describes a setup that isn't in use.
    var usesEndpoint = cfg.isFilled(cfg.contactFormEndpoint);
    document.querySelectorAll("[data-form-mode]").forEach(function (el) {
      var mode = el.getAttribute("data-form-mode");
      el.hidden = usesEndpoint ? (mode !== "endpoint") : (mode !== "mailto");
    });

    // Social-media stats: only show the block once at least one real number
    // is configured. Otherwise it would display a row of "—" and look
    // unfinished to sponsors.
    var statsBlock = document.getElementById("social-stats");
    if (statsBlock) {
      var statKeys = [
        "instagramFollowers", "instagramEngagement",
        "facebookFollowers", "facebookEngagement",
        "tiktokFollowers", "tiktokEngagement"
      ];
      for (var i = 0; i < statKeys.length; i++) {
        if (cfg.isFilled(cfg[statKeys[i]])) { statsBlock.hidden = false; break; }
      }
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

  // ---------------------------------------------------------------
  // Contact form
  // ---------------------------------------------------------------
  // Two modes, depending on whether a form endpoint is configured in
  // js/site-config.js (contactFormEndpoint):
  //
  //   1. Endpoint configured  -> the message is POSTed and really sent.
  //      The visitor stays on the page and gets a confirmation.
  //   2. No endpoint          -> falls back to opening the visitor's local
  //      mail program via mailto:. This works for some visitors but NOT for
  //      people using webmail in the browser, so mode 1 is strongly
  //      preferred for a business site. See README, section 4c.
  // ---------------------------------------------------------------
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var statusEl = document.getElementById("form-status");
    var submitBtn = contactForm.querySelector('button[type="submit"]');
    var submitBtnLabel = submitBtn ? submitBtn.innerHTML : "";

    function setStatus(text, isOk) {
      if (!statusEl) { return; }
      statusEl.textContent = text;
      statusEl.classList.add("is-visible");
      if (isOk) { statusEl.classList.add("ok"); }
      else { statusEl.classList.remove("ok"); }
    }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = contactForm.elements["name"].value.trim();
      var email = contactForm.elements["email"].value.trim();
      var message = contactForm.elements["message"].value.trim();

      // Honeypot: real people never fill this hidden field, bots often do.
      var trap = contactForm.elements["website"];
      if (trap && trap.value) { return; }

      if (!name || !email || !message) {
        setStatus("Bitte füllen Sie alle Felder aus.", false);
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("Bitte geben Sie eine gültige E-Mail-Adresse an.", false);
        return;
      }

      var cfg = window.SPK_CONFIG;
      var endpoint = cfg && cfg.isFilled(cfg.contactFormEndpoint)
        ? cfg.contactFormEndpoint
        : "";

      // --- Mode 1: real submission via form endpoint ---
      if (endpoint) {
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Wird gesendet …"; }
        setStatus("Nachricht wird gesendet …", false);

        var payload = {
          name: name,
          email: email,
          message: message,
          subject: "Neue Anfrage über die SPK-Website"
        };
        // Some providers (e.g. Web3Forms) expect the key inside the payload.
        if (cfg.isFilled(cfg.contactFormAccessKey)) {
          payload.access_key = cfg.contactFormAccessKey;
        }

        fetch(endpoint, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            if (!res.ok) { throw new Error("HTTP " + res.status); }
            contactForm.reset();
            setStatus("Vielen Dank für Ihre Nachricht! Wir melden uns zeitnah bei Ihnen.", true);
          })
          .catch(function () {
            setStatus(
              "Die Nachricht konnte gerade nicht gesendet werden. Bitte versuchen Sie es später noch einmal.",
              false
            );
          })
          .then(function () {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitBtnLabel; }
          });
        return;
      }

      // --- Mode 2: fallback to the visitor's local mail program ---
      var to = contactForm.getAttribute("data-mailto") || "";
      var subject = encodeURIComponent("Kooperationsanfrage über die Website");
      var body = encodeURIComponent(
        "Name: " + name + "\nE-Mail: " + email + "\n\nNachricht:\n" + message
      );
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
      setStatus("Ihr E-Mail-Programm wird geöffnet, um die Nachricht zu senden.", true);
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
