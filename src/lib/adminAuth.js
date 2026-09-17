const TOKEN_KEY = 'admin_session_token'

/**
 * Checks the password against the server and stores the session token on success.
 */
export const loginAdmin = async (password) => {
  const response = await fetch('/api/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })

  const data = await response.json()

  if (data.success) {
    sessionStorage.setItem(TOKEN_KEY, data.token)
  }

  return data
}

/**
 * Confirms the stored session token is still valid with the server.
 * Used to guard admin-only pages on load.
 */
export const verifyAdminSession = async () => {
  const token = sessionStorage.getItem(TOKEN_KEY)

  if (!token) {
    return false
  }

  try {
    const response = await fetch('/api/admin-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    const data = await response.json()
    return !!data.valid
  } catch (error) {
    console.error('Admin session check failed:', error)
    return false
  }
}

export const logoutAdmin = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}
