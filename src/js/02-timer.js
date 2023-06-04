import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button');
const dayNow = new Date();
startBtn.disabled = true;
let selectedTime = null;
let timerId = null;
const input = document.querySelector('input');

const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

startBtn.addEventListener('click', onClickStsrtBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let startTime = dayNow.getTime();
    const selectedDate = selectedDates[0];
    selectedTime = selectedDate.getTime();
    if (selectedDate > startTime) {
      startBtn.disabled = false;
      return;
    }
    Notiflix.Notify.failure('Please choose a date in the future');
},
};

const flatpick = flatpickr('#datetime-picker', options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onClickStsrtBtn() {
    startBtn.disabled = true;
    timerId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = selectedTime - currentTime;
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log(`${days}:${hours}:${minutes}:${seconds}`);
        
        timer.days.textContent = `${days}`;
        timer.hours.textContent = `${hours}`;
        timer.minutes.textContent = `${minutes}`;
        timer.seconds.textContent = `${seconds}`;
        
        if (deltaTime < 0) {
            clearInterval(timerId);
            timer.days.textContent = '00';
            timer.hours.textContent = '00';
            timer.minutes.textContent = '00';
            timer.seconds.textContent = '00';
            Notiflix.Notify.success('Time is over');
        }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
  return String(value).padStart(2, '0');
}

const valueStyles = document.querySelectorAll('.value');
const labelStyles = document.querySelectorAll('.label');
const timerStyle = document.querySelector('.timer');
valueStyles.forEach(value => {
    value.style.display = 'flex';
    value.style.alignItems = 'center';
    value.style.justifyContent = 'center';
    value.style.fontWeight = '400';
    value.style.fontSize = '50px';
});

labelStyles.forEach(value => {
  value.style.display = 'flex';
  value.style.fontWeight = '400';
  value.style.fontSize = '20px';
  value.style.textTransform = 'uppercase';
});

timerStyle.style.display = 'flex';
timerStyle.style.gap = '20px';

input.style.padding = '10px';
input.style.fontSize = '35px';
input.style.width = '305px';

startBtn.style.padding = '10px';
startBtn.style.fontSize = '35px';
startBtn.style.width = '130px';
