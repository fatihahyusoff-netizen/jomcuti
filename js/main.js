(function () {
  const C = window.JOM_CUTI_CONTENT;
  if (!C) { console.error("Jom Cuti: content.js failed to load."); return; }
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $all = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  function money(n) { return "RM " + Number(Math.round(n)).toLocaleString("en-MY"); }
  function escapeHtml(str) { return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* SITE NAME / FOOTER */
  $("#site-name").textContent = C.site.name;
  document.title = C.site.name + " — " + C.site.tagline;
  $("#footer-text").innerHTML = escapeHtml(C.footer.text) + ' &middot; <a href="#booking">Plan your trip</a>';

  /* AD BANNER */
  (function renderAdBanner() {
    const mount = $("#ad-banner-mount");
    if (!C.adBanner || !C.adBanner.enabled) { mount.innerHTML = ""; return; }
    mount.innerHTML = `
      <div class="ad-banner">
        <div class="container">
          <p>${escapeHtml(C.adBanner.text)}</p>
          <a class="btn btn-secondary" href="${C.adBanner.ctaLink || "#booking"}">${escapeHtml(C.adBanner.ctaText || "Book Now")}</a>
        </div>
      </div>`;
  })();

  /* HERO */
  $("#hero-eyebrow").textContent = C.hero.eyebrow;
  $("#hero-headline").textContent = C.hero.headline;
  $("#hero-subheadline").textContent = C.hero.subheadline;
  $("#hero-btn-primary").textContent = C.hero.primaryButtonText;
  $("#hero-btn-secondary").textContent = C.hero.secondaryButtonText;
  $("#hero-stamps").innerHTML = (C.hero.floatingStamps || []).map((s, i) => `
      <div class="floating-stamp" data-stamp-index="${i}">
        <div class="stamp-badge">
          <span class="emoji">${s.emoji}</span>
          <span class="label">${escapeHtml(s.label)}</span>
        </div>
      </div>`).join("");

  // Clicking a floating hero stamp jumps straight to that destination's card.
  $("#hero-stamps").addEventListener("click", (e) => {
    const stamp = e.target.closest(".floating-stamp");
    if (!stamp) return;
    const idx = Number(stamp.getAttribute("data-stamp-index"));
    const label = (C.hero.floatingStamps[idx] || {}).label;
    const dest = C.destinations.find((d) => d.name === label);
    if (dest) {
      $("#destinations").scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        const card = $(`.dest-card[data-dest-id="${dest.id}"]`);
        if (card) { card.style.outline = "3px solid var(--hibiscus)"; setTimeout(() => (card.style.outline = ""), 1400); }
      }, 400);
    }
  });

  /* ---------------------------------------------------------------------
     DESTINATIONS + FILTER BAR
     --------------------------------------------------------------------- */
  function destMediaHtml(d) {
    if (d.image) return `<div class="dest-media" style="background-image:url('${d.image}')"></div>`;
    return `<div class="dest-media" style="background:${d.iconColor || "#0E7C7B"}"><span class="fallback-icon">${d.iconEmoji || "📍"}</span></div>`;
  }

  function directionsUrl(lat, lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  $("#destination-grid").innerHTML = C.destinations.map((d) => `
    <article class="dest-card" data-dest-id="${d.id}" data-category="${escapeHtml(d.category || "")}">
      ${destMediaHtml(d)}
      <div class="dest-postmark">JOM<br>CUTI</div>
      <div class="dest-body">
        <h3>${escapeHtml(d.name)}</h3>
        <div class="dest-state">${escapeHtml(d.state)}</div>
        <p>${escapeHtml(d.description)}</p>
        <div class="tag-row">${(d.tags || []).map((t) => `<span class="tag-pill">${escapeHtml(t)}</span>`).join("")}</div>
        <div class="dest-footer">
          <div class="dest-price"><span>From</span>${money(d.priceFrom)}</div>
          <div class="dest-btn-group">
            <button type="button" class="dest-map-btn" data-goto-map="${d.id}">📍 Map</button>
            <a class="dest-directions-btn" href="${directionsUrl(d.lat, d.lng)}" target="_blank" rel="noopener">🧭 Directions</a>
          </div>
        </div>
      </div>
    </article>`).join("");

  // Filter bar: "All" plus one button per unique category, built from content.js data.
  const categories = ["All", ...new Set(C.destinations.map((d) => d.category).filter(Boolean))];
  const filterBar = $("#filter-bar");
  filterBar.innerHTML = categories.map((cat, i) =>
    `<button type="button" class="filter-btn${i === 0 ? " active" : ""}" data-category="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`
  ).join("");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $all(".filter-btn").forEach((b) => b.classList.toggle("active", b === btn));
    const cat = btn.getAttribute("data-category");
    $all(".dest-card").forEach((card) => {
      const show = cat === "All" || card.getAttribute("data-category") === cat;
      card.classList.toggle("hidden-by-filter", !show);
    });
  });

  /* ---------------------------------------------------------------------
     MAP — tap a destination card or list item to load it on Google Maps
     --------------------------------------------------------------------- */
  const mapFrame = $("#map-frame");
  const mapList = $("#map-list");
  const directionsFloat = $("#map-directions-float");

  function embedUrl(lat, lng) { return `https://www.google.com/maps?q=${lat},${lng}&z=11&output=embed`; }
  function setActiveMapButton(destId) { $all(".map-list-btn").forEach((btn) => btn.classList.toggle("active", btn.dataset.destId === destId)); }

  function showOnMap(destId) {
    const d = C.destinations.find((x) => x.id === destId);
    if (!d) return;
    mapFrame.src = embedUrl(d.lat, d.lng);
    directionsFloat.href = directionsUrl(d.lat, d.lng);
    setActiveMapButton(destId);
  }

  mapList.innerHTML = C.destinations.map((d) => `
    <button type="button" class="map-list-btn" data-dest-id="${d.id}">
      <span class="dot" style="background:${d.iconColor}20">${d.iconEmoji}</span>
      ${escapeHtml(d.name)}
    </button>`).join("");

  mapList.addEventListener("click", (e) => { const btn = e.target.closest(".map-list-btn"); if (btn) showOnMap(btn.dataset.destId); });

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-goto-map]");
    if (!btn) return;
    showOnMap(btn.getAttribute("data-goto-map"));
    $("#map").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  if (C.destinations.length) showOnMap(C.destinations[0].id);

  /* ---------------------------------------------------------------------
     PACKAGES + SORT
     --------------------------------------------------------------------- */
  function renderPackages(list) {
    $("#package-grid").innerHTML = list.map((p) => {
      const dest = C.destinations.find((d) => d.id === p.destinationId);
      return `
        <article class="package-card" data-package-id="${p.id}">
          <div class="package-top">
            <div>
              <h3>${escapeHtml(p.name)}</h3>
              ${dest ? `<div class="dest-state">${escapeHtml(dest.name)}, ${escapeHtml(dest.state)}</div>` : ""}
            </div>
            <div class="package-nights"><strong>${p.nights}</strong><span>Nights</span></div>
          </div>
          <ul class="package-includes">${(p.includes || []).map((i) => `<li>${escapeHtml(i)}</li>`).join("")}</ul>
          <div class="package-footer">
            <div class="package-price"><span>From</span>${money(p.price)}</div>
            <button type="button" class="package-book-btn" data-book-package="${p.id}">Book This Package</button>
          </div>
        </article>`;
    }).join("");
  }

  renderPackages(C.packages);

  $("#package-sort").addEventListener("change", (e) => {
    const mode = e.target.value;
    const list = [...C.packages];
    if (mode === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (mode === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (mode === "nights-asc") list.sort((a, b) => a.nights - b.nights);
    renderPackages(list);
  });

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-book-package]");
    if (!btn) return;
    const pkg = C.packages.find((p) => p.id === btn.getAttribute("data-book-package"));
    $("#booking").scrollIntoView({ behavior: "smooth", block: "start" });
    if (pkg) {
      $("#input-package").value = pkg.id;
      if (pkg.destinationId) $("#input-destination").value = pkg.destinationId;
      updatePriceEstimate();
    }
  });

  /* ---------------------------------------------------------------------
     TRUST
     --------------------------------------------------------------------- */
  $("#trust-heading").textContent = C.trust.heading;
  $("#trust-subheading").textContent = C.trust.subheading;
  $("#trust-grid").innerHTML = C.trust.points.map((t) => `
    <div class="trust-item"><span class="emoji">${t.emoji}</span><h3>${escapeHtml(t.title)}</h3><p>${escapeHtml(t.text)}</p></div>`).join("");

  /* ---------------------------------------------------------------------
     TESTIMONIAL CAROUSEL
     --------------------------------------------------------------------- */
  $("#testimonials-heading").textContent = C.testimonialsHeading || "Traveller Stories";

  const track = $("#testimonial-track");
  const dotsWrap = $("#testimonial-dots");
  let currentSlide = 0;
  let autoplayTimer = null;

  track.innerHTML = C.testimonials.map((t) => {
    const stars = "★".repeat(t.rating) + "☆".repeat(Math.max(0, 5 - t.rating));
    return `
      <div class="testimonial-slide">
        <div class="testimonial-card">
          <div class="testimonial-stars">${stars}</div>
          <p class="quote">&ldquo;${escapeHtml(t.quote)}&rdquo;</p>
          <div class="testimonial-who">${escapeHtml(t.name)} <span>— ${escapeHtml(t.location)}</span></div>
        </div>
      </div>`;
  }).join("");

  dotsWrap.innerHTML = C.testimonials.map((_, i) => `<button type="button" class="carousel-dot${i === 0 ? " active" : ""}" data-slide="${i}" aria-label="Go to review ${i + 1}"></button>`).join("");

  function goToSlide(i) {
    const count = C.testimonials.length;
    currentSlide = (i + count) % count;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    $all(".carousel-dot").forEach((d, idx) => d.classList.toggle("active", idx === currentSlide));
  }

  function restartAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
  }

  $("#testimonial-prev").addEventListener("click", () => { goToSlide(currentSlide - 1); restartAutoplay(); });
  $("#testimonial-next").addEventListener("click", () => { goToSlide(currentSlide + 1); restartAutoplay(); });
  dotsWrap.addEventListener("click", (e) => {
    const dot = e.target.closest(".carousel-dot");
    if (!dot) return;
    goToSlide(Number(dot.getAttribute("data-slide")));
    restartAutoplay();
  });

  goToSlide(0);
  restartAutoplay();

  /* ---------------------------------------------------------------------
     BOOKING FORM
     --------------------------------------------------------------------- */
  $("#booking-heading").textContent = C.booking.heading;
  $("#booking-subheading").textContent = C.booking.subheading;

  const destSelect = $("#input-destination");
  destSelect.innerHTML = C.destinations.map((d) => `<option value="${d.id}">${escapeHtml(d.name)}, ${escapeHtml(d.state)}</option>`).join("");
  const packageSelect = $("#input-package");
  packageSelect.innerHTML += C.packages.map((p) => `<option value="${p.id}">${escapeHtml(p.name)} (${p.nights} nights)</option>`).join("");

  packageSelect.addEventListener("change", () => {
    const pkg = C.packages.find((p) => p.id === packageSelect.value);
    if (pkg && pkg.destinationId) destSelect.value = pkg.destinationId;
    updatePriceEstimate();
  });
  destSelect.addEventListener("change", updatePriceEstimate);
  $("#input-pax").addEventListener("input", updatePriceEstimate);

  /* --- Date pickers: real calendar inputs, no invalid ranges allowed --- */
  const departureInput = $("#input-departure");
  const returnInput = $("#input-return");
  const nightsDisplay = $("#nights-display");
  const submitBtn = $("#submit-btn");
  const emailBtn = $("#email-btn");
  const estimateBox = $("#price-estimate");
  const estimateAmount = $("#price-estimate-amount");

  function todayStr() { const t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset()); return t.toISOString().slice(0, 10); }
  function addDays(dateStr, days) { const d = new Date(dateStr + "T00:00:00"); d.setDate(d.getDate() + days); return d.toISOString().slice(0, 10); }
  function daysBetween(startStr, endStr) { const start = new Date(startStr + "T00:00:00"); const end = new Date(endStr + "T00:00:00"); return Math.round((end - start) / 86400000); }

  departureInput.min = todayStr();

  let currentNights = 0;

  function refreshDateConstraints() {
    if (departureInput.value) {
      returnInput.min = addDays(departureInput.value, 1);
      if (returnInput.value && returnInput.value <= departureInput.value) returnInput.value = "";
    } else {
      returnInput.min = todayStr();
    }
    updateNights();
  }

  function updateNights() {
    const dep = departureInput.value, ret = returnInput.value;
    if (!dep || !ret) {
      nightsDisplay.textContent = "Please select departure and return dates.";
      nightsDisplay.classList.remove("error");
      currentNights = 0;
      setButtonsEnabled(false);
      updatePriceEstimate();
      return;
    }
    const nights = daysBetween(dep, ret);
    if (nights <= 0) {
      nightsDisplay.textContent = "Return date must be after the departure date. Please adjust.";
      nightsDisplay.classList.add("error");
      currentNights = 0;
      setButtonsEnabled(false);
      updatePriceEstimate();
      return;
    }
    nightsDisplay.textContent = `🗓️ ${nights} night${nights > 1 ? "s" : ""} holiday`;
    nightsDisplay.classList.remove("error");
    currentNights = nights;
    setButtonsEnabled(true);
    updatePriceEstimate();
  }

  function setButtonsEnabled(enabled) {
    submitBtn.disabled = !enabled;
    emailBtn.disabled = !enabled;
  }

  function updatePriceEstimate() {
    if (!currentNights) { estimateBox.style.display = "none"; return; }
    const pax = Math.max(1, Number($("#input-pax").value) || 1);
    const dest = C.destinations.find((d) => d.id === destSelect.value);
    const pkg = C.packages.find((p) => p.id === packageSelect.value);
    const perPerson = pkg ? pkg.price : (dest ? dest.priceFrom * currentNights : 0);
    const total = perPerson * pax;
    estimateAmount.textContent = `Estimated total: ${money(total)}`;
    estimateBox.style.display = "block";
  }

  departureInput.addEventListener("change", refreshDateConstraints);
  returnInput.addEventListener("change", updateNights);

  /* --- Build the shared booking summary used by both WhatsApp and Email --- */
  function getBookingLines(introLine) {
    const name = $("#input-name").value.trim();
    const phone = $("#input-phone").value.trim();
    const email = $("#input-email").value.trim();
    const pax = $("#input-pax").value;
    const dep = departureInput.value;
    const ret = returnInput.value;
    const dest = C.destinations.find((d) => d.id === destSelect.value);
    const pkg = C.packages.find((p) => p.id === packageSelect.value);

    return [
      introLine, "",
      `Name: ${name}`,
      `Destination: ${dest ? dest.name : destSelect.value}`,
      pkg ? `Package: ${pkg.name}` : "Package: Not sure yet",
      `Dates: ${dep} to ${ret} (${currentNights} night${currentNights > 1 ? "s" : ""})`,
      `Travellers: ${pax}`,
      `WhatsApp: ${phone}`,
      `Email: ${email}`,
    ];
  }

  /* --- Send via WhatsApp --- */
  $("#booking-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn.disabled) return;
    const lines = getBookingLines(C.booking.whatsappMessageIntro);
    const message = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${C.site.whatsappNumber}?text=${message}`, "_blank", "noopener");
  });

  /* --- Send via Email (opens the visitor's own email app, addressed to us) --- */
  emailBtn.addEventListener("click", () => {
    if (emailBtn.disabled) return;
    const lines = getBookingLines(C.booking.emailIntro);
    const subject = encodeURIComponent(C.booking.emailSubject);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${C.site.bookingEmail}?subject=${subject}&body=${body}`;
  });

  refreshDateConstraints();
})();
