export const handleLogout = (logout: () => void) => {
  logout()
  location.reload()
}