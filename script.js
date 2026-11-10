

/* ==========================
   IDSTITCHES - JAVASCRIPT
========================== */

// EDIT THESE DETAILS BEFORE PUBLISHING
const WHATSAPP_NUMBER = "2347077174037";
const INSTAGRAM_URL = "https://www.instagram.com/";

// MOBILE NAVIGATION
const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");

menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("active");

  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close menu after selecting a navigation link
navbar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// COLLECTION FILTERS
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    galleryItems.forEach(item => {
      const matches =
        filter === "all" ||
        item.dataset.category === filter;

      item.classList.toggle("hidden", !matches);
    });
  });
});

// SET THE CURRENT YEAR AUTOMATICALLY
document.getElementById("year").textContent =
  new Date().getFullYear();

// PREVENT SELECTING A PAST APPOINTMENT DATE
const dateInput = document.getElementById("date");

const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

// WHATSAPP LINKS
function openWhatsApp(message) {
  if (!/^234\d{10}$/.test(WHATSAPP_NUMBER)) {
    alert(
      "Please add the correct IDStitches WhatsApp number in script.js first."
    );
    return;
  }

  const url =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);

  window.open(url, "_blank", "noopener,noreferrer");
}

function openWhatsAppContact(event) {
  event.preventDefault();

  openWhatsApp(
    "Hello IDStitches! I would like to make an enquiry about your fashion services."
  );
}

document.getElementById("contact-whatsapp")
  .addEventListener("click", openWhatsAppContact);

document.getElementById("footer-whatsapp")
  .addEventListener("click", openWhatsAppContact);

// INSTAGRAM LINK
document.getElementById("instagram-link").href = INSTAGRAM_URL;

// APPOINTMENT BOOKING FORM
const bookingForm = document.getElementById("booking-form");
const formStatus = document.getElementById("form-status");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = dateInput.value || "Flexible";
  const budget = document.getElementById("budget").value || "Not specified";
  const message =
    document.getElementById("message").value.trim() ||
    "No additional details provided.";

  if (!name || !phone || !service) {
    formStatus.textContent =
      "Please complete all required fields.";
    return;
  }

  const bookingMessage = `
Hello IDStitches! I would like to request a fashion appointment.

CUSTOMER DETAILS
Name: ${name}
Phone: ${phone}

APPOINTMENT DETAILS
Service: ${service}
Preferred date: ${date}
Estimated budget: ${budget}

DESIGN DESCRIPTION
${message}

Please let me know your availability and the next steps. Thank you!
  `.trim();

  if (!/^234\d{10}$/.test(WHATSAPP_NUMBER)) {
    formStatus.textContent =
      "Please configure the WhatsApp number in script.js before submitting.";
    alert("The website owner needs to configure the WhatsApp number first.");
    return;
  }

  formStatus.textContent =
    "Opening WhatsApp to send your appointment request...";

  openWhatsApp(bookingMessage);
});

// BACK-TO-TOP BUTTON
const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});

// CLOSE MOBILE MENU WITH ESCAPE
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    navbar.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  }
});
