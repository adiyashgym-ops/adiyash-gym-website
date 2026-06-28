import { supabase } from './supabase'

// Track page visit
export const trackPageVisit = async () => {
  try {
    await supabase
      .from('site_visits')
      .insert({})
  } catch (error) {
    console.error('Error tracking page visit:', error)
  }
}

// Track WhatsApp lead
export const trackWhatsAppLead = async (branch, source) => {
  try {
    await supabase
      .from('website_leads')
      .insert({ branch, source })
  } catch (error) {
    console.error('Error tracking lead:', error)
  }
}