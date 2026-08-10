/* =====================================================
   QUANTUM OPS ELITE — SUPABASE CLIENT
   ===================================================== */

const SUPABASE_URL = 'https://txgsmfceadgircarxclm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8lWUTNuFdG_PT85PxPTivg_l5op-_km';

// Initialize Supabase client (using CDN version for vanilla JS)
let supabaseClient = null;

function initSupabase() {
  if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return supabaseClient;
  }
  console.warn('Supabase JS library not loaded yet.');
  return null;
}

// Wait for script load if needed
function getSupabase() {
  if (supabaseClient) return supabaseClient;
  return initSupabase();
}

/* ---------- Project Requests ---------- */
async function submitProjectRequest(formData) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not initialized');

  const { data, error } = await client
    .from('project_requests')
    .insert([{
      name: formData.name,
      business_name: formData.business_name || null,
      email: formData.email,
      phone: formData.phone || null,
      business_type: formData.business_type || null,
      project_type: formData.project_type || null,
      budget: formData.budget || null,
      timeline: formData.timeline || null,
      message: formData.message || null,
      status: 'new'
    }])
    .select();

  if (error) throw error;
  return data;
}

/* ---------- Contact Messages ---------- */
async function submitContactMessage(formData) {
  const client = getSupabase();
  if (!client) throw new Error('Supabase not initialized');

  const { data, error } = await client
    .from('contact_messages')
    .insert([{
      name: formData.name,
      email: formData.email,
      subject: formData.subject || null,
      message: formData.message,
      status: 'new'
    }])
    .select();

  if (error) throw error;
  return data;
}

/* ---------- Fetch Published Content ---------- */
async function fetchPublishedCourses() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  return data || [];
}

async function fetchPublishedTestimonials() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data || [];
}

async function fetchPublishedPortfolio() {
  const client = getSupabase();
  if (!client) return [];

  const { data, error } = await client
    .from('portfolio_projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching portfolio:', error);
    return [];
  }
  return data || [];
}

// Export for use in other modules
window.QuantumSupabase = {
  init: initSupabase,
  getClient: getSupabase,
  submitProjectRequest,
  submitContactMessage,
  fetchPublishedCourses,
  fetchPublishedTestimonials,
  fetchPublishedPortfolio
};
