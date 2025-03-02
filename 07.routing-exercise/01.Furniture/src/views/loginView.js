import { html } from '../utils/libs.js';
import { setUserData } from '../utils/userData.js';
import userApi from '../api/userApi.js';
function loginView(onFormSubmit, err) {
  return html`<div class="row space-top">
      <div class="col-md-12">
        <h1>Login User</h1>
        ${err ? html`<p style="color:red">${err}</p>` : null}
      </div>
    </div>
    <form @submit=${onFormSubmit}>
      <div class="row space-top">
        <div class="col-md-4">
          <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email" />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input
              class="form-control"
              id="password"
              type="password"
              name="password"
            />
          </div>
          <input type="submit" class="btn btn-primary" value="Login" />
        </div>
      </div>
    </form>`;
}
export default function showLogin(ctx) {
  ctx.render(loginView(onFormSubmit));

  async function onFormSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    try {
      const userData = await userApi.login(data);
      setUserData(userData);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      ctx.render(loginView(onFormSubmit, error.message));
    }
  }
}
