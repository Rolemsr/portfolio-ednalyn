/**
 * EDNALYN MALLARI - PORTFOLIO INTERACTIVITY ENGINE
 * Core features: Theme switcher, project filtering, interactive modal lightbox,
 * live email simulator toggles, metrics counter, copy-to-clipboard, form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark / Light Mode)
    initThemeToggle();

    // 2. Navigation & Scroll Spy
    initNavigation();

    // 3. Hero Email Device Mockup Switcher (Desktop / Mobile)
    initDeviceMockupSwitcher();

    // 4. Number Counter Animation on Viewport Entry
    initNumberCounters();

    // 5. Projects Filter & Dynamic Lightbox Modal
    initProjectShowcase();

    // 6. Direct Email Copy to Clipboard
    initCopyEmail();

    // 7. Contact Form Handling & Validation
    initContactForm();

    // 8. Back to Top Button
    initBackToTop();
});

/* ==========================================================================
   1. THEME SWITCHER
   ========================================================================== */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Retrieve saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('em_portfolio_theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('em_portfolio_theme', 'dark');
            showToast('Switched to Dark Mode', 'fa-moon');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('em_portfolio_theme', 'light');
            showToast('Switched to Light Mode', 'fa-sun');
        }
    });
}

/* ==========================================================================
   2. NAVIGATION & MOBILE MENU & SCROLL SPY
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll styling for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll spy for active link
        let currentSection = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* ==========================================================================
   3. HERO DEVICE MOCKUP SWITCHER (Desktop vs Mobile View)
   ========================================================================== */
function initDeviceMockupSwitcher() {
    const desktopBtn = document.getElementById('hero-view-desktop');
    const mobileBtn = document.getElementById('hero-view-mobile');
    const deviceMockup = document.querySelector('.device-mockup');
    const scrollCanvas = document.getElementById('email-scroll-canvas');
    const scrollHint = document.getElementById('scroll-hint');

    if (!desktopBtn || !mobileBtn || !deviceMockup) return;

    desktopBtn.addEventListener('click', () => {
        desktopBtn.classList.add('active');
        mobileBtn.classList.remove('active');
        deviceMockup.classList.remove('mobile-mode');
    });

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.add('active');
        desktopBtn.classList.remove('active');
        deviceMockup.classList.add('mobile-mode');
    });

    if (scrollCanvas && scrollHint) {
        scrollCanvas.addEventListener('scroll', () => {
            if (scrollCanvas.scrollTop > 30) {
                scrollHint.style.opacity = '0';
            } else {
                scrollHint.style.opacity = '0.95';
            }
        }, { passive: true });
    }
}

/* ==========================================================================
   4. NUMBER COUNTER ANIMATION
   ========================================================================== */
function initNumberCounters() {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const increment = Math.ceil(target / 40);
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = count;
                            setTimeout(updateCount, 25);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.5 });

    const heroMetrics = document.querySelector('.hero-metrics');
    if (heroMetrics) {
        observer.observe(heroMetrics);
    }
}

/* ==========================================================================
   5. PROJECT SHOWCASE DATA & LIGHTBOX MODAL
   ========================================================================== */
const projectDatabase = {
    1: {
        id: 1,
        title: "eCommerce Welcome Series & First-Time Buyer Onboarding",
        category: "Email Marketing",
        tools: ["Klaviyo", "Figma", "Email Marketing"],
        postUrl: "https://www.behance.net/ednalynmallari",
        stats: [
            { label: "Open Rate", value: "54.2%" },
            { label: "Click Rate", value: "18.4%" },
            { label: "Attributed Revenue", value: "+32%" },
            { label: "Trigger", value: "New Subscriber" }
        ],
        overview: "A comprehensive 4-part automated welcome sequence designed for an eCommerce lifestyle brand. The sequence guides fresh subscribers through the brand's founding values, highlights bestsellers with customer testimonials, offers an exclusive first-order coupon with urgency reminders, and invites them to follow social channels.",
        strategy: "Conducted audience persona mapping and designed clean, modular email wireframes in Figma before implementing conditional logic in Klaviyo. A/B tested personalized subject lines with emoji accents to maximize inbox open rates.",
        deliverables: "4 Responsive Email Templates, Klaviyo Automation Setup, Discount Escalation Flow, Dynamic Product Recommendation Blocks.",
        previewType: "email",
        previewHeadline: "Welcome to The Inner Circle",
        previewSub: "Enjoy 15% off your handcrafted order with code WELCOME15",
        previewBtnText: "Explore Collection"
    },
    5: {
        id: 5,
        title: "High-Retention Social Teaser & Email Header Snippet",
        category: "Video",
        tools: ["CapCut", "Premiere Pro"],
        postUrl: "https://www.tiktok.com/@ms.eds_?_r=1&_t=ZS-9AgmSFoAZyH",
        stats: [
            { label: "Video Duration", value: "0:30" },
            { label: "Resolution", value: "1080x1920 (9:16) & 16:9" },
            { label: "Retention Rate", value: "85%" },
            { label: "Conversion Lift", value: "+22%" }
        ],
        overview: "Fast-paced, rhythmic promotional video edit produced using CapCut and Premiere Pro. Optimized both for short-form social media (TikTok/Instagram Reels) and converted into seamless lightweight animated header GIFs for email campaigns.",
        strategy: "Paced cuts to trending audio beats, synchronized typographic callouts, applied rich color grading, and maintained high visual energy to hook viewer attention within the first 3 seconds.",
        deliverables: "Full 30s Promo Video, Lightweight Email-Optimized GIF Asset, Vertical Social Cut, Audio Mix.",
        previewType: "video",
        previewHeadline: "Dynamic Brand Story & Promo Snip",
        previewSub: "Produced for high retention across Instagram Reels, TikTok, and Email headers.",
        previewBtnText: "Play Demo Reel"
    }
};

function initProjectShowcase() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // Lightbox Modal Triggers
    const modal = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body-content');

    const openProjectModal = (projectId) => {
        const data = projectDatabase[projectId];
        if (!data) return;

        // Build modal markup
        modalBody.innerHTML = `
      <div class="modal-header-sec">
        <div class="modal-category">${data.category}</div>
        <h3 class="modal-title" id="modal-project-title">${data.title}</h3>
        <div class="modal-tags">
          ${data.tools.map(tool => `<span class="tag-pill">${tool}</span>`).join('')}
        </div>
      </div>

      <!-- Live Interactive Simulated Email / Preview Screen -->
      <div class="modal-preview-stage">
        <div class="modal-sim-email">
          <div class="modal-sim-header">
            <span><strong>EDNALYN MALLARI</strong> • CAMPAIGN PREVIEW</span>
            <span><i class="fa-solid fa-circle-check text-emerald"></i> ESP READY</span>
          </div>
          <div class="modal-sim-body">
            <h4>${data.previewHeadline}</h4>
            <p>${data.previewSub}</p>
            <a href="${data.postUrl || '#'}" target="_blank" rel="noopener noreferrer" class="modal-sim-btn" style="text-decoration:none; display:inline-block;">${data.previewBtnText} &rarr;</a>
          </div>
        </div>
      </div>

      <!-- Performance Metrics Row -->
      <div class="modal-stats-row">
        ${data.stats.map(s => `
          <div class="modal-stat-box">
            <div class="num">${s.value}</div>
            <div class="lbl">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Deep Dive Details Grid -->
      <div class="modal-details-grid">
        <div class="modal-col">
          <h4><i class="fa-solid fa-bullseye text-accent"></i> Project Overview</h4>
          <p>${data.overview}</p>
        </div>
        <div class="modal-col">
          <h4><i class="fa-solid fa-chess-knight text-accent"></i> Strategy & Execution</h4>
          <p>${data.strategy}</p>
        </div>
      </div>

      <div style="margin-top: 1.8rem; padding-top: 1.2rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div style="max-width: 440px;">
          <strong style="color: var(--text-white); font-size: 0.9rem;">Key Deliverables:</strong>
          <span style="color: var(--text-muted); font-size: 0.88rem; margin-left: 0.5rem;">${data.deliverables}</span>
        </div>
        <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
          <a href="${data.postUrl || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" aria-label="Open live post of the project">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>View Project Post</span>
          </a>
          <a href="#contact" class="btn btn-primary btn-sm" onclick="document.getElementById('modal-close-btn').click();">
            <span>Discuss Similar Project</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Attach click to preview buttons & view case study buttons
    document.querySelectorAll('.btn-preview-modal, .btn-view-project').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pId = btn.getAttribute('data-project-id');
            openProjectModal(pId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    // Close when clicking backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   6. COPY EMAIL WITH TOAST FEEDBACK
   ========================================================================== */
function initCopyEmail() {
    const copyBtn = document.getElementById('btn-copy-email');
    const emailTextEl = document.getElementById('email-address-text');
    const tooltip = document.getElementById('copy-tooltip');

    if (!copyBtn || !emailTextEl) return;

    copyBtn.addEventListener('click', () => {
        const emailToCopy = emailTextEl.innerText.trim();

        navigator.clipboard.writeText(emailToCopy).then(() => {
            tooltip.innerText = 'Copied!';
            showToast('Email address copied to clipboard!', 'fa-clipboard-check');

            setTimeout(() => {
                tooltip.innerText = 'Copy';
            }, 2500);
        }).catch(() => {
            showToast('Unable to copy. Please manually copy the email.', 'fa-circle-exclamation');
        });
    });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('submit-btn');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let isValid = true;

        // Validate Name
        if (!nameInput.value.trim()) {
            nameInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        } else {
            nameInput.closest('.form-group').classList.remove('has-error');
        }

        // Validate Email
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        } else {
            emailInput.closest('.form-group').classList.remove('has-error');
        }

        // Validate Message
        if (!messageInput.value.trim()) {
            messageInput.closest('.form-group').classList.add('has-error');
            isValid = false;
        } else {
            messageInput.closest('.form-group').classList.remove('has-error');
        }

        if (isValid) {
            // Simulate submission
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Message Sent!</span> <i class="fa-solid fa-check"></i>`;
                showToast('Thank you! Your message has been sent successfully.', 'fa-paper-plane');
                form.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                }, 3000);
            }, 1200);
        } else {
            showToast('Please fix the highlighted errors before submitting.', 'fa-triangle-exclamation');
        }
    });

    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            input.closest('.form-group').classList.remove('has-error');
        });
    });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
let toastTimeout;
function showToast(message, iconClass = 'fa-circle-check') {
    const toast = document.getElementById('toast-notification');
    const msgEl = document.getElementById('toast-message');
    const iconEl = document.getElementById('toast-icon');

    if (!toast || !msgEl || !iconEl) return;

    msgEl.innerText = message;
    iconEl.className = `fa-solid ${iconClass} text-emerald`;

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

/* ==========================================================================
   8. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
