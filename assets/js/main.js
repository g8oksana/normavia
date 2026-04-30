(function () {
  "use strict";

  // ---------- MOBILE NAV TOGGLE ----------
  function initNavToggle() {
    var toggle = document.querySelector(".site-nav__toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) {
      return;
    }
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // ---------- FAQ ACCORDION ----------
  function initFaq() {
    var items = document.querySelectorAll(".faq__item");
    items.forEach(function (item) {
      var btn = item.querySelector(".faq__q");
      if (!btn) {
        return;
      }
      btn.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        // Single-open behavior: close any other open item first.
        items.forEach(function (other) {
          other.classList.remove("is-open");
          var b = other.querySelector(".faq__q");
          if (b) {
            b.setAttribute("aria-expanded", "false");
          }
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  // ---------- CONTACT FORM (mailto submission) ----------
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // Clear previous errors
      form.querySelectorAll(".form__field.has-error").forEach(function (f) {
        f.classList.remove("has-error");
      });

      var name = form.querySelector("[name='name']");
      var email = form.querySelector("[name='email']");
      var company = form.querySelector("[name='company']");
      var phone = form.querySelector("[name='phone']");
      var service = form.querySelector("[name='service']");
      var message = form.querySelector("[name='message']");

      var hasError = false;
      function flagError(input) {
        if (!input) {
          return;
        }
        var field = input.closest(".form__field");
        if (field) {
          field.classList.add("has-error");
        }
        hasError = true;
      }

      if (!name || !name.value.trim()) {
        flagError(name);
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        flagError(email);
      }
      if (!message || !message.value.trim()) {
        flagError(message);
      }
      if (hasError) {
        return;
      }

      var to = "info@normaviagroup.com";
      var subject = "Consultation request from " + name.value.trim();
      var bodyLines = [
        "Name: " + name.value.trim(),
        "Email: " + email.value.trim(),
        "Company: " + (company && company.value.trim() ? company.value.trim() : "(not provided)"),
        "Phone: " + (phone && phone.value.trim() ? phone.value.trim() : "(not provided)"),
        "Service of interest: " + (service && service.value ? service.value : "(not specified)"),
        "",
        "Message:",
        message.value.trim()
      ];
      var mailto = "mailto:" + to
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(bodyLines.join("\n"));
      window.location.href = mailto;

      form.classList.add("is-success");
    });
  }

  // ---------- INIT ----------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initNavToggle();
      initFaq();
      initContactForm();
    });
  } else {
    initNavToggle();
    initFaq();
    initContactForm();
  }
})();