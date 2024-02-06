import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  datePicker: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  resetBtn: document.querySelector('[data-reset]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let intervalId = null;

refs.startBtn.disabled = true;
refs.stopBtn.disabled = true;
refs.resetBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0];
    if (userSelectedDate > options.defaultDate) {
      enableStartButton();
    } else {
      showErrorToast('Please choose a date in the future');
    }
  },
};

flatpickr(refs.datePicker, options);

function enableStartButton() {
  refs.startBtn.disabled = false;
  refs.startBtn.addEventListener('click', handleStartButtonClick);
}

function enableStopButton() {
  refs.stopBtn.disabled = false;
  refs.stopBtn.addEventListener('click', handleStopButtonClick);
}

function enableResetButton() {
  refs.resetBtn.disabled = false;
  refs.resetBtn.addEventListener('click', handleResetButtonClick);
}

function handleStartButtonClick() {
  startCountdown(refs.datePicker._flatpickr.selectedDates[0]);
  refs.startBtn.disabled = true;
  refs.datePicker.disabled = true;
  enableStopButton(); // Активируем кнопку "Stop" при нажатии на "Start"
  enableResetButton(); // Активируем кнопку "Reset" при нажатии на "Start"
}

function handleStopButtonClick() {
  clearInterval(intervalId); // Останавливаем интервал
  intervalId = null;
  refs.startBtn.disabled = false; // Включаем кнопку "Start"
  refs.datePicker.disabled = false; // Включаем поле выбора даты
  refs.stopBtn.disabled = true; // Делаем кнопку "Stop" неактивной
}

function handleResetButtonClick() {
  clearInterval(intervalId); // Останавливаем интервал
  intervalId = null;
  resetClock(); // Сбрасываем значения таймера
  refs.startBtn.disabled = true; // Делаем кнопку "Start" неактивной
  refs.stopBtn.disabled = true; // Делаем кнопку "Stop" неактивной
  refs.resetBtn.disabled = true; // Делаем кнопку "Reset" неактивной
  refs.datePicker.disabled = false; // Включаем поле выбора даты
}

function startCountdown(targetDate) {
  intervalId = setInterval(() => {
    const deltaTime = targetDate - Date.now();
    const time = convertMs(deltaTime);
    updateClockFace(time);
    if (deltaTime < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function resetClock() {
  refs.days.textContent = '00';
  refs.hours.textContent = '00';
  refs.minutes.textContent = '00';
  refs.seconds.textContent = '00';
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}
