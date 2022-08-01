const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let colorInterval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', startChangeBodyColor);
refs.btnStop.addEventListener('click', stopChangeBodyColor);

function startChangeBodyColor() {
  refs.btnStart.setAttribute('disabled', '');

  colorInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangeBodyColor() {
  refs.btnStart.removeAttribute('disabled');

  clearInterval(colorInterval);
}
