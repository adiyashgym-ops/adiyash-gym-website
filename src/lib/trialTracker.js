import { supabase } from './supabase'
import { sendLeadToCRM } from './leadTracker'

/**
 * Check if a person has already taken a trial by phone number.
 */
export const checkExistingTrial = async (phone) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .select('*')
      .eq('phone', phone)
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
 * Now includes photo_url for the member's photo.
 */
export const addTrial = async (trialData) => {
  try {
    // Check if phone already exists
    const existing = await checkExistingTrial(trialData.phone)

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

    // CRM receives name, mobile and branch (no Aadhar)
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
 * Search trials by phone number (replaces Aadhar search).
 */
export const searchTrialsByPhone = async (phone) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .select('*')
      .eq('phone', phone)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  } catch (error) {
    console.error('Error searching trials by phone:', error)
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
    console.error('Error fetching trials by branch:', error)
    return []
  }
}

/**
 * Upload a trial member's photo to Supabase Storage.
 * Returns the public URL of the uploaded photo.
 */
export const uploadTrialPhoto = async (file, phone) => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${phone}-${Date.now()}.${fileExt}`
    const filePath = `trial-photos/${fileName}`

    const { error } = await supabase.storage
      .from('trial-photos')
      .upload(filePath, file)

    if (error) throw error

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('trial-photos')
      .getPublicUrl(filePath)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('Error uploading photo:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Delete a photo from Supabase Storage.
 */
export const deleteTrialPhoto = async (photoUrl) => {
  try {
    if (!photoUrl) return { success: true }

    // Extract file path from URL
    const path = photoUrl.split('/').pop()
    if (!path) return { success: true }

    const { error } = await supabase.storage
      .from('trial-photos')
      .remove([`trial-photos/${path}`])

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting photo:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Update a trial record (including photo_url).
 */
export const updateTrial = async (id, trialData) => {
  try {
    const { data, error } = await supabase
      .from('trials')
      .update({
        name: trialData.name,
        phone: trialData.phone,
        branch: trialData.branch,
        trial_date: trialData.trial_date,
        trial_time: trialData.trial_time,
        photo_url: trialData.photo_url || null,
      })
      .eq('id', id)
      .select()

    if (error) throw error

    return { success: true, data: data[0] }
  } catch (error) {
    console.error('Error updating trial:', error)
    return { success: false, error: error.message }
  }
}