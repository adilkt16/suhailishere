/**
 * Main Controller
 * Handles interactive contact form validation, toast notifications,
 * and user interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initCopyEmail();
});

// --- Toast Notification Manager ---
function showToast(message, duration = 4000) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <div class="toast-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span class="toast-text"></span>
    `;
    document.body.appendChild(toast);
  }

  const toastText = toast.querySelector('.toast-text');
  toastText.textContent = message;
  toast.classList.add('show');

  if (window.toastTimeout) {
    clearTimeout(window.toastTimeout);
  }

  window.toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

// --- Contact Form Interactive Validation ---
function initContactForm() {
  const form = document.getElementById('connect-form');
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const enquirySelect = form.querySelector('select[name="enquiryType"]');
  const messageTextarea = form.querySelector('textarea[name="message"]');

  function validateField(input, condition, errorMsg) {
    const parent = input.closest('.form-control-wrap');
    if (!parent) return false;

    let errorEl = parent.querySelector('.form-error-msg');
    if (!condition) {
      parent.classList.add('has-error');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      parent.classList.remove('has-error');
      return true;
    }
  }

  // Real-time clearance on typing
  [nameInput, emailInput, enquirySelect, messageTextarea].forEach(el => {
    if (!el) return;
    el.addEventListener('input', () => {
      const parent = el.closest('.form-control-wrap');
      if (parent && parent.classList.contains('has-error')) {
        parent.classList.remove('has-error');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const nameVal = nameInput?.value.trim() || '';
    if (!validateField(nameInput, nameVal.length >= 2, 'Please enter your full name.')) {
      isValid = false;
    }

    // Validate Email
    const emailVal = emailInput?.value.trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validateField(emailInput, emailRegex.test(emailVal), 'Please enter a valid email address.')) {
      isValid = false;
    }

    // Validate Enquiry Type
    const enquiryVal = enquirySelect?.value.trim() || '';
    if (!validateField(enquirySelect, enquiryVal !== '', 'Please select an enquiry category.')) {
      isValid = false;
    }

    // Validate Message
    const messageVal = messageTextarea?.value.trim() || '';
    if (!validateField(messageTextarea, messageVal.length >= 5, 'Please provide a brief message.')) {
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Submit animation & feedback
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: rotateSlow 1s linear infinite;">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
      </svg>
      <span>Connecting...</span>
    `;

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast('Thank you! Your message has been received.');
    }, 900);
  });
}

// --- Copy Email Helper ---
function initCopyEmail() {
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'suhailsidheeq0@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard: ' + email);
        }).catch(() => {
          window.location.href = 'mailto:' + email;
        });
      } else {
        window.location.href = 'mailto:' + email;
      }
    });
  });
}

