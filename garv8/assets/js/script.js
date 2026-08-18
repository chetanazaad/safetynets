document.addEventListener("DOMContentLoaded", () => {
    /* ==========================================================================
       1. Invissafe Mobile Nav Drawer Toggle
       ========================================================================== */
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const drawerCloseBtn = document.getElementById("drawerCloseBtn");
    const drawerBackdrop = document.getElementById("drawerBackdrop");
    const mobileNavDrawer = document.getElementById("mobileNavDrawer");
    const drawerNavItems = document.querySelectorAll(".drawer-nav-item");

    function closeDrawer() {
        if (mobileNavDrawer) {
            mobileNavDrawer.classList.remove("open");
            document.body.style.overflow = "";
        }
    }

    function openDrawer() {
        if (mobileNavDrawer) {
            mobileNavDrawer.classList.add("open");
            document.body.style.overflow = "hidden";
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", openDrawer);
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener("click", closeDrawer);
    }

    if (drawerBackdrop) {
        drawerBackdrop.addEventListener("click", closeDrawer);
    }

    drawerNavItems.forEach(item => {
        item.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileNavDrawer && mobileNavDrawer.classList.contains("open")) {
            closeDrawer();
        }
    });

    /* ==========================================================================
       2. FAQ Accordion Toggle
       ========================================================================== */
    const faqItems = document.querySelectorAll(".inv-faq-item");
    faqItems.forEach(item => {
        const questionBtn = item.querySelector(".inv-faq-question");
        if (questionBtn) {
            questionBtn.addEventListener("click", () => {
                const isActive = item.classList.contains("active");
                // Close other items
                faqItems.forEach(other => other.classList.remove("active"));
                if (!isActive) {
                    item.classList.add("active");
                }
            });
        }
    });

    /* ==========================================================================
       3. MixItUp Works Gallery Initialization & Smooth Fallback
       ========================================================================== */
    const mixitContainer = document.getElementById("mixitGrid");
    const mixitFilterBtns = document.querySelectorAll(".mixit-filter-btn");

    if (mixitContainer) {
        if (typeof mixitup !== "undefined") {
            try {
                const mixer = mixitup(mixitContainer, {
                    selectors: {
                        target: '.mix',
                        control: '.mixit-filter-btn'
                    },
                    animation: {
                        duration: 350,
                        nudge: true,
                        reverseOut: false,
                        effects: 'fade translateY(16px)'
                    },
                    callbacks: {
                        onMixClick: function(state, e) {
                            mixitFilterBtns.forEach(btn => btn.classList.remove("active"));
                            if (e.target) {
                                const targetBtn = e.target.closest('.mixit-filter-btn');
                                if (targetBtn) targetBtn.classList.add("active");
                            }
                        }
                    }
                });
            } catch (err) {
                console.warn("MixItUp initialization notice, using native filter fallback:", err);
                initNativeGalleryFilter();
            }
        } else {
            initNativeGalleryFilter();
        }

        function initNativeGalleryFilter() {
            const cards = mixitContainer.querySelectorAll(".mix");
            mixitFilterBtns.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    mixitFilterBtns.forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    const filter = btn.getAttribute("data-filter");

                    cards.forEach(card => {
                        if (filter === "all") {
                            card.style.display = "flex";
                        } else {
                            const selector = filter.replace(".", "");
                            if (card.classList.contains(selector)) {
                                card.style.display = "flex";
                            } else {
                                card.style.display = "none";
                            }
                        }
                    });
                });
            });
        }
    }

    /* ==========================================================================
       4. Nav Active Scrollspy
       ========================================================================== */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".inv-nav-link");

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href").includes(current) && current !== "") {
                    link.classList.add("active");
                }
            });
        }, { passive: true });
    }
});
