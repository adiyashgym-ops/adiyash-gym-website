import { supabase } from './supabase'

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx1eUy8r2txQoy_9Y9tdRSFYStv_G5AQBgkBVa1t9LtkxhQvrmQjaKfoCBCRecEJWcI7A/exec'

/**
 * Send lead to Google Sheets via Web App
 */
export const sendLeadToGoogleSheets = async (name, phone, branch) => {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        branch: branch,
        notes: '' // Empty by default
      })
    })
    
    console.log('Lead sent to Google Sheets:', { name, phone, branch })
    
  } catch (error) {
    console.error('Error sending lead to Google Sheets:', error)
  }
}

/**
 * Send lead to Supabase (for admin dashboard)
 */
export const sendLeadToSupabase = async (branch, source) => {
  try {
    await supabase
      .from('website_leads')
      .insert({
        branch: branch,
        source: source || 'lead_modal',
      })
    console.log('Lead saved to Supabase:', { branch, source })
  } catch (error) {
    console.error('Error saving lead to Supabase:', error)
  }
}

/**
 * Track lead from modal — sends to both Google Sheets + Supabase
 * Now also returns the branch name for WhatsApp message
 */
export const trackLead = async (name, phone, branch, source = 'lead_modal') => {
  // Send to Google Sheets (fire-and-forget)
  await sendLeadToGoogleSheets(name, phone, branch)
  
  // Send to Supabase (for admin dashboard)
  await sendLeadToSupabase(branch, source)
  
  // Return branch info for WhatsApp message
  return { branch }
}

/**
 * Get branch display name for WhatsApp message
 */
export const getBranchDisplayName = (branchId) => {
  const branchMap = {
    'kurla': 'Kurla',
    'vikhroli': 'Vikhroli',
    'kandivali': 'Kandivali',
    'asalfa-unisex': 'Asalfa Unisex',
    'asalfa-ladies': 'Asalfa Ladies',
    'marol': 'Marol',
    'vfour9': 'Vfour9',
    'all': 'All Branches'
  }
  return branchMap[branchId] || branchId
}