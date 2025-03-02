import userApi from '../api/userApi.js';
import { html } from '../utils/libs.js';
import { setUserData } from '../utils/userData.js';

function registerView(onFormSubmit, err) {
  return html` <div class="row space-top">
      <div class="col-md-12">
        <h1>Register New User</h1>
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
          <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control" id="rePass" type="password" name="rePass" />
          </div>
          <input type="submit" class="btn btn-primary" value="Register" />
        </div>
      </div>
    </form>`;
}

export default function showRegister(ctx) {
  ctx.render(registerView(onFormSubmit));

  async function onFormSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));
    try {
      const userData = await userApi.register(data);
      setUserData(userData);
      ctx.page.redirect('/dashboard');
    } catch (error) {
      ctx.render(registerView(onFormSubmit, error.message));
    }
  }
}
