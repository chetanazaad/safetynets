document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       1. Mobile Navigation & Sticky Header
       ========================================================================== */
    const header = document.querySelector(".header-main");
    const mobileMenuToggle = document.querySelector(".mobile-nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    // Consolidated & Throttled Scroll Listener (Sticky Header & Back to Top)
    const backToTop = document.querySelector(".back-to-top");
    let scrollTicking = false;
    let isScrolledState = false;

    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;

        // Sticky Header with Hysteresis (prevents layout bouncing & flickering)
        if (header) {
            if (!isScrolledState && scrollY > 120) {
                header.classList.add("scrolled");
                isScrolledState = true;
            } else if (isScrolledState && scrollY < 20) {
                header.classList.remove("scrolled");
                isScrolledState = false;
            }
        }

        // Back to Top Button
        if (backToTop) {
            if (scrollY > 400) {
                if (!backToTop.classList.contains("show")) {
                    backToTop.classList.add("show");
                }
            } else {
                if (backToTop.classList.contains("show")) {
                    backToTop.classList.remove("show");
                }
            }
        }

        scrollTicking = false;
    }

    window.addEventListener("scroll", () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(handleScroll);
            scrollTicking = true;
        }
    }, { passive: true });

    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            const icon = mobileMenuToggle.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll(".nav-item");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show");
                const icon = mobileMenuToggle.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-times");
                }
            });
        });
    }

    /* ==========================================================================
       2. Scrollspy Navigation (Optimized via IntersectionObserver)
       ========================================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-item[href*='#']");

    if (sections.length > 0 && navItems.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px", // Triggers active state when section occupies mid-viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navItems.forEach(item => {
                        if (item.getAttribute("href").includes(id)) {
                            item.classList.add("active-link");
                        } else {
                            item.classList.remove("active-link");
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    /* ==========================================================================
       3. Hero Image Slider (Homepage)
       ========================================================================== */
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".slider-dot");
    const prevBtn = document.querySelector(".slider-arrow-prev");
    const nextBtn = document.querySelector(".slider-arrow-next");
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove("active"));
            dots.forEach(dot => dot.classList.remove("active"));

            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add("active");
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add("active");
            }
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 4000);
        }

        function resetSlideShow() {
            clearInterval(slideInterval);
            startSlideShow();
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                nextSlide();
                resetSlideShow();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                prevSlide();
                resetSlideShow();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
                resetSlideShow();
            });
        });

        // Initialize slideshow
        startSlideShow();
    }

    /* ==========================================================================
       4. Before/After Comparison Image Slider
       ========================================================================== */
    const baContainer = document.querySelector(".before-after-container");
    const baAfter = document.querySelector(".ba-after");
    const baHandle = document.querySelector(".ba-handle");

    if (baContainer && baAfter && baHandle) {
        let isDragging = false;

        function setSliderPosition(x) {
            const rect = baContainer.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            // Constrain between 0% and 100%
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            baAfter.style.width = `${position}%`;
            baHandle.style.left = `${position}%`;
        }

        // Mouse Events
        baHandle.addEventListener("mousedown", () => {
            isDragging = true;
        });

        window.addEventListener("mouseup", () => {
            isDragging = false;
        });

        window.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            setSliderPosition(e.clientX);
        });

        // Touch Events for Mobile
        baHandle.addEventListener("touchstart", () => {
            isDragging = true;
        });

        window.addEventListener("touchend", () => {
            isDragging = false;
        });

        window.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            setSliderPosition(e.touches[0].clientX);
        });
    }

    /* ==========================================================================
       5. FAQ Accordion
       ========================================================================== */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const trigger = item.querySelector(".faq-trigger");
        const content = item.querySelector(".faq-content");

        if (trigger && content) {
            trigger.addEventListener("click", () => {
                const isActive = item.classList.contains("active");

                // Collapse all FAQs
                faqItems.forEach(i => {
                    i.classList.remove("active");
                    const c = i.querySelector(".faq-content");
                    if (c) c.style.maxHeight = null;
                });

                // Toggle selected
                if (!isActive) {
                    item.classList.add("active");
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });

    /* ==========================================================================
       6. Contact Form Validation & Success Modal
       ========================================================================== */
    const contactForms = document.querySelectorAll(".quote-form");
    const modal = document.querySelector(".modal-overlay");
    const modalClose = document.querySelector(".modal-close-btn");

    contactForms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Inputs relative to this form
            const nameInput = form.querySelector("#full-name");
            const phoneInput = form.querySelector("#phone-number");
            const citySelect = form.querySelector("#city-location");
            const serviceSelect = form.querySelector("#service-needed");

            let isValid = true;

            // Name check
            if (nameInput) {
                if (nameInput.value.trim().length < 2) {
                    nameInput.style.borderColor = "red";
                    isValid = false;
                } else {
                    nameInput.style.borderColor = "";
                }
            }

            // Phone check (10 digits Indian mobile)
            if (phoneInput) {
                let phoneVal = phoneInput.value.trim().replace(/\D/g, "");
                // If user accidentally included +91 and length is 12, strip the 91
                if (phoneVal.length === 12 && phoneVal.startsWith("91")) {
                    phoneVal = phoneVal.substring(2);
                }
                if (phoneVal.length !== 10) {
                    phoneInput.style.borderColor = "red";
                    isValid = false;
                } else {
                    phoneInput.style.borderColor = "";
                }
            }

            // City dropdown check
            if (citySelect) {
                if (!citySelect.value) {
                    citySelect.style.borderColor = "red";
                    isValid = false;
                } else {
                    citySelect.style.borderColor = "";
                }
            }

            // Service dropdown check
            if (serviceSelect) {
                if (!serviceSelect.value) {
                    serviceSelect.style.borderColor = "red";
                    isValid = false;
                } else {
                    serviceSelect.style.borderColor = "";
                }
            }

            if (isValid) {
                // Collect form data
                const name = nameInput ? nameInput.value.trim() : "";
                const phone = phoneInput ? phoneInput.value.trim() : "";
                const city = citySelect ? citySelect.options[citySelect.selectedIndex].text : "";
                const service = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex].text : "";
                const pageName = document.title || "GAR Safety Nets Website";

                // Build WhatsApp message
                const waMessage = `Hi GAR Safety Nets,%0A%0AI'd like to request a quote.%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*City:* ${encodeURIComponent(city)}%0A*Service:* ${encodeURIComponent(service)}%0A*Submitted from:* ${encodeURIComponent(pageName)}%0A%0APlease get back to me. Thank you!`;
                const waLink = `https://wa.me/9193928 51602?text=${waMessage}`;

                // Build Email mailto link
                const emailSubject = encodeURIComponent(`Quote Request – ${service} in ${city}`);
                const emailBody = encodeURIComponent(`Hello GAR Safety Nets,\n\nI'd like to request a quote for your services.\n\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nService: ${service}\nSubmitted from: ${pageName}\n\nPlease get back to me at your earliest convenience.\n\nThank you!`);
                const emailLink = `mailto:rachelgarikina@gmail.com?subject=${emailSubject}&body=${emailBody}`;

                // Update modal links
                const modalWaBtn = document.querySelector("#modal-wa-link");
                const modalEmailBtn = document.querySelector("#modal-email-link");
                if (modalWaBtn) modalWaBtn.href = waLink;
                if (modalEmailBtn) modalEmailBtn.href = emailLink;

                // Show the choice modal
                if (modal) {
                    modal.classList.add("show");
                }
                form.reset();
            }
        });
    });

    // Populate all general WhatsApp links with a default predefined message if they don't have one
    const defaultMsg = "Hi GAR Safety Nets, I'd like to get in touch regarding safety netting installation. Please assist me.";
    const waLinks = document.querySelectorAll("a[href*='wa.me/9193928 51602']");
    waLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href && !href.includes("?text=") && !href.includes("&text=")) {
            const separator = href.includes("?") ? "&" : "?";
            link.setAttribute("href", `${href}${separator}text=${encodeURIComponent(defaultMsg)}`);
        }
    });

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("show");
        });
        
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
    }

    /* ==========================================================================
       7. Back to Top Button
       ========================================================================== */
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* ==========================================================================
       8. Dynamic Cities Phone Update (Optional Enhancement)
       ========================================================================== */
    const citySelectors = document.querySelectorAll(".city-contact-update");
    const headerPhoneSpan = document.querySelector(".header-phone-span");
    const headerPhoneLink = document.querySelector(".header-phone-link");

    const cityContacts = {
        "Bangalore": { phone: "+91 93928 51602", whatsapp: "9193928 51602" },
        "Hyderabad": { phone: "+91 93928 51602", whatsapp: "9193928 51602" },
        "Vizag": { phone: "+91 93928 51602", whatsapp: "9193928 51602" },
        "Bhubaneswar": { phone: "+91 93928 51602", whatsapp: "9193928 51602" }
    };

    if (citySelectors.length > 0 && headerPhoneSpan) {
        citySelectors.forEach(select => {
            select.addEventListener("change", (e) => {
                const selectedCity = e.target.value;
                if (cityContacts[selectedCity]) {
                    headerPhoneSpan.textContent = cityContacts[selectedCity].phone;
                    if (headerPhoneLink) {
                        headerPhoneLink.setAttribute("href", `tel:${cityContacts[selectedCity].phone.replace(/\s/g, "")}`);
                    }
                }
            });
        });
    }

    /* ==========================================================================
       9. Dynamic Liquid Gradients Button Initialization
       ========================================================================== */
    const injectSvgGradients = () => {
        if (document.getElementById("liquid-gradients-svg")) return;
        const div = document.createElement("div");
        div.innerHTML = `
            <svg id="liquid-gradients-svg" style="position: absolute; width: 0; height: 0; overflow: hidden;" width="0" height="0">
                <defs>
                    <!-- Brand Blue Gradients -->
                    <radialGradient id="liq-grad-1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#073080" />
                        <stop offset="40%" stop-color="#0ea5e9" />
                        <stop offset="75%" stop-color="#90d9f9" />
                        <stop offset="100%" stop-color="#0a1929" />
                    </radialGradient>
                    <radialGradient id="liq-grad-2" cx="40%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#0a1929" />
                        <stop offset="40%" stop-color="#073080" />
                        <stop offset="80%" stop-color="#90d9f9" />
                        <stop offset="100%" stop-color="#0ea5e9" />
                    </radialGradient>
                    <radialGradient id="liq-grad-3" cx="60%" cy="30%" r="50%">
                        <stop offset="0%" stop-color="#0ea5e9" />
                        <stop offset="50%" stop-color="#073080" />
                        <stop offset="100%" stop-color="#90d9f9" />
                    </radialGradient>
                    <radialGradient id="liq-grad-4" cx="30%" cy="70%" r="50%">
                        <stop offset="0%" stop-color="#90d9f9" />
                        <stop offset="60%" stop-color="#073080" />
                        <stop offset="100%" stop-color="#0a1929" />
                    </radialGradient>
                    
                    <!-- WhatsApp Green Gradients -->
                    <radialGradient id="liq-grad-wa-1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#075e54" />
                        <stop offset="40%" stop-color="#128c7e" />
                        <stop offset="75%" stop-color="#25d366" />
                        <stop offset="100%" stop-color="#053e37" />
                    </radialGradient>
                    <radialGradient id="liq-grad-wa-2" cx="40%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#053e37" />
                        <stop offset="40%" stop-color="#075e54" />
                        <stop offset="80%" stop-color="#25d366" />
                        <stop offset="100%" stop-color="#128c7e" />
                    </radialGradient>
                    <radialGradient id="liq-grad-wa-3" cx="60%" cy="30%" r="50%">
                        <stop offset="0%" stop-color="#128c7e" />
                        <stop offset="50%" stop-color="#075e54" />
                        <stop offset="100%" stop-color="#25d366" />
                    </radialGradient>
                    <radialGradient id="liq-grad-wa-4" cx="30%" cy="70%" r="50%">
                        <stop offset="0%" stop-color="#25d366" />
                        <stop offset="60%" stop-color="#075e54" />
                        <stop offset="100%" stop-color="#053e37" />
                    </radialGradient>

                    <!-- White/Subtle Gradients -->
                    <radialGradient id="liq-grad-white-1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#cbd5e1" />
                        <stop offset="40%" stop-color="#e2e8f0" />
                        <stop offset="75%" stop-color="#f8fafc" />
                        <stop offset="100%" stop-color="#94a3b8" />
                    </radialGradient>
                    <radialGradient id="liq-grad-white-2" cx="40%" cy="40%" r="55%">
                        <stop offset="0%" stop-color="#94a3b8" />
                        <stop offset="40%" stop-color="#cbd5e1" />
                        <stop offset="80%" stop-color="#f8fafc" />
                        <stop offset="100%" stop-color="#e2e8f0" />
                    </radialGradient>
                    <radialGradient id="liq-grad-white-3" cx="60%" cy="30%" r="50%">
                        <stop offset="0%" stop-color="#e2e8f0" />
                        <stop offset="50%" stop-color="#cbd5e1" />
                        <stop offset="100%" stop-color="#f8fafc" />
                    </radialGradient>
                    <radialGradient id="liq-grad-white-4" cx="30%" cy="70%" r="50%">
                        <stop offset="0%" stop-color="#f8fafc" />
                        <stop offset="60%" stop-color="#cbd5e1" />
                        <stop offset="100%" stop-color="#94a3b8" />
                    </radialGradient>
                </defs>
            </svg>
        `;
        document.body.insertBefore(div.firstElementChild, document.body.firstChild);
    };

    injectSvgGradients();

    const buttons = document.querySelectorAll(".btn:not(.btn-wp):not(.btn-gooey-dynamic):not(.mobile-sticky-item):not([href*='wa.me']):not([href*='tel:'])");
    buttons.forEach(btn => {
        if (btn.querySelector(".liquid-wrapper")) return;

        // Wrap existing content inside a span.btn-text
        const btnText = document.createElement("span");
        btnText.className = "btn-text";
        while (btn.firstChild) {
            btnText.appendChild(btn.firstChild);
        }

        // Detect gradient IDs depending on classes
        let g1 = "liq-grad-1", g2 = "liq-grad-2", g3 = "liq-grad-3", g4 = "liq-grad-4";
        if (btn.classList.contains("btn-wp")) {
            g1 = "liq-grad-wa-1";
            g2 = "liq-grad-wa-2";
            g3 = "liq-grad-wa-3";
            g4 = "liq-grad-wa-4";
        } else if (btn.classList.contains("btn-white") || btn.classList.contains("btn-outline")) {
            g1 = "liq-grad-white-1";
            g2 = "liq-grad-white-2";
            g3 = "liq-grad-white-3";
            g4 = "liq-grad-white-4";
        }

        // Create liquid wrapper
        const liquidWrapper = document.createElement("span");
        liquidWrapper.className = "liquid-wrapper";
        liquidWrapper.innerHTML = `
            <svg class="liquid-layer layer-0" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g1})"/></svg>
            <svg class="liquid-layer layer-1" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g2})"/></svg>
            <svg class="liquid-layer layer-2" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g3})"/></svg>
            <svg class="liquid-layer layer-3" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g4})"/></svg>
            <svg class="liquid-layer layer-4" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g1})"/></svg>
            <svg class="liquid-layer layer-5" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g2})"/></svg>
            <svg class="liquid-layer layer-6" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="url(#${g3})"/></svg>
        `;

        btn.appendChild(liquidWrapper);
        btn.appendChild(btnText);
    });

    /* ==========================================================================
       10. Rotating Trust Line Ticker Strip
       ========================================================================== */
    const tickerItems = document.querySelectorAll(".ticker-item");
    if (tickerItems.length > 0) {
        let currentTickerIndex = 0;
        
        function rotateTicker() {
            tickerItems[currentTickerIndex].classList.remove("active");
            currentTickerIndex = (currentTickerIndex + 1) % tickerItems.length;
            tickerItems[currentTickerIndex].classList.add("active");
        }
        
        setInterval(rotateTicker, 4000);
    }

    /* ==========================================================================
       11. About Page Photo Slider
       ========================================================================== */
    const aboutSlides = document.querySelectorAll(".about-slide");
    if (aboutSlides.length > 0) {
        let currentAboutSlide = 0;
        
        function rotateAboutSlides() {
            aboutSlides[currentAboutSlide].classList.remove("active");
            currentAboutSlide = (currentAboutSlide + 1) % aboutSlides.length;
            aboutSlides[currentAboutSlide].classList.add("active");
        }
        
        setInterval(rotateAboutSlides, 3500);
    }

    /* ==========================================================================
       12. IntersectionObserver for Animated Scroll Counters
       ========================================================================== */
    const counterElements = document.querySelectorAll(".counter-value");
    if (counterElements.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            const duration = 2000; // 2 seconds
            const stepTime = 30;
            let current = 0;
            const increment = Math.ceil(target / (duration / stepTime));
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, stepTime);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counterElements.forEach(el => counterObserver.observe(el));
    }

    /* ==========================================================================
       13. Quote Form Countdown Timer (24 Hours Reset)
       ========================================================================== */
    const countdownElement = document.querySelector(".countdown-timer");
    if (countdownElement) {
        let hours = 23;
        let minutes = 59;
        let seconds = 59;

        function updateCountdown() {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        // Reset to 24h
                        hours = 23;
                        minutes = 59;
                        seconds = 59;
                    }
                }
            }
            
            const hStr = hours < 10 ? "0" + hours : hours;
            const mStr = minutes < 10 ? "0" + minutes : minutes;
            const sStr = seconds < 10 ? "0" + seconds : seconds;
            
            countdownElement.textContent = `${hStr}:${mStr}:${sStr}`;
        }
        
        setInterval(updateCountdown, 1000);
    }

    /* ==========================================================================
       14. Form Field Live Progress & Validation Interactivity
       ========================================================================== */
    const quoteForms = document.querySelectorAll(".quote-form");
    quoteForms.forEach(form => {
        const progressFill = form.querySelector(".form-progress-fill");
        const requiredInputs = form.querySelectorAll("input[required], select[required]");
        
        if (progressFill && requiredInputs.length > 0) {
            function updateFormProgress() {
                let validCount = 0;
                requiredInputs.forEach(input => {
                    if (input.type === "tel") {
                        const val = input.value.trim().replace(/\D/g, "");
                        if (val.length === 10) validCount++;
                    } else if (input.value.trim() !== "") {
                        validCount++;
                    }
                });
                const percentage = Math.round((validCount / requiredInputs.length) * 100);
                progressFill.style.width = `${percentage}%`;
                
                const percentText = form.querySelector(".form-progress-percent");
                if (percentText) {
                    percentText.textContent = `${percentage}% Complete`;
                }
            }
            
            requiredInputs.forEach(input => {
                input.addEventListener("input", updateFormProgress);
                input.addEventListener("change", updateFormProgress);
            });
            
            updateFormProgress();
        }
    });

    /* ==========================================================================
       Mobile Sticky Bar & Dynamic Gooey Buttons — Touch/Click Feedback
       ========================================================================== */
    // Note: desktop WhatsApp/Call links now use the premium glass button system
    // (see style.css .btn-wp / .btn-secondary). Only the mobile sticky bottom bar
    // keeps the gooey blob markup, which is already present in the HTML.

    // 1. Attach touchstart/mousedown animations to the mobile sticky buttons
    const allGooeyButtons = document.querySelectorAll(".mobile-sticky-item");
    allGooeyButtons.forEach(item => {
        const triggerBlob = () => {
            item.classList.add("blob-active");
            setTimeout(() => {
                item.classList.remove("blob-active");
            }, 600);
        };
        item.addEventListener("touchstart", triggerBlob, { passive: true });
        item.addEventListener("mousedown", triggerBlob);
    });

    // 3. Subtle scroll-reveal for cards and panels
    const revealTargets = document.querySelectorAll(
        ".service-card, .service-card-link, .testimonial-card, .location-card, " +
        ".about-badge-card, .stat-box-card, .comparison-col, .faq-item, .advisor-card-left, .advisor-card-right"
    );
    if (revealTargets.length && "IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        revealTargets.forEach((el) => el.classList.add("reveal-init"));
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("reveal-init");
                    entry.target.classList.add("reveal-in");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        revealTargets.forEach((el) => revealObserver.observe(el));
    }
});
