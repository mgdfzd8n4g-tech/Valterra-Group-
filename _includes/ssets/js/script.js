// =========================================
// VALTERRA GROUP & CO.
// PREMIUM WEBSITE JAVASCRIPT
// =========================================

document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // =====================================
    // MOBILE NAVIGATION
    // =====================================

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    function closeMenu() {
        if (!menuButton || !navigation) return;

        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "☰";
    }

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const open = navigation.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(open));
            menuButton.setAttribute(
                "aria-label",
                open ? "Close navigation" : "Open navigation"
            );

            menuButton.textContent = open ? "✕" : "☰";

        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) closeMenu();
        });

    }


    // =====================================
    // COPYRIGHT YEAR
    // =====================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =====================================
    // SCROLL REVEAL
    // =====================================

    const revealElements = document.querySelectorAll(
        ".reveal, .service-card, .price-card"
    );

    if ("IntersectionObserver" in window && !reducedMotion) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element, index) => {

            element.classList.add("reveal");
            element.style.transitionDelay =
                `${(index % 4) * 100}ms`;

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    const header = document.querySelector(".header");

    if (header) {

        const updateHeader = () => {
            header.classList.toggle("scrolled", window.scrollY > 40);
        };

        updateHeader();

        window.addEventListener("scroll", updateHeader, {
            passive: true
        });

    }


    // =====================================
    // FLOATING PARTICLES
    // =====================================

    const hero = document.querySelector(".hero");

    if (hero && !reducedMotion) {

        const particleContainer = document.createElement("div");

        particleContainer.className = "particle-container";
        particleContainer.setAttribute("aria-hidden", "true");

        hero.appendChild(particleContainer);

        const particleCount = window.innerWidth < 600 ? 12 : 25;

        for (let i = 0; i < particleCount; i++) {

            const particle = document.createElement("span");

            particle.className = "particle";

            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${6 + Math.random() * 10}s`;

            particle.style.animationDelay =
                `${Math.random() * 6}s`;

            particleContainer.appendChild(particle);

        }

    }


    // =====================================
    // PRICING PACKAGE SELECTION
    // =====================================

    const packageInput = document.getElementById("package");

    document.querySelectorAll("[data-plan]").forEach(button => {

        button.addEventListener("click", () => {

            const selectedPlan = button.dataset.plan;

            if (packageInput) {
                packageInput.value = selectedPlan;
            }

        });

    });


    // =====================================
    // READ PACKAGE FROM URL
    // =====================================

    if (packageInput) {

        const params = new URLSearchParams(window.location.search);
        const requestedPackage = params.get("package");

        const allowedPackages = [
            "Essential",
            "Growth",
            "Elite"
        ];

        if (allowedPackages.includes(requestedPackage)) {
            packageInput.value = requestedPackage;
        }

    }


    // =====================================
    // CONTACT FORM
    // =====================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const name = document.getElementById("name").value.trim();
            const business = document.getElementById("business").value.trim();
            const email = document.getElementById("email").value.trim();
            const selectedPackage = packageInput?.value || "Not selected";
            const message = document.getElementById("message").value.trim();

            const subject = encodeURIComponent(
                "New Business Enquiry - Valterra Group & Co."
            );

            const body = encodeURIComponent(
`NEW WEBSITE ENQUIRY

Name: ${name}
Business: ${business}
Email: ${email}
Package: ${selectedPackage}

Message:
${message}

Valterra Group & Co.
Building Beyond Boundaries.`
            );

            // REPLACE WITH YOUR REAL BUSINESS EMAIL
            const businessEmail = "hello@yourdomain.co.za";

            window.location.href =
                `mailto:${businessEmail}?subject=${subject}&body=${body}`;

        });

    }

});
