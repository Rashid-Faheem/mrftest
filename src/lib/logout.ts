// utils/logout.ts
export function logoutUser() {
  localStorage.removeItem("session")
  window.location.href = "/login"  // or use router.push if you're in a component
}
