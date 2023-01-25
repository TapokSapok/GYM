

const wrapper = document.querySelector('.wrapper')
const dick = document.getElementById('dick')
const hand = document.getElementById('hand')
const spermikiOut = document.getElementById('spermiki')
const banCounterQuery = document.querySelector('.ban-counter')

const invBtn = document.querySelectorAll('.inv-item-btn');
const invItems = document.querySelectorAll('.inv-item');

const banPanel = document.querySelector('.ban-panel')

const btnPanels = document.querySelectorAll('.panel-btn')
const leaveBtns = document.querySelectorAll('.leave-btn')

const openBtn = document.querySelector('.open-btn')
const btnsMenu = document.querySelector('.btn-items')
const btns = document.querySelectorAll('.btn-item')

const promoInput = document.querySelector('.promo-input')
const promoBtn = document.querySelector('.promo-btn')

const shopBtn = document.querySelectorAll('.shop-item-btn')
const shopPrice = document.querySelectorAll('.shop-item-price')
const shopItem = document.querySelectorAll('.shop-item')





let animateActive = false;
let spermiki = 0;
let speed = 10;
let clicksPerSecond = 0;
let banCounter = 30;
let ban = false;
let activeSkin;


let multiplier = () => {
   for (let i = 0; i < game.skins.dicks.length; i++) {
      if (game.skins.dicks[i].enable) return game.skins.dicks[i].multiplier
   }
};

let resetActiveSkin = () => {
   activeSkin.style.display = 'none'
   for (let i = 0; i < game.skins.dicks.length; i++) {
      game.skins.dicks[i].enable = false;
   }
}

let findActiveSkin = () => {
   for (let i = 0; i < game.skins.dicks.length; i++) {
      if (game.skins.dicks[i].enable == true) {

         switch (game.skins.dicks[i].item) {
            case 'default': activeSkin = document.getElementById('dick')
               break;
            case 'rubber': activeSkin = document.getElementById('skin-rubber')
               break;
            case 'american': activeSkin = document.getElementById('skin-american')
               break;
         }

         enableInventory()

         activeSkin.style.display = 'block'
         return game.skins.dicks[i].item;
      }
   }
}

function enableInventory() {
   invBtn.forEach((el) => {
      el.innerText = 'Выбрать'
      for (let i = 0; i < game.skins.dicks.length; i++) {
         if (game.skins.dicks[i].enable && game.skins.dicks[i].item === el.dataset.skin) {
            el.innerText = 'Используется'
         }
      }
   })
}

function adderToInventory() {
   for (let i = 0; i < game.skins.dicks.length; i++) {
      if (game.skins.dicks[i].owns) {
         invItems.forEach((el) => {
            if (el.dataset.skin === game.skins.dicks[i].item) {
               el.style.display = 'block'
               console.log(el.dataset.skin)
            }
         })
      }
   }
}

let game = {
   levels: [
      { id: 0, title: 'default', },
      { id: 1, title: '', },
      { id: 2, title: '', },
      { id: 3, title: '', },
      { id: 4, title: '', },
   ],
   skins: {
      dicks: [
         { item: 'default', owns: true, enable: true, multiplier: 1 },
         { item: 'rubber', owns: false, enable: false, multiplier: 2 },
         { item: 'american', owns: false, enable: false, multiplier: 2 },
         { item: '', owns: false, enable: false, multiplier: 1 },
         { item: '', owns: false, enable: false, multiplier: 1 },
      ],
      hands: [
         { item: 'default', owns: false, enable: false, multiplier: 1 },
         { item: '', owns: false, enable: false, multiplier: 1 },
         { item: '', owns: false, enable: false, multiplier: 1 },
         { item: '', owns: false, enable: false, multiplier: 1 },
         { item: '', owns: false, enable: false, multiplier: 1 },
      ]
   }
}

window.onload = ch(); scoreOut(); adderToInventory()

function ch() {
   hand.style.bottom = `${200}px`
   // alert(`Версия: 1.2 БЕТА
   // Что было добавлено (изменено):
   //    1. Поменял интерфейс.
   //    2. Добавил промокоды.
   //    3. Добавил скины.
   //    4. Пофиксил баги.

   // По поводу промокода на эксклюзивный член писать @SapokTapok
   // `)
   findActiveSkin()
}


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
               activeSkin.style.bottom = `${pos / 2}px`
            }
         }
      } else {
         pos -= speed;
         hand.style.bottom = `${pos + 200}px`
         activeSkin.style.bottom = `${pos / 2}px`
      }
   }
   setTimeout(() => {
      spermiki += multiplier()
      scoreOut()
   }, speed);
}


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


promoBtn.addEventListener('click', () => {
   switch (promoInput.value) {
      case 'don2023': activatePromo(1)
         break
      case 'AmericanLox': activatePromo(2)
         break
      default: {
         promoInput.value = 'Промокод не найден!'
         promoInput.style.color = 'red'
         setTimeout(() => {
            promoInput.style.color = '#fff'
            promoInput.value = ''
         }, 700);
      }
         break
   }
})

function activatePromo(i) {
   promoInput.value = 'Промокод активирован!'
   promoInput.style.color = '#00FF00'

   resetActiveSkin()
   game.skins.dicks[i].owns = true;
   game.skins.dicks[i].enable = true;
   findActiveSkin()

   setTimeout(() => {
      promoInput.style.color = '#fff'
      promoInput.value = ''
   }, 700);
   return;
}


invBtn.forEach((el) => {
   el.addEventListener('click', (e) => {
      for (let i = 0; i < game.skins.dicks.length; i++) {
         if (el.dataset.skin === game.skins.dicks[i].item) {
            if (!game.skins.dicks[i].owns) { return; }

            resetActiveSkin()
            game.skins.dicks[i].enable = true;
            findActiveSkin()

            enableInventory()
         }
      }
   })
})


shopBtn.forEach((el) => {
   el.addEventListener('click', () => {
      for (let i = 0; i < game.skins.dicks.length; i++) {
         if (el.dataset.skin === game.skins.dicks[i].item) {
            if (spermiki < +el.dataset.price) {
               el.innerText = 'Нехватает спермы :('
               setTimeout(() => {
                  el.innerText = 'Купить'
               }, 700);
               return;
            }

            let data = el.dataset.skin
            spermiki -= +el.dataset.price
            scoreOut()

            for (let i = 0; i < game.skins.dicks.length; i++) {
               if (game.skins.dicks[i].item === data) {
                  game.skins.dicks[i].owns = true;
               }
            }
            adderToInventory()

            shopItem.forEach((el) => {
               if (el.dataset.skin === data) {
                  el.remove()
               }
            })
         }
      }
   })
})