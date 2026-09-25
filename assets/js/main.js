/* ----- NAVIGATION BAR FUNCTION ----- */
const navMenu = document.getElementById("myNavMenu");
const menuButton = document.querySelector(".nav-menu-btn");

function setMenuOpen(isOpen){
    navMenu.classList.toggle("responsive", isOpen);
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.querySelector("i").className = isOpen ? "uil uil-times" : "uil uil-bars";
}

function myMenuFunction(){
    setMenuOpen(!navMenu.classList.contains("responsive"));
}

/* close the mobile menu after picking a link, or with the Escape key */
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenuOpen(false);
});


/* ----- ADD SHADOW ON NAVIGATION BAR WHILE SCROLLING ----- */
const navHeader = document.getElementById("header");

function headerShadow(){
    navHeader.classList.toggle("scrolled", window.scrollY > 20);
}


/* ----- SCROLL PROGRESS BAR ----- */
function updateProgress(){
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    navHeader.style.setProperty("--progress", progress);
}


/* ----- CHANGE ACTIVE LINK ----- */
const sections = document.querySelectorAll("section[id]");

function scrollActive(){
    const scrollY = window.scrollY + navHeader.offsetHeight + 40;

    sections.forEach(current => {
        const link = document.querySelector(".nav-menu a[href='#" + current.id + "']");
        if (!link) return;

        const isInView = scrollY >= current.offsetTop && scrollY < current.offsetTop + current.offsetHeight;
        link.classList.toggle("active-link", isInView);
    });
}

window.addEventListener("scroll", () => {
    headerShadow();
    scrollActive();
    updateProgress();
});
headerShadow();
scrollActive();
updateProgress();


/* ----- SCROLL-IN ANIMATION ----- */
/* Elements with class "reveal" fade in the first time they scroll into view */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window){
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
} else {
    revealElements.forEach(el => el.classList.add("is-visible"));
}


/* ----- CARD SPOTLIGHT ----- */
/* Tells each card where the mouse is, so the CSS glow can follow it */
document.querySelectorAll(".spotlight").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
});


/* ----- COPY EMAIL BUTTON ----- */
document.querySelectorAll(".copy-btn").forEach(button => {
    const label = button.querySelector("span");
    button.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(button.dataset.copy);
            label.textContent = "Copied!";
        } catch {
            label.textContent = button.dataset.copy;
        }
        setTimeout(() => { label.textContent = "Copy email"; }, 2000);
    });
});


/* ----- CONTACT FORM ----- */
/* No backend: opens the visitor's mail app with the message filled in */
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const subject = encodeURIComponent("Portfolio enquiry from " + data.get("name"));
    const body = encodeURIComponent(data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")");
    window.location.href = "mailto:" + contactForm.dataset.email + "?subject=" + subject + "&body=" + body;
});


/* ----- FOOTER YEAR ----- */
document.getElementById("year").textContent = new Date().getFullYear();
