/**
 * QUANTUM OPS ELITE — SUPABASE ENGINE
 * Configured with exact live client credentials
 */

const SUPABASE_URL = 'https://txgsmfceadgircarxclm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_8lWUTNuFdG_PT85PxPTivg_l5op-_km';

// Initialize Client Safely
let supabaseClient = null;

if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.warn('Supabase SDK not loaded yet.');
}

/**
 * Submit Project Request to `project_requests` table
 */
async function submitProjectRequest(payload) {
  if (!supabaseClient) throw new Error("Supabase client unavailable.");
  
  const { data, error } = await supabaseClient
    .from('project_requests')
    .insert([payload]);

  if (error) throw error;
  return data;
}

/**
 * Fetch Portfolio Projects from `portfolio_projects` table
 */
async function fetchPortfolioProjects() {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient
    .from('portfolio_projects')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching portfolio:', error);
    return null;
  }
  return data;
}

/**
 * Fetch Courses from `courses` table
 */
async function fetchAcademyCourses() {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient
    .from('courses')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching courses:', error);
    return null;
  }
  return data;
}

/**
 * Fetch Testimonials from `testimonials` table
 */
async function fetchTestimonials() {
  if (!supabaseClient) return null;
  const { data, error } = await supabaseClient
    .from('testimonials')
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }
  return data;
}
