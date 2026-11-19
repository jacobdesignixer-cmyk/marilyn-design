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

  // Initial update
  handleCategoryChange();
});
