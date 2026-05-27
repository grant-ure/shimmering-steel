// Gallery + lightbox. Image list is read from the rendered thumbnails so the
// gallery stays fully data-driven (managed in the CMS), not hard-coded here.
const thumbs = Array.from(document.querySelectorAll(".gallery-thumb"));
const images = thumbs.map((t) => t.querySelector("img").getAttribute("src"));
let lbCurrent = 0;

thumbs.forEach((thumb, i) =>
  thumb.addEventListener("click", () => openLightbox(i))
);

function openLightbox(i) {
  lbCurrent = i;
  document.getElementById("lb-img").src = images[i];
  document.getElementById("lightbox").classList.add("open");
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}
function lbMove(dir) {
  if (!images.length) return;
  lbCurrent = (lbCurrent + dir + images.length) % images.length;
  document.getElementById("lb-img").src = images[lbCurrent];
}

function toggleMenu() {
  document.getElementById("hamburger").classList.toggle("open");
  document.getElementById("mobile-menu").classList.toggle("open");
}

// Single-page section switching. Sections, nav links, and mobile-menu links are
// matched by their `data-section` value / `#section-id`.
function showSection(id, fromMobile) {
  document
    .querySelectorAll(".content-section")
    .forEach((s) => s.classList.remove("active-section"));
  document
    .querySelectorAll(".nav-links a, .mobile-menu a")
    .forEach((a) => a.classList.remove("active"));

  const section = document.getElementById("section-" + id);
  if (section) section.classList.add("active-section");
  document
    .querySelectorAll('[data-section="' + id + '"]')
    .forEach((a) => a.classList.add("active"));

  if (fromMobile) {
    document.getElementById("hamburger").classList.remove("open");
    document.getElementById("mobile-menu").classList.remove("open");
  }
  window.scrollTo({ top: 0 });
}

// One delegated handler covers nav links, mobile-menu links, and any in-body
// link pointing at a section (e.g. a "contact us" link written as #contact).
document.addEventListener("click", (e) => {
  const navLink = e.target.closest("[data-section]");
  if (navLink) {
    e.preventDefault();
    showSection(
      navLink.getAttribute("data-section"),
      !!navLink.closest(".mobile-menu")
    );
    return;
  }
  const hashLink = e.target.closest('a[href^="#"]');
  if (hashLink) {
    const id = hashLink.getAttribute("href").slice(1);
    if (id && document.getElementById("section-" + id)) {
      e.preventDefault();
      showSection(id);
    }
  }
});

function submitForm() {
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const query = document.getElementById("query");

  let valid = true;

  function validate(field, errorId, condition) {
    const err = document.getElementById(errorId);
    if (condition) {
      field.classList.add("invalid");
      err.classList.add("visible");
      valid = false;
    } else {
      field.classList.remove("invalid");
      err.classList.remove("visible");
    }
  }

  validate(firstName, "err-first", !firstName.value.trim());
  validate(lastName, "err-last", !lastName.value.trim());
  validate(
    email,
    "err-email",
    !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
  );
  validate(query, "err-query", !query.value.trim());

  if (!valid) return;

  const subject = encodeURIComponent("Shimmering Steel Query");
  const body = encodeURIComponent(
    "First Name: " + firstName.value.trim() + "\n" +
      "Last Name: " + lastName.value.trim() + "\n" +
      "Email: " + email.value.trim() + "\n\n" +
      "Query:\n" + query.value.trim()
  );

  window.location.href =
    "mailto:info@shimmeringsteel.co.uk?subject=" + subject + "&body=" + body;
}
