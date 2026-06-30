/* ShopGym project page — interactions: copy buttons, mobile nav, active nav, figure lightbox */
(function () {
  "use strict";

  /* ---------- Copy to clipboard ---------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-copy-target");
      var target = document.getElementById(targetId);
      if (!target) return;
      var text = target.innerText;

      var done = function () {
        var label = btn.querySelector("span");
        var icon = btn.querySelector("i");
        var prevLabel = label ? label.textContent : "";
        var prevIcon = icon ? icon.className : "";
        btn.classList.add("copied");
        if (label) label.textContent = "Copied";
        if (icon) icon.className = "fa-solid fa-check";
        window.setTimeout(function () {
          btn.classList.remove("copied");
          if (label) label.textContent = prevLabel;
          if (icon) icon.className = prevIcon;
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          legacyCopy(text);
          done();
        });
      } else {
        legacyCopy(text);
        done();
      }
    });
  });

  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {
      /* no-op */
    }
    document.body.removeChild(ta);
  }

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Active section highlight ---------- */
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navAnchors
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navAnchors.forEach(function (a) {
              a.classList.toggle("active", a.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      observer.observe(s);
    });
  }

  /* ---------- YouTube facade (click to load) ---------- */
  document.querySelectorAll(".video-facade").forEach(function (facade) {
    facade.addEventListener("click", function () {
      var id = (facade.getAttribute("data-youtube-id") || "").trim();
      if (!id) return; /* placeholder: no video wired yet */
      var iframe = document.createElement("iframe");
      iframe.className = "video-frame";
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        encodeURIComponent(id) +
        "?autoplay=1&rel=0";
      iframe.title = facade.getAttribute("aria-label") || "Sandbox shop demo";
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      facade.replaceWith(iframe);
    });
  });

  /* ---------- Figure lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbClose = lightbox.querySelector(".lightbox-close");

    var zoomables = document.querySelectorAll(
      ".diagram img, .result-figure img, .struct img, .shot img, .hero-figure img"
    );
    zoomables.forEach(function (img) {
      img.addEventListener("click", function () {
        lbImg.src = img.currentSrc || img.src;
        lbImg.alt = img.alt || "";
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
      });
    });

    var hide = function () {
      lightbox.hidden = true;
      lbImg.src = "";
      document.body.style.overflow = "";
    };

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target === lbClose) hide();
    });
    if (lbClose) lbClose.addEventListener("click", hide);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) hide();
    });
  }
})();
