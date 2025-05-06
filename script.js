document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.getElementById("mobile-menu");
  const mobileNav = document.getElementById("mobile-nav");

  const toggleMobileNav = () => {
    const isOpen = mobileNav.classList.toggle("show");
    mobileNav.style.transform = isOpen ? "translateX(0)" : "translateX(-100%)";
    mobileNav.style.opacity = isOpen ? "1" : "0";
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", toggleMobileNav);
    mobileNav.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => {
        mobileNav.classList.remove("show");
        mobileNav.style.transform = "translateX(-100%)";
        mobileNav.style.opacity = "0";
      })
    );
  }

  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  const setTheme = (isDark) => {
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  setTheme(savedTheme === "dark" || (!savedTheme && prefersDark));

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark-mode");
      setTheme(isDark);
    });
  }


  const btn = document.getElementById("btn");
  const colorText = document.querySelector(".color");
  const header = document.querySelector("header");

  const generateHexColor = () =>
    "#" + Array.from({ length: 6 }, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("");

  const getBrightness = (hex) => {
    const [r, g, b] = [1, 3, 5].map(pos => parseInt(hex.substr(pos, 2), 16));
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const updateBackgroundColor = () => {
    const newColor = generateHexColor();
    document.body.style.backgroundColor = newColor;
    if (colorText) colorText.textContent = newColor;

    const isDark = getBrightness(newColor) < 128;
    header.classList.toggle("nav-dark", isDark);
    header.classList.toggle("nav-light", !isDark);
  };

  if (btn) {
    btn.addEventListener("click", () => {
      btn.classList.add("changing-color");
      setTimeout(() => {
        updateBackgroundColor();
        btn.classList.remove("changing-color");
      }, 300);
    });
  }


  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const submitButton = contactForm?.querySelector("button[type='submit']");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!window.emailjs) return;

    submitButton.setAttribute("disabled", true);
    submitButton.innerHTML = "<span class='spinner'></span> Enviando...";

    emailjs.sendForm("service_v207u8b", "template_3hanzp7", contactForm)
      .then(() => {
        formMessage.textContent = "✅ Mensaje enviado correctamente.";
        formMessage.style.color = "green";
        formMessage.classList.add("fade-in");
        contactForm.reset();
      })
      .catch(() => {
        formMessage.textContent = "❌ Error al enviar el mensaje.";
        formMessage.style.color = "red";
        formMessage.classList.add("fade-in");
      })
      .finally(() => {
        submitButton.removeAttribute("disabled");
        submitButton.textContent = "Enviar";
      });
  };

  if (contactForm) {
    emailjs.init("7bzGX3KoSiEyQujpr");
    contactForm.addEventListener("submit", handleFormSubmit);
  }
});