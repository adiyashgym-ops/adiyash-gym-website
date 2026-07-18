import { supabase } from './supabase'
import { sendLeadToCRM } from './leadTracker'

/**
 * Check if a person has already taken a trial.
 */
export const checkExistingTrial = async (aadhar) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .select('*')
      .eq('aadhar', aadhar)
      .order('created_at', { ascending: false })

    if (error) throw error

    if (data && data.length > 0) {
      return {
        exists: true,
        trialData: data[0],
        allTrials: data,
      }
    }

    return {
      exists: false,
      trialData: null,
      allTrials: [],
    }
  } catch (error) {
    console.error('Error checking trial:', error)

    return {
      exists: false,
      trialData: null,
      allTrials: [],
      error: error.message,
    }
  }
}

/**
 * Add a new trial record.
 * Aadhaar remains only in the website trial system.
 */
export const addTrial = async (trialData) => {
  try {
    const existing = await checkExistingTrial(
      trialData.aadhar
    )

    if (existing.exists) {
      return {
        success: false,
        error: `Already trialed on ${existing.trialData.trial_date} at ${existing.trialData.branch}`,
        existingTrial: existing.trialData,
      }
    }

    const { data, error } = await supabase
      .from('trials')
      .insert([trialData])
      .select()

    if (error) throw error

    // CRM receives only name, mobile and branch.
    // Do not wait or stop the trial record if CRM fails.
    void sendLeadToCRM(
      trialData.name,
      trialData.phone,
      trialData.branch
    )

    return {
      success: true,
      data: data[0],
    }
  } catch (error) {
    console.error('Error adding trial:', error)

    return {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Search trials by Aadhaar number.
 */
export const searchTrialsByAadhar = async (aadhar) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .select('*')
      .eq('aadhar', aadhar)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('Error searching trials:', error)
    return []
  }
}

/**
 * Get recent trials.
 */
export const getAllTrials = async (limit = 100) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('Error fetching trials:', error)
    return []
  }
}

/**
 * Get trials for one branch.
 */
export const getTrialsByBranch = async (branch) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .select('*')
      .eq('branch', branch)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error(
      'Error fetching trials by branch:',
      error
    )

    return []
  }
}