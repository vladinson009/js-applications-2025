import itemService from '../api/itemService.js';
import userService from '../api/userService.js';
import errorModal from '../utils/errorModal.js';
import { html, render } from '../utils/lib.js';
import { setUserData } from '../utils/userData.js';

const loginTemplate = (onLogin) => html`<section id="login">
  <div class="form">
    <h2>Login</h2>
    <form @submit=${onLogin} class="login-form">
      <input type="text" name="email" id="email" placeholder="email" />
      <input type="password" name="password" id="password" placeholder="password" />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>`;

export default function loginView(ctx) {
  async function onLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const userData = await userService.login(formData);
      setUserData(userData);
      ctx.page.redirect('/');
    } catch (error) {
      errorModal(error);
    }
  }

  return render(loginTemplate(onLogin));
}
