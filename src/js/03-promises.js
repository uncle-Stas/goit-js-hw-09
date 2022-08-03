import Notiflix from 'notiflix';

Notiflix.Notify.init({
  timeout: 5000,
  useIcon: false,
});

const refs = {
  getDelayInput: document.querySelector('input[name="delay"]'),
  getStepInput: document.querySelector('input[name="step"]'),
  getAmountInput: document.querySelector('input[name="amount"]'),
  dataForm: document.querySelector('.form'),
};

refs.dataForm.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();

  let firstDelay = refs.getDelayInput.valueAsNumber;
  let stepDelay = refs.getStepInput.valueAsNumber;
  let amountPromises = refs.getAmountInput.valueAsNumber;

  let delay = firstDelay;

  for (let i = 1; i <= amountPromises; i += 1) {
    let position = i;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += stepDelay;
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
  });
}
