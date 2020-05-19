export const AUTHENTICATE_USER = 'AUTHENTICATE_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user
  }
}

export function logout() {
  return {
    type: LOGOUT_USER
  }
}