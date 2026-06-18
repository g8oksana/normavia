(function () {
  "use strict";

  if (window.location.protocol === "http:" && /(^|\.)norma-via\.com$/i.test(window.location.hostname)) {
    window.location.replace("https://" + window.location.host + window.location.pathname + window.location.search + window.location.hash);
    return;
  }

  // ---------- MICROSOFT CLARITY ANALYTICS ----------
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "x8kkhyarkw");

  // ---------- GOOGLE ANALYTICS (GA4) ----------
  (function (id) {
    var s = document.createElement("script");
    s.async = 1; s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);
  })("G-PE77H6YCF6");

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

  // ---------- CONTACT FORM ----------
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
      var message = form.querySelector("[name='message']");
      var website = form.querySelector("[name='website']");
      var status = form.querySelector("[data-contact-status]");
      var submitButton = form.querySelector("[type='submit']");

      form.classList.remove("is-success", "is-error");

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

      var payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        company: company && company.value.trim() ? company.value.trim() : "",
        phone: phone && phone.value.trim() ? phone.value.trim() : "",
        message: message.value.trim(),
        website: website && website.value.trim() ? website.value.trim() : ""
      };

      form.classList.add("is-submitting");
      if (submitButton) {
        submitButton.textContent = "Sending...";
      }

      fetch(form.getAttribute("action") || "https://lemon-field-0e2e1601e.7.azurestaticapps.net/api/contact", {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=UTF-8" },
        body: JSON.stringify(payload)
      }).then(function (response) {
        if (!response.ok) {
          throw new Error("Contact request failed with status " + response.status);
        }
        form.reset();
        if (status) {
          status.textContent = "Thanks — your message was sent. We'll reply soon.";
        }
        form.classList.add("is-success");
      }).catch(function () {
        if (status) {
          status.innerHTML = "Sorry, the message could not be sent. Please email us directly at <a href=\"mailto:oksana@norma-via.com\">oksana@norma-via.com</a>.";
        }
        form.classList.add("is-error");
      }).finally(function () {
        form.classList.remove("is-submitting");
        if (submitButton) {
          submitButton.textContent = "Send message";
        }
      });
    });
  }

  // ---------- TESTIMONIAL CAROUSEL ----------
  function initTestimonialCarousels() {
    document.querySelectorAll("[data-testimonial-carousel]").forEach(function (carousel) {
      var viewport = carousel.querySelector(".testimonial-carousel__viewport");
      var slides = Array.prototype.slice.call(carousel.querySelectorAll(".testimonial-card"));
      var prev = carousel.querySelector("[data-carousel-prev]");
      var next = carousel.querySelector("[data-carousel-next]");
      var dotsContainer = carousel.querySelector("[data-carousel-dots]");
      if (!viewport || !slides.length || !prev || !next || !dotsContainer) {
        return;
      }

      var activeIndex = 0;
      var autoplayDelay = 4500;
      var autoplayTimer = null;
      var dots = slides.map(function (_slide, index) {
        var dot = document.createElement("button");
        dot.className = "testimonial-carousel__dot";
        dot.type = "button";
        dot.setAttribute("aria-label", "Show testimonial " + (index + 1));
        dot.addEventListener("click", function () {
          scrollToSlide(index);
          restartAutoplay();
        });
        dotsContainer.appendChild(dot);
        return dot;
      });

      function setActive(index) {
        activeIndex = Math.max(0, Math.min(index, slides.length - 1));
        dots.forEach(function (dot, dotIndex) {
          dot.classList.toggle("is-active", dotIndex === activeIndex);
          dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
        });
      }

      function scrollToSlide(index) {
        var targetIndex = (index + slides.length) % slides.length;
        viewport.scrollTo({
          left: slides[targetIndex].offsetLeft - slides[0].offsetLeft,
          behavior: "smooth"
        });
        setActive(targetIndex);
      }

      function startAutoplay() {
        if (autoplayTimer || slides.length < 2) {
          return;
        }
        autoplayTimer = window.setInterval(function () {
          scrollToSlide(activeIndex + 1);
        }, autoplayDelay);
      }

      function stopAutoplay() {
        if (!autoplayTimer) {
          return;
        }
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }

      function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
      }

      function updateActiveFromScroll() {
        var closestIndex = 0;
        var closestDistance = Infinity;
        slides.forEach(function (slide, index) {
          var distance = Math.abs((slide.offsetLeft - slides[0].offsetLeft) - viewport.scrollLeft);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        setActive(closestIndex);
      }

      prev.addEventListener("click", function () {
        scrollToSlide(activeIndex - 1);
        restartAutoplay();
      });
      next.addEventListener("click", function () {
        scrollToSlide(activeIndex + 1);
        restartAutoplay();
      });
      viewport.addEventListener("scroll", updateActiveFromScroll);
      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);
      window.addEventListener("resize", function () {
        scrollToSlide(activeIndex);
      });
      setActive(0);
      startAutoplay();
    });
  }

  // ---------- INIT ----------
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initNavToggle();
      initFaq();
      initContactForm();
      initTestimonialCarousels();
    });
  } else {
    initNavToggle();
    initFaq();
    initContactForm();
    initTestimonialCarousels();
  }
})();