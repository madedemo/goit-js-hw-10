import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Объявляем объект с ссылками на элементы страницы
const refs = {
  datePicker: document.getElementById('datetime-picker'), // Поле для выбора даты
  startBtn: document.querySelector('[data-start]'), // Кнопка "Старт"
  days: document.querySelector('[data-days]'), // Поле для отображения дней
  hours: document.querySelector('[data-hours]'), // Поле для отображения часов
  minutes: document.querySelector('[data-minutes]'), // Поле для отображения минут
  seconds: document.querySelector('[data-seconds]'), // Поле для отображения секунд
};

let intervalId = null; // Идентификатор интервала для обновления таймера

// Делаем кнопку "Старт" неактивной по умолчанию
refs.startBtn.disabled = true;

// Настройки для календаря
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // Обработчик события закрытия календаря
  onClose(selectedDates) {
    const userSelectedDate = selectedDates[0]; // Выбранная пользователем дата

    // Проверяем, выбрана ли дата в будущем
    if (userSelectedDate > options.defaultDate) {
      enableStartButton(); // Активируем кнопку "Старт"
      startCountdown(userSelectedDate); // Запускаем таймер обратного отсчета
    } else {
      showErrorToast('Please choose a date in the future'); // Выводим сообщение об ошибке
    }
  },
};

// Инициализируем календарь
flatpickr(refs.datePicker, options);

// Функция для активации кнопки "Старт"
function enableStartButton() {
  refs.startBtn.disabled = false; // Делаем кнопку активной
  // Добавляем обработчик события на кнопку "Старт"
  refs.startBtn.addEventListener('click', handleStartButtonClick);
}

// Обработчик события для нажатия на кнопку "Старт"
function handleStartButtonClick() {
  startCountdown(refs.datePicker._flatpickr.selectedDates[0]); // Запускаем таймер
  refs.startBtn.disabled = true; // Делаем кнопку неактивной
  refs.datePicker.disabled = true; // Делаем поле выбора даты неактивным
}

// Функция для запуска таймера обратного отсчета
function startCountdown(targetDate) {
  intervalId = setInterval(() => {
    const deltaTime = targetDate - Date.now(); // Вычисляем разницу во времени
    const time = convertMs(deltaTime); // Конвертируем разницу в формат дней, часов, минут и секунд
    updateClockFace(time); // Обновляем отображение времени на странице

    // Проверяем, закончился ли отсчет времени
    if (deltaTime < 1000) {
      clearInterval(intervalId); // Останавливаем таймер
    }
  }, 1000);
}

// Функция для обновления отображения времени на странице
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days); // Обновляем количество дней
  refs.hours.textContent = addLeadingZero(hours); // Обновляем количество часов
  refs.minutes.textContent = addLeadingZero(minutes); // Обновляем количество минут
  refs.seconds.textContent = addLeadingZero(seconds); // Обновляем количество секунд
}

// Функция для добавления ведущего нуля к числам, если они меньше 10
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функция для конвертации времени в миллисекундах в формат дней, часов, минут и секунд
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

// Функция для вывода сообщения об ошибке
function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    message,
    position: 'topRight',
  });
}
