import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f,i as h}from"./assets/vendor-77e16229.js";const e={datePicker:document.getElementById("datetime-picker"),startBtn:document.querySelector("[data-start]"),days:document.querySelector("[data-days]"),hours:document.querySelector("[data-hours]"),minutes:document.querySelector("[data-minutes]"),seconds:document.querySelector("[data-seconds]")};let s=null;e.startBtn.disabled=!0;const d={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const n=t[0];n>d.defaultDate?(y(),c(n)):B("Please choose a date in the future")}};f(e.datePicker,d);function y(){e.startBtn.disabled=!1,e.startBtn.addEventListener("click",p)}function p(){c(e.datePicker._flatpickr.selectedDates[0]),e.startBtn.disabled=!0,e.datePicker.disabled=!0}function c(t){s=setInterval(()=>{const n=t-Date.now(),o=S(n);k(o),n<1e3&&clearInterval(s)},1e3)}function k({days:t,hours:n,minutes:o,seconds:a}){e.days.textContent=r(t),e.hours.textContent=r(n),e.minutes.textContent=r(o),e.seconds.textContent=r(a)}function r(t){return String(t).padStart(2,"0")}function S(t){const u=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),m=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:i,minutes:l,seconds:m}}function B(t){h.error({title:"Error",message:t,position:"topRight"})}
//# sourceMappingURL=commonHelpers.js.map
