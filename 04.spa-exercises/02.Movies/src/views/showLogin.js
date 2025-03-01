const loginPage = document.getElementById('form-login');

export function showLogin(main) {
  main.replaceChildren(loginPage);
}
