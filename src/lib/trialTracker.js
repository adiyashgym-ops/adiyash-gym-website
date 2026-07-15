import { supabase } from './supabase'

/**
 * Check if a person has already taken a trial
 * @param {string} aadhar - Aadhar number to check
 * @returns {Promise<Object>} { exists, trialData }
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
        allTrials: data
      }
    }
    
    return { exists: false, trialData: null, allTrials: [] }
  } catch (error) {
    console.error('Error checking trial:', error)
    return { exists: false, trialData: null, allTrials: [], error: error.message }
  }
}

/**
 * Add a new trial record
 * @param {Object} trialData - { name, phone, aadhar, branch, trial_date, trial_time }
 * @returns {Promise<Object>} { success, data, error }
 */
export const addTrial = async (trialData) => {
  try {
    // First check if Aadhar already exists
    const existing = await checkExistingTrial(trialData.aadhar)
    
    if (existing.exists) {
      return {
        success: false,
        error: `Already trialed on ${existing.trialData.trial_date} at ${existing.trialData.branch}`,
        existingTrial: existing.trialData
      }
    }
    
    const { data, error } = await supabase
      .from('trials')
      .insert([trialData])
      .select()
    
    if (error) throw error
    
    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error adding trial:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Search trials by Aadhar number
 * @param {string} aadhar - Aadhar number to search
 * @returns {Promise<Array>} List of trials
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
 * Get all trials (for admin dashboard)
 * @param {number} limit - Number of results (default: 100)
 * @returns {Promise<Array>} List of all trials
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
 * Get trials by branch
 * @param {string} branch - Branch name
 * @returns {Promise<Array>} List of trials for that branch
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
    console.error('Error fetching trials by branch:', error)
    return []
  }
}