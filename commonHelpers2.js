import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as r}from"./assets/vendor-77e16229.js";document.querySelector(".form").addEventListener("submit",function(m){m.preventDefault();const s=document.querySelector('[name="delay"]'),o=document.querySelector('[name="state"]:checked'),t=parseInt(s.value,10),i=o?o.value:"";new Promise((e,c)=>{i==="fulfilled"?setTimeout(()=>e(t),t):i==="rejected"&&setTimeout(()=>c(t),t)}).then(e=>{r.success({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{r.error({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})}),s.value="",o.checked=!1});
//# sourceMappingURL=commonHelpers2.js.map
