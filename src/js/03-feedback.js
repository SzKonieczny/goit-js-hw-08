import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const feedbackFormStateKey = 'feedback-form-state';

const saveFormStateToLocalStorage = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(feedbackFormStateKey, JSON.stringify(formData));
}, 500);

const loadFormStateFromLocalStorage = () => {
  const savedFormData = localStorage.getItem(feedbackFormStateKey);
  if (savedFormData) {
    const { email, message } = JSON.parse(savedFormData);
    emailInput.value = email;
    messageInput.value = message;
  }
};

window.addEventListener('load', loadFormStateFromLocalStorage);

form.addEventListener('input', saveFormStateToLocalStorage);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log('Submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });

  localStorage.removeItem(feedbackFormStateKey);
  emailInput.value = '';
  messageInput.value = '';
});
