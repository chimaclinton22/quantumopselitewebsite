/* =====================================================
   QUANTUM OPS ELITE — MAIN APPLICATION
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Supabase
  if (window.QuantumSupabase) {
    window.QuantumSupabase.init();
  }

  // Load dynamic content if needed (optional seed display)
  // For now we use static content in HTML for reliability.
  // Later you can replace sections with data from Supabase.

  console.log('Quantum OPS Elite website loaded.');
});
