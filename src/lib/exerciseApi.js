// ============================================
// EXERCISEDB API HELPER
// Fetches exercise data from RapidAPI
// ============================================

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST || 'exercisedb.p.rapidapi.com'
const BASE_URL = 'https://exercisedb.p.rapidapi.com'

/**
 * Fetch all exercises (with pagination)
 * @param {number} limit - Number of results per page (default: 100)
 * @param {number} offset - Offset for pagination (default: 0)
 * @returns {Promise<Array>} List of exercises
 */
export const fetchAllExercises = async (limit = 100, offset = 0) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises?limit=${limit}&offset=${offset}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching all exercises:', error)
    throw error
  }
}

/**
 * Fetch exercises by equipment name (e.g., 'smith machine', 'leg press')
 * @param {string} equipment - Equipment name (case insensitive)
 * @returns {Promise<Array>} List of exercises for that equipment
 */
export const fetchExercisesByEquipment = async (equipment) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/equipment/${encodeURIComponent(equipment)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching exercises for equipment "${equipment}":`, error)
    throw error
  }
}

/**
 * Fetch exercises by body part (e.g., 'chest', 'back', 'legs')
 * @param {string} bodyPart - Body part name
 * @returns {Promise<Array>} List of exercises for that body part
 */
export const fetchExercisesByBodyPart = async (bodyPart) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching exercises for body part "${bodyPart}":`, error)
    throw error
  }
}

/**
 * Fetch exercises by target muscle (e.g., 'biceps', 'quadriceps')
 * @param {string} target - Target muscle name
 * @returns {Promise<Array>} List of exercises for that target
 */
export const fetchExercisesByTarget = async (target) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/target/${encodeURIComponent(target)}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching exercises for target "${target}":`, error)
    throw error
  }
}

/**
 * Fetch exercise by ID
 * @param {string} id - Exercise ID
 * @returns {Promise<Object>} Exercise details
 */
export const fetchExerciseById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/exercise/${id}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Error fetching exercise with ID "${id}":`, error)
    throw error
  }
}

/**
 * Fetch exercise GIF image URL
 * @param {string} id - Exercise ID
 * @returns {string} GIF image URL
 */
export const getExerciseImage = (id) => {
  return `${BASE_URL}/images/${id}`
}

/**
 * Get all equipment list (for generating QR codes)
 * @returns {Promise<Array>} List of equipment names
 */
export const fetchEquipmentList = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/exercises/equipmentList`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': API_HOST,
        },
      }
    )
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching equipment list:', error)
    throw error
  }
}

/**
 * Format equipment name for URL (slug)
 * @param {string} name - Equipment name
 * @returns {string} URL-friendly slug
 */
export const slugify = (name) => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens
    .trim()
}

/**
 * Get display name from slug
 * @param {string} slug - URL slug
 * @returns {string} Display name
 */
export const unslugify = (slug) => {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Get equipment display name for QR code URL
 * @param {string} equipmentName - Equipment name from API
 * @returns {string} Formatted equipment name
 */
export const getEquipmentDisplayName = (equipmentName) => {
  const nameMap = {
    'smith machine': 'Smith Machine',
    'barbell': 'Barbell',
    'dumbbell': 'Dumbbell',
    'cable': 'Cable Machine',
    'leg press': 'Leg Press',
    'lat pulldown': 'Lat Pulldown',
    'chest press': 'Chest Press',
    'shoulder press': 'Shoulder Press',
    'rowing': 'Rowing Machine',
    'treadmill': 'Treadmill',
    'elliptical': 'Elliptical',
    'stationary bike': 'Stationary Bike',
    'pec deck': 'Pec Deck',
    'leg curl': 'Leg Curl',
    'leg extension': 'Leg Extension',
    'ab crunch': 'Ab Crunch Machine',
    'cable crossover': 'Cable Crossover',
  }
  return nameMap[equipmentName.toLowerCase()] || equipmentName
}

/**
 * Get icon for equipment (emoji)
 * @param {string} equipmentName - Equipment name
 * @returns {string} Emoji icon
 */
export const getEquipmentIcon = (equipmentName) => {
  const iconMap = {
    'smith machine': '🏋️',
    'barbell': '🏋️',
    'dumbbell': '💪',
    'cable': '🔄',
    'leg press': '🦵',
    'lat pulldown': '⬇️',
    'chest press': '💪',
    'shoulder press': '🏋️',
    'rowing': '🚣',
    'treadmill': '🏃',
    'elliptical': '🚶',
    'stationary bike': '🚴',
    'pec deck': '💪',
    'leg curl': '🦵',
    'leg extension': '🦵',
    'ab crunch': '💪',
    'cable crossover': '🔄',
  }
  return iconMap[equipmentName.toLowerCase()] || '🏋️'
}