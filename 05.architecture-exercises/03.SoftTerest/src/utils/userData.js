export function getUserData() {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return;
  }
  return JSON.parse(userData);
}
export function setUserData({ email, _id, accessToken }) {
  localStorage.setItem('userData', JSON.stringify({ email, _id, accessToken }));
}
export function clearUserData() {
  localStorage.removeItem('userData');
}
