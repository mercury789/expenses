
function set(name, value) {
   localStorage.setItem(name, value)
}
function rem(name) {
   localStorage.removeItem(name)
}
function get(name) {

   return localStorage.getItem(name)
}
function clear() {
   localStorage.clear()
}

function formatNum(num) {
   // Делим на 1000 и оставляем ровно один знак после запятой
   return (num / 1000).toFixed(1);
}

function shadowOff(){
      const shadow = document.querySelector('[data-shadow]')
      shadow.classList.remove('_active') 
      
}



document.addEventListener('DOMContentLoaded', () => {
   if (get('body')) {
      document.body.innerHTML = get('body');
   }
});



function save() {
   set('body', document.querySelector('body').innerHTML)
}



function shadowAdd() {
   const shadow = document.querySelector('[data-shadow]')
   shadow.classList.add('_active')
}

function inpNum() {
   shadowAdd()
   input = document.createElement('input')
   input.type = 'number'
   input.style = 'position: fixed; bottom: 60px; left: 10px; width: 40px; color: #FCFCFC;'
   input.setAttribute('tabindex', '-1')
   document.body.appendChild(input)
   input.focus()
}

function inpText() {
   shadowAdd()
   input = document.createElement('input')
   input.type = 'text'
   input.style = 'position: fixed; bottom: 60px; left: 10px; width: 80px; color: #FCFCFC;'
   input.setAttribute('tabindex', '-1')
   document.body.appendChild(input)
   input.focus()
}

function prom(textMessage) {
   const raw = prompt(textMessage);
   if (raw === null || raw === undefined) throw "stop";
   const clean = raw.trim();
   if (clean === "") throw "stop";
   return !Number.isNaN(Number(clean)) ? Number(clean) : clean;
}

function logic() {
   const numberElements = document.querySelectorAll('[data-expenses-kr]');
   const totalSum = Array.from(numberElements).reduce((sum, el) => {
      const num = parseFloat(el.innerText) || 0;
      return sum + num;
   }, 0);
   
   numberElements.forEach(el => {
      const num = parseFloat(el.innerText) || 0;
      const percentage = totalSum > 0 ? Math.round((num / totalSum) * 100) : 0;
      const parent = el.closest('[data-expenses-block]');
      if (parent) {
         const percentTarget = parent.querySelector('[data-expenses-procent-act]');
         if (percentTarget) {
            percentTarget.innerText = `${percentage}%`;
         }
      }
   });
}

const well = 0.047

document.addEventListener('click', (event) => {
   const targ = event.target
   
   
   
   if (targ.closest('[data-expenses-reset]')) {
      clear()
      
      targ.classList.add('_active')
   }
   
   if (targ.closest('[data-expenses-del]')) {
      targ.closest('[data-expenses-block]').remove()
      logic()
      save()
   }
   
   if (targ.closest('[data-expenses-btn]')) {
      inpText()
      input.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
            event.preventDefault()
            const inputValue = input.value.trim()
            
            if (!inputValue) {
               input.remove()
               return
            }
            
            document.querySelector('[data-expenses]').insertAdjacentHTML('beforeend', `
               <div data-expenses-block>
                  <div data-expenses-name>${inputValue}</div>
                  <div data-expenses-group>
                     <div data-expenses-income>-</div>
                     
                     <div data-expenses-kr>0.00</div>
                     <div data-expenses-usdt>0</div>
                     <div data-expenses-procent-act>0%</div>
                     <div data-expenses-kr-old>0</div>
                     <div data-expenses-procent-old>0%</div>
                     <div data-expenses-del>x</div>
                  </div>
               </div>
               
            `)
            
            logic()
            input.remove()
            shadowOff()
            save()
         }
      })
   }
   
   if (targ.closest('[data-expenses-income]')) {
      inpNum()
      input.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
            event.preventDefault()
            const val = input.value.trim()
            
            if (val === "" || isNaN(Number(val))) {
               input.remove()
               return
            }
            
            const num = Number(val)
            const parent = targ.closest('[data-expenses-block]')
            const obj = parent.querySelector('[data-expenses-kr]')
            const calc = (Number(obj.innerText) || 0) + num
            
            obj.innerText = calc
            parent.querySelector('[data-expenses-usdt]').innerText = (calc * well).toFixed(0)
            
            logic()
            input.remove()
            shadowOff()
            save()
         }
      })
   }
   
   if (targ.closest('[data-expenses-name]')) {
      inpText()
      input.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
            event.preventDefault()
            const inputValue = input.value.trim()
            
            if (!inputValue) {
               input.remove()
               return
            }
            
            targ.closest('[data-expenses-name]').innerText = inputValue
            logic()
            input.remove()
            shadowOff()
            save()
         }
      })
   }
   
   if (targ.closest('[data-expenses-kr]')) {
      inpNum()
      input.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
            event.preventDefault()
            const val = input.value.trim()
            
            if (val === "" || isNaN(Number(val))) {
               input.remove()
               return
            }
            
            const data = Number(val)
            targ.closest('[data-expenses-kr]').innerText = data
            targ.closest('[data-expenses-block]').querySelector('[data-expenses-usdt]').innerText = (data * well).toFixed(0)
            
            logic()
            input.remove()
            shadowOff()
            save()
         }
      })
   }
   
   if (targ.closest('[data-expenses-procent-old]')) {
      inpNum()
      input.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
            event.preventDefault()
            const val = input.value.trim()
            
            if (val === "" || isNaN(Number(val))) {
               input.remove()
               return
            }
            
            targ.closest('[data-expenses-procent-old]').innerText = `${Number(val)}%`
            logic()
            input.remove()
            shadowOff()
            save()
         }
      })
   }
   
   if (targ.closest('[data-expenses-kr-old]')) {
      inpNum()
      input.addEventListener('keydown', (event) => {
         if (event.key === 'Enter') {
            event.preventDefault()
            const val = input.value.trim()
            
            if (val === "" || isNaN(Number(val))) {
               input.remove()
               return
            }
            
            targ.closest('[data-expenses-kr-old]').innerText = Number(val)
            logic()
            input.remove()
            shadowOff()
            save()
         }
      })
   }
   
   // Клик по тени: гасим задник и удаляем инпут, если он висит в документе
   if (targ.closest('[data-shadow]')) {
      shadowOff()
      
      // Проверяем, существует ли инпут в DOM, и если да — убираем его
      if (typeof input !== 'undefined' && input && input.parentNode) {
         input.remove()
         shadowOff()
         save()
      }
   }
})



document.addEventListener('DOMContentLoaded', () => {
   const popup = document.querySelector('[data-expenses-endmonth]');
   if (!popup) return;
   
   const date = new Date();
   // Создаем строку вида "YYYY-MM" (например: "2026-07")
   const currentMonthStr = `${date.getFullYear()}-${date.getMonth()}`;
   
   // Если в памяти месяц НЕ совпадает с текущим — показываем плашку
   if (get('lastClosedMonth') !== currentMonthStr) {
      popup.classList.add('_active');
   }
   
   // При клике скрываем и записываем текущий месяц в память
   popup.addEventListener('click', () => {
      popup.classList.remove('_active');
      set('lastClosedMonth', currentMonthStr); // Теперь она не вылезет до следующего месяца
      
      
      const krAll = document.querySelectorAll('[data-expenses-kr]')
      const usdtAll = document.querySelectorAll('[data-expenses-usdt]')
      const procentActAll = document.querySelectorAll('[data-expenses-procent-act]')
      
      krAll.forEach((e) =>{
         const num = formatNum(e.innerText)
         e.innerText = '0.00'
         e.closest('[data-expenses-block]').querySelector('[data-expenses-kr-old]').innerText = num
      })
      usdtAll.forEach((e) => {
   e.innerText = '0'
})
procentActAll.forEach((e) => {
   
   const num = parseInt(e.innerText, 10)
e.innerText = '0%'
e.closest('[data-expenses-block]').querySelector('[data-expenses-procent-old]').innerText = `${num}%`
})
      
      logic()
      
   });
});


