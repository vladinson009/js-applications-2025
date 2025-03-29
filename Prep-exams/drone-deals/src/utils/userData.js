function getUserData() {
  const userData = localStorage.getItem('userData');

  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

function setUserData(data) {
  const storage = {
    _id: data._id,
    email: data.email,
    token: data.accessToken,
  };
  localStorage.setItem('userData', JSON.stringify(storage));
}

function clearUserData() {
  localStorage.removeItem('userData');
}
export { getUserData, setUserData, clearUserData };
