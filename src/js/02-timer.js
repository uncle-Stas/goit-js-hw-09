import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStartTimer = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

btnStartTimer.setAttribute('disabled', '');

let selectedDateUnix = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      btnStartTimer.setAttribute('disabled', '');

      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
    } else {
      btnStartTimer.removeAttribute('disabled');

      selectedDateUnix = selectedDates[0].getTime();
    }
  },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

btnStartTimer.addEventListener('click', () => {
  let timerId = null;

  function countdown() {
    const remainTimeUnix = selectedDateUnix - Date.now();

    if (remainTimeUnix <= 0) {
      clearInterval(timerId);
      return Notiflix.Notify.success('Time is over');
    }

    const remainTime = convertMs(remainTimeUnix);

    daysValue.textContent = remainTime.days;
    hoursValue.textContent = remainTime.hours;
    minutesValue.textContent = remainTime.minutes;
    secondsValue.textContent = remainTime.seconds;
  }

  countdown();
  timerId = setInterval(countdown, 1000);
});
