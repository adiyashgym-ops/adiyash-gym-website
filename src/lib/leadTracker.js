import { supabase } from './supabase'

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbx1eUy8r2txQoy_9Y9tdRSFYStv_G5AQBgkBVa1t9LtkxhQvrmQjaKfoCBCRecEJWcI7A/exec'

/**
 * Sends a secure copy of the lead to CRM.
 * No secret exists in the browser.
 */
export const sendLeadToCRM = async (
  name,
  phone,
  branch
) => {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        mobile: phone,
        branch,
      }),
      keepalive: true,
    })

    if (!response.ok) {
      console.error(
        'CRM lead request failed:',
        response.status
      )
    }
  } catch (error) {
    console.error('CRM lead request error:', error)
  }
}

/**
 * Sends lead to the existing Google Sheets system.
 */
export const sendLeadToGoogleSheets = async (
  name,
  phone,
  branch
) => {
  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        branch,
        notes: '',
      }),
      keepalive: true,
    })
  } catch (error) {
    console.error('Google Sheets lead error:', error)
  }
}

/**
 * Keeps the existing website dashboard tracking.
 */
export const sendLeadToSupabase = async (
  branch,
  source
) => {
  try {
    const { error } = await supabase
      .from('website_leads')
      .insert({
        branch,
        source: source || 'lead_modal',
      })

    if (error) {
      console.error('Website lead tracking error:', error)
    }
  } catch (error) {
    console.error('Website lead tracking error:', error)
  }
}

/**
 * Sends copies in parallel.
 * It never stops the WhatsApp redirect if one system fails.
 */
export const trackLead = (
  name,
  phone,
  branch,
  source = 'lead_modal'
) => {
  void sendLeadToCRM(name, phone, branch)
  void sendLeadToGoogleSheets(name, phone, branch)
  void sendLeadToSupabase(branch, source)

  return { branch }
}

/**
 * Gets the display name shown in WhatsApp messages.
 */
export const getBranchDisplayName = (branchId) => {
  const branchMap = {
    kurla: 'Kurla',
    vikhroli: 'Vikhroli',
    kandivali: 'Kandivali',
    'asalfa-unisex': 'Asalfa Unisex',
    'asalfa-ladies': 'Asalfa Ladies',
    marol: 'Marol',
    vfour9: 'VFour9',
    all: 'All Branches',
  }

  return branchMap[branchId] || branchId
}