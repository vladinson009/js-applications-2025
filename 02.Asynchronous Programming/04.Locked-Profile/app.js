async function lockedProfile() {
  const main = document.getElementById('main');

  main.addEventListener('click', onClick);
  main.innerHTML = '';

  const response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
  const users = Object.values(await response.json());

  let idx = 1;

  for (const user of users) {
    const divProfile = document.createElement('div');
    divProfile.className = 'profile';

    divProfile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="${user.username}Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="${user.username}Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user${idx++}Username" value="${
      user.username
    }" disabled readonly />
				<div class="${user.username}Username hiddenInfo">
					<hr>
					<label>Email:</label>
					<input type="email" name="${user.username}Email" value="${
      user.email
    }" disabled readonly />
					<label>Age:</label>
					<input type="number" name="${user.username}Age" value="${
      user.age
    }" disabled readonly />
				</div>
				
				<button>Show more</button>
        `;
    main.appendChild(divProfile);
  }

  function onClick(e) {
    if (e.target.tagName == 'BUTTON') {
      const profile = e.target.parentElement;

      const isLocked = profile.querySelector(
        'input[type="radio"][value="lock"]'
      ).checked;

      if (!isLocked) {
        if (e.target.textContent == 'Show more') {
          e.target.textContent == 'Hide It';
        } else if (e.target.textContent == 'Hide It') {
          e.target.textContent == 'Show more';
        }
        profile.querySelector('div').classList.toggle('hiddenInfo');
      }
    }
  }
}
