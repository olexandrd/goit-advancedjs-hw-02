import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  startButton: document.querySelector('button[data-start]'),
  dateInput: document.querySelector('#datetime-picker'),
};
let timerId = null;
const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    }
    refs.startButton.disabled = false;
    initialSetTimer();
  },
};
const flatpickrDate = flatpickr(refs.dateInput, flatpickrOptions);

refs.startButton.disabled = true;
refs.startButton.addEventListener('click', onStartButtonClick);

function deltaTime() {
  const currentDate = new Date();
  const targetDate = flatpickrDate.selectedDates[0];
  return targetDate - currentDate;
}

function onStartButtonClick() {
  refs.startButton.disabled = true;
  timerId = setInterval(() => {
    if (deltaTime() <= 0) {
      clearInterval(timerId);
      return;
    }
    timerUpdate(deltaTime());
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerUpdate(time) {
  const { days, hours, minutes, seconds } = convertMs(time);
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

/**
 * Show timer immediately after user input.
 */
function initialSetTimer() {
  if (deltaTime() <= 0) {
    return;
  }
  timerUpdate(deltaTime());
}
