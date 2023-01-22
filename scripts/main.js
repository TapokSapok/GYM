

const wrapper = document.querySelector('.wrapper')
const dick = document.getElementById('dick')
const hand = document.getElementById('hand')
const spermikiOut = document.getElementById('spermiki')
const banCounterQuery = document.querySelector('.ban-counter')

let animateActive = false;
let spermiki = 0;
let multiplier = 1;
let speed = 10;
let clicksPerSecond = 0;
let banCounter = 30;
let ban = false;
let skinActive = document.getElementById('dick')

// let inventory = {
//    dicks: []
// }

let inventory = {
   dicks: []
}



window.onload = ch(); scoreOut()

function ch() {
   hand.style.bottom = `${200}px`
   // alert('latest Version: 1.0 beta')
   skinActive.style.display = 'block'
}

const banPanel = document.querySelector('.ban-panel')


document.addEventListener('click', () => {
   if (clicksPerSecond == 15) {
      if (ban) return;
      ban = true;
      banCounter = 30;
      scoreOut()

      openBtn.style.background = 'red'
      btns.forEach((el) => {
         el.style.background = 'red'
      })

      banPanel.style.display = 'block'
      let interval = setInterval(() => {
         if (banCounter === 0) {
            console.log('unbaned')
            banPanel.style.display = 'none'
            openBtn.style.background = '#191919'
            btns.forEach((el) => {
               el.style.background = '#191919'
            })
            clearInterval(interval)
            ban = false;
         }
         banCounter -= 1
         scoreOut()
      }, 1000);
   }
   clicksPerSecond += 1
})

setInterval(() => {
   clicksPerSecond = 0;
}, 1000);

function scoreOut() {
   spermikiOut.innerText = 'Спермиков: ' + spermiki
   banCounterQuery.innerText = banCounter
}

function drochAnim() {
   if (animateActive === true) return;
   animateActive = true;

   let pos = 0;
   let one = setInterval(frameOne, 0)

   function frameOne() {
      console.log(pos)
      if (pos <= -350) {
         clearInterval(one)
         let two = setInterval(frameTwo, 0)

         function frameTwo() {
            if (pos === 0) {
               clearInterval(two)
               animateActive = false;
            } else {
               pos += speed
               hand.style.bottom = `${pos + 200}px`
               dick.style.bottom = `${pos / 2}px`
            }
         }
      } else {
         pos -= speed;
         hand.style.bottom = `${pos + 200}px`
         dick.style.bottom = `${pos / 2}px`
      }

   }

   setTimeout(() => {
      spermiki += multiplier
      console.log(spermiki)
      scoreOut()
   }, speed);
}

const btnPanels = document.querySelectorAll('.panel-btn')
const leaveBtns = document.querySelectorAll('.leave-btn')

const openBtn = document.querySelector('.open-btn')
const btnsMenu = document.querySelector('.btn-items')
const btns = document.querySelectorAll('.btn-item')

openBtn.addEventListener('click', () => {
   btnsMenu.style.display == 'none' ? btnsMenu.style.display = 'block' : btnsMenu.style.display = 'none'
})

btns.forEach((el) => {
   el.addEventListener('click', (e) => {
      let data = el.dataset.btn

      btnPanels.forEach((el) => {
         el.classList.remove('active')
         if (data === el.dataset.btn) {
            el.classList.add('active')
         }
      })
   })
})

leaveBtns.forEach((el) => {
   el.addEventListener('click', (e) => {
      btnPanels.forEach(el => el.classList.remove('active'))
   })
})

const promoInput = document.querySelector('.promo-input')
const promoBtn = document.querySelector('.promo-btn')

promoBtn.addEventListener('click', () => {
   if (promoInput.value === 'promo') {
      promoInput.value = 'Промокод активирован!'
      promoInput.style.color = '#00FF00'
      inventory.dicks.push('rubber')
      skinActive = document.getElementById('skin-rubber')
      skinActive.style.display = 'block'

      setTimeout(() => {
         promoInput.style.color = '#fff'
         promoInput.value = ''
      }, 700);
      return;
   }
   promoInput.value = 'Промокод не найден!'
   promoInput.style.color = 'red'
   setTimeout(() => {
      promoInput.style.color = '#fff'
      promoInput.value = ''
   }, 700);

})

