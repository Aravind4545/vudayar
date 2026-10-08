/**
 * Vudayar Fine Arts — Interactive Scripts
 * Handles mobile drawer, smooth scrolling, gallery filtering,
 * lightbox modal viewer, and direct WhatsApp inquiry generator.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Header Scroll Effect
  // -------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // -------------------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    mobileNav?.classList.add('open');
    mobileNavBackdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileNav?.classList.remove('open');
    mobileNavBackdrop?.classList.remove('open');
    document.body.style.overflow = '';
  };

  menuToggle?.addEventListener('click', openMobileNav);
  mobileNavClose?.addEventListener('click', closeMobileNav);
  mobileNavBackdrop?.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // -------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // -------------------------------------------------------------------------
  // 4. Interactive Gallery Filtering
  // -------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.sculpture-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 5. Lightbox Modal
  // -------------------------------------------------------------------------
  const lightboxModal = document.querySelector('.lightbox-modal');
  const lightboxImg = document.querySelector('.lightbox-media img');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxCategory = document.querySelector('.lightbox-category');
  const lightboxDesc = document.querySelector('.lightbox-desc');
  const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');

  const openLightbox = (src, title, cat, desc) => {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || '';
    if (lightboxCategory) lightboxCategory.textContent = cat || 'Fine Art Sculpture';
    if (lightboxDesc) lightboxDesc.textContent = desc || '';
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileNav();
    }
  });

  // Attach Lightbox to Sculpture Cards
  document.querySelectorAll('.sculpture-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger if clicked on child link/button
      if (e.target.closest('a') || e.target.closest('button')) return;

      const img = card.querySelector('.sculpture-media img');
      const title = card.querySelector('.sculpture-title')?.textContent;
      const tag = card.querySelector('.sculpture-tag')?.textContent;
      const desc = card.querySelector('.sculpture-desc')?.textContent;

      if (img) {
        openLightbox(img.src, title, tag, desc);
      }
    });
  });

  // Attach Lightbox to Award Photo Frames
  document.querySelectorAll('.award-photo-frame').forEach(frame => {
    frame.addEventListener('click', () => {
      const img = frame.querySelector('img');
      const caption = frame.querySelector('.award-photo-caption')?.textContent;
      if (img) {
        openLightbox(img.src, caption, 'National Award & Recognition', 'Honored for sculptural excellence and preserving Indian cultural heritage.');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 6. WhatsApp Commission Form
  // -------------------------------------------------------------------------
  const inquiryForm = document.getElementById('sculptureInquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName')?.value.trim();
      const phone = document.getElementById('clientPhone')?.value.trim();
      const medium = document.getElementById('sculptureMedium')?.value || 'Granite / Stone';
      const details = document.getElementById('sculptureDetails')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      // Format WhatsApp message
      const textMessage = `*New Sculpture Inquiry — Vudayar Fine Arts*%0A%0A` +
        `*Name:* ${encodeURIComponent(name)}%0A` +
        `*Phone:* ${encodeURIComponent(phone)}%0A` +
        `*Preferred Medium:* ${encodeURIComponent(medium)}%0A` +
        `*Project Details:* ${encodeURIComponent(details || 'Looking to discuss a custom sculpture commission.')}`;

      const whatsappUrl = `https://wa.me/919177333007?text=${textMessage}`;

      // Show confirmation & open WhatsApp in new tab
      const submitBtn = inquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span>Inquiry Sent! Opening WhatsApp...</span>`;
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          inquiryForm.reset();
        }, 3000);
      }

      window.open(whatsappUrl, '_blank');
    });
  }
});
