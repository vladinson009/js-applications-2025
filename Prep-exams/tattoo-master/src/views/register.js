import userService from '../api/userService.js';
import { html, render } from '../utils/lib.js';
import { setUserData } from '../utils/userData.js';

const registerTemplate = (onRegister) => html`<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form @submit=${onRegister} class="register-form">
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="#">Login</a></p>
    </form>
  </div>
</section>`;

export default function registerView(ctx) {
  async function onRegister(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = await userService.register(formData);
      setUserData(data);
      ctx.page.redirect('/');
    } catch (error) {
      alert(error.message);
    }
  }

  return render(registerTemplate(onRegister));
}
