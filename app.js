/**
 * Desires and Pleasures DP - Interactive Conversion & WhatsApp Engine
 * Focus: Mobile-First, Instant WhatsApp RSVP, Dynamic Link Generation
 */

document.addEventListener('DOMContentLoaded', () => {
  const HOST_PHONE = "12136547811"; // 213-654-7811 (Los Angeles, CA)

  // DOM Elements
  const rsvpModal = document.getElementById('rsvpModal');
  const closeRsvpModal = document.getElementById('closeRsvpModal');
  const guestCategory = document.getElementById('guestCategory');
  const singleMenNotice = document.getElementById('singleMenNotice');
  const guestName = document.getElementById('guestName');
  const eventDate = document.getElementById('eventDate');
  const liveMessagePreview = document.getElementById('liveMessagePreview');
  const submitWhatsappRsvp = document.getElementById('submitWhatsappRsvp');

  // In-between section elements
  const quickPills = document.querySelectorAll('#quickCategoryPills .pill-btn');
  const selectedTierDisplay = document.getElementById('selectedTierDisplay');
  const quickWhatsAppBtn = document.getElementById('quickWhatsAppBtn');

  // Flyer Modal elements
  const openFlyerModal = document.getElementById('openFlyerModal');
  const flyerModal = document.getElementById('flyerModal');
  const closeFlyerModal = document.getElementById('closeFlyerModal');

  // Floating tooltip
  const floatingTooltip = document.getElementById('floatingTooltip');
  const closeTooltip = document.getElementById('closeTooltip');

  // Accordion
  const accordionTriggers = document.querySelectorAll('.accordion-trigger');

  /**
   * Helper: Construct WhatsApp URL from message text
   */
  function buildWhatsAppUrl(message) {
    return `https://wa.me/${HOST_PHONE}?text=${encodeURIComponent(message)}`;
  }

  /**
   * Helper: Generate Live Form Message
   */
  function updateModalPreview() {
    const category = guestCategory.value;
    const name = guestName.value.trim();
    const date = eventDate.value;

    let text = `Hello! I would like to RSVP for Desires and Pleasures DP.\n`;
    if (name) {
      text += `• Name/Alias: ${name}\n`;
    }
    text += `• Category: ${category}\n`;
    text += `• Preferred Time: ${date}\n`;
    
    if (category.includes('Single Men')) {
      text += `• Note: Claiming the $20 RSVP discount ($40 donation). Clean shaven verified.\n`;
    }
    
    text += `Please send the private venue address & details. Thank you!`;

    liveMessagePreview.textContent = text;
    return text;
  }

  // Update grooming warning visibility based on category
  function handleCategoryChange() {
    const isSingleMen = guestCategory.value.includes('Single Men');
    if (singleMenNotice) {
      singleMenNotice.style.display = isSingleMen ? 'flex' : 'none';
    }
    updateModalPreview();
  }

  if (guestCategory) {
    guestCategory.addEventListener('change', handleCategoryChange);
  }
  if (guestName) {
    guestName.addEventListener('input', updateModalPreview);
  }
  if (eventDate) {
    eventDate.addEventListener('change', updateModalPreview);
  }

  /**
   * Open RSVP Modal with optional preselected category
   */
  function openModal(preselectCategory) {
    if (preselectCategory && guestCategory) {
      // Find matching option
      for (let i = 0; i < guestCategory.options.length; i++) {
        if (guestCategory.options[i].value.toLowerCase().includes(preselectCategory.toLowerCase()) ||
            guestCategory.options[i].text.toLowerCase().includes(preselectCategory.toLowerCase())) {
          guestCategory.selectedIndex = i;
          break;
        }
      }
    }
    handleCategoryChange();
    rsvpModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    rsvpModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  // Attach click to all trigger buttons
  document.querySelectorAll('.open-rsvp-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const category = btn.getAttribute('data-category') || '';
      openModal(category);
    });
  });

  if (closeRsvpModal) {
    closeRsvpModal.addEventListener('click', closeModal);
  }

  if (rsvpModal) {
    rsvpModal.addEventListener('click', (e) => {
      if (e.target === rsvpModal) closeModal();
    });
  }

  // Submit Modal to WhatsApp
  if (submitWhatsappRsvp) {
    submitWhatsappRsvp.addEventListener('click', () => {
      const message = updateModalPreview();
      const url = buildWhatsAppUrl(message);
      window.open(url, '_blank', 'noopener,noreferrer');
      closeModal();
    });
  }

  /**
   * In-Between Quick Category Pills
   */
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      quickPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const tier = pill.getAttribute('data-tier');
      const discount = pill.getAttribute('data-discount');

      if (selectedTierDisplay) {
        selectedTierDisplay.textContent = `${tier} (${discount})`;
      }

      // Update button WhatsApp link
      const message = `Hello! I would like to RSVP for Desires and Pleasures DP. Category: ${tier}. Please send the private location address.`;
      if (quickWhatsAppBtn) {
        quickWhatsAppBtn.href = buildWhatsAppUrl(message);
      }
    });
  });

  /**
   * Flyer Lightbox Modal
   */
  if (openFlyerModal && flyerModal) {
    openFlyerModal.addEventListener('click', () => {
      flyerModal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeFlyerModal && flyerModal) {
    closeFlyerModal.addEventListener('click', () => {
      flyerModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    });
  }

  if (flyerModal) {
    flyerModal.addEventListener('click', (e) => {
      if (e.target === flyerModal) {
        flyerModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    });
  }

  /**
   * Floating Tooltip Dismissal
   */
  if (closeTooltip && floatingTooltip) {
    closeTooltip.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingTooltip.style.display = 'none';
    });
  }

  /**
   * Accordion Functionality
   */
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.closest('.accordion-item');
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('active');
          item.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isExpanded) {
        parent.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        parent.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Global Escape key closes any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (rsvpModal && !rsvpModal.hasAttribute('hidden')) closeModal();
      if (flyerModal && !flyerModal.hasAttribute('hidden')) {
        flyerModal.setAttribute('hidden', '');
        document.body.style.overflow = '';
      }
    }
  });

  /**
   * ========================================================
   * INTERACTIVE SCROLL-DRIVEN POLE DANCER ANIMATION ENGINE
   * ========================================================
   * Animates with each scroll:
   * 1. 3D spins around vertical pole proportional to scroll progress
   * 2. Glides vertically down/up the pole smoothly
   * 3. Dynamically switches between 5 signature acrobatic poses
   * 4. Emits glowing neon contact sparks on scroll
   */
  const poleStage = document.getElementById('poleDancerStage');
  const poleDancerRig = document.getElementById('poleDancerRig');
  const dancerPoses = document.querySelectorAll('.dancer-svg');
  const poleSparksEmitter = document.getElementById('poleSparksEmitter');

  let lastScrollY = window.scrollY;
  let scrollTimeout = null;
  let sparkThrottle = 0;
  let currentPoseIndex = 0;

  function spawnScrollSpark() {
    if (!poleSparksEmitter) return;
    const now = Date.now();
    if (now - sparkThrottle < 120) return; // limit spark rate
    sparkThrottle = now;

    const spark = document.createElement('span');
    spark.className = 'scroll-spark';
    const icons = ['✨', '💖', '⚡', '⭐', '🌟'];
    spark.textContent = icons[Math.floor(Math.random() * icons.length)];
    
    // Random direction
    const tx = (Math.random() * 40 - 15) + 'px';
    const ty = (Math.random() * 40 - 20) + 'px';
    spark.style.setProperty('--tx', tx);
    spark.style.setProperty('--ty', ty);
    
    poleSparksEmitter.appendChild(spark);
    setTimeout(() => {
      spark.remove();
    }, 600);
  }

  function handlePoleDancerScroll() {
    if (!poleDancerRig || !poleStage) return;

    const scrollY = window.scrollY;
    const maxScroll = (document.documentElement.scrollHeight - window.innerHeight) || 1;
    const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // 1. Calculate Vertical Position along the pole
    const stageHeight = poleStage.clientHeight;
    const rigHeight = 220;
    const maxTravel = Math.max(stageHeight - rigHeight - 20, 50);
    const targetY = scrollProgress * maxTravel;

    // 2. Calculate Continuous 3D Spin around the pole
    const spinAngle = (scrollY * 0.42) % 360;

    // Apply GPU-accelerated 3D Transform
    poleDancerRig.style.transform = `translateY(${targetY.toFixed(1)}px) rotateY(${spinAngle.toFixed(1)}deg)`;

    // 3. Dynamic Pose Switching (5 signature tricks)
    const targetPoseIndex = Math.min(Math.floor(scrollProgress * 5), 4);
    if (targetPoseIndex !== currentPoseIndex && dancerPoses.length > targetPoseIndex) {
      dancerPoses.forEach((pose, idx) => {
        if (idx === targetPoseIndex) {
          pose.classList.add('active');
        } else {
          pose.classList.remove('active');
        }
      });
      currentPoseIndex = targetPoseIndex;
    }

    // 4. Emit Neon Sparks while scrolling
    const delta = Math.abs(scrollY - lastScrollY);
    if (delta > 3) {
      spawnScrollSpark();
    }
    lastScrollY = scrollY;

    // 5. Idle breathing trigger when stopped
    poleDancerRig.classList.remove('idle-glow');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      poleDancerRig.classList.add('idle-glow');
    }, 180);
  }

  // Bind scroll with passive listener for max 60-120fps performance
  window.addEventListener('scroll', handlePoleDancerScroll, { passive: true });
  window.addEventListener('resize', handlePoleDancerScroll, { passive: true });

  // Initial call
  handlePoleDancerScroll();

  // Initial update
  handleCategoryChange();
});

