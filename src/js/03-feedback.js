import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailField = form.querySelector('input[name="email"]');
const messageField = form.querySelector('textarea[name="message"]');
const submitButton = form.querySelector('button[type="submit"]');

const currentInput = {
  email: emailField.value,
  message: messageField.value,
};

const STORAGE_KEY = 'feedback-form-state';

const saveStateToLocalStorage = throttle(() => {
  currentInput.email = emailField.value;
  currentInput.message = messageField.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentInput));
}, 500);

const loadStateFromLocalStorage = () => {
  const storedInput = localStorage.getItem(STORAGE_KEY);
  if (storedInput) {
    const { email, message } = JSON.parse(storedInput);
    emailField.value = email;
    messageField.value = message;
  }
};

const clearLocalStorageAndFields = () => {
  localStorage.removeItem(STORAGE_KEY);
  emailField.value = '';
  messageField.value = '';
  console.log('Form data cleared:', { email: '', message: '' });
};

window.addEventListener('load', () => {
  loadStateFromLocalStorage();
  form.addEventListener('input', saveStateToLocalStorage);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (emailField.value === '' || messageField.value === '') {
    console.log('Please fill in all the fields!');
  } else {
    console.log(currentInput);
    clearLocalStorageAndFields();
  }
});
