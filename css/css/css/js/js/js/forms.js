/**
 * QUANTUM OPS ELITE — FORM HANDLER & REAL-TIME SUPABASE INTEGRATION
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('project-request-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-request-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // UI state during submit
      submitBtn.disabled = true;
      submitBtn.textContent = 'Transmitting System Request...';
      feedback.textContent = '';
      feedback.style.color = 'var(--text-muted)';

      // Collect payload according to exact `project_requests` schema
      const payload = {
        name: document.getElementById('req-name').value.trim(),
        business_name: document.getElementById('req-business').value.trim() || null,
        email: document.getElementById('req-email').value.trim(),
        phone: document.getElementById('req-phone').value.trim() || null,
        business_type: document.getElementById('req-type').value,
        project_type: document.getElementById('req-project').value,
        budget: document.getElementById('req-budget').value,
        timeline: document.getElementById('req-timeline').value,
        message: document.getElementById('req-message').value.trim() || null,
        status: 'new'
      };

      try {
        await submitProjectRequest(payload);
        feedback.style.color = 'var(--success)';
        feedback.textContent = '✓ Request received successfully. Our architecture team will contact you within 24 hours.';
        form.reset();
      } catch (err) {
        console.error('Submission Error:', err);
        feedback.style.color = 'var(--danger)';
        feedback.textContent = 'An error occurred while submitting. Please check your connection or contact us via WhatsApp.';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Request a Project';
      }
    });
  }
});
