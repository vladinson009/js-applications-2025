const errorDiv = document.getElementById('errorBox');

export default function errorModal(error) {
  errorDiv.children[0].textContent = error.message;
  errorDiv.style.display = 'inline-block';

  setTimeout(() => {
    errorDiv.style.display = 'none';
    errorDiv.children[0].textContent = '';
  }, 3000);
}
