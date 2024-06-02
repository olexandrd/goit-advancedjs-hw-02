import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  const amount = Number(formData.get('amount'));
  const initialDelay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  evt.target.reset();
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, initialDelay + step * (i - 1));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      iziToast.success({
        title: `Promise ${position}`,
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
      });
    })
    .catch(({ position, delay }) => {
      iziToast.error({
        title: `Promise ${position}`,
        message: `❌ Rejected promise ${position} in ${delay}ms`,
      });
    });
}
