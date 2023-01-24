

const wrapper = document.querySelector('.wrapper')
const dick = document.getElementById('dick')
const hand = document.getElementById('hand')
const spermikiOut = document.getElementById('spermiki')
const banCounterQuery = document.querySelector('.ban-counter')

let animateActive = false;
let spermiki = 0;
let speed = 10;
let clicksPerSecond = 0;
let banCounter = 30;
let ban = false;
let activeSkin;


let multiplier = () => {
   for (let i = 0; i < inventory.skins.length; i++) {
      if (inventory.skins[i].enable) return inventory.skins[i].multiplier
   }
};

let resetActiveSkin = () => {
   activeSkin.style.display = 'none'
   for (let i = 0; i < inventory.skins.length; i++) {
      inventory.skins[i].enable = false;
   }
}

let findActiveSkin = () => {
   for (let i = 0; i < inventory.skins.length; i++) {
      if (inventory.skins[i].enable == true) {

         switch (inventory.skins[i].item) {
            case 'default': activeSkin = document.getElementById('dick')
               break;
            case 'rubber': activeSkin = document.getElementById('skin-rubber')
               break;
            case 'Amerikan': activeSkin = document.getElementById('skin-American')
         }

         activeSkin.style.display = 'block'
         return inventory.skins[i].item;
      }
   }
}

let inventory = {
   skins: [
      { item: 'default', owns: true, enable: true, multiplier: 1 },
      { item: 'rubber', owns: false, enable: false, multiplier: 2 },
      { item: 'Amerikan', owns: false, enable: false, multiplier: 2 },
      { item: '', owns: false, enable: false, multiplier: 1 },
      { item: '', owns: false, enable: false, multiplier: 1 },
   ]
}

let game = {
   levels: [
      { id: 0, title: 'default', },
      { id: 1, title: '', },
      { id: 2, title: '', },
      { id: 3, title: '', },
      { id: 4, title: '', },
   ]
}

window.onload = ch(); scoreOut()

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

function activatePromo(i) {
   promoInput.value = 'Промокод активирован!'
   promoInput.style.color = '#00FF00'

   resetActiveSkin()
   inventory.skins[i].owns = true;
   inventory.skins[i].enable = true;
   findActiveSkin()


   setTimeout(() => {
      promoInput.style.color = '#fff'
      promoInput.value = ''
   }, 700);
   return;
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
   if (promoInput.value === 'don2023') {
      activatePromo(1)
   } else if (promoInput.value === 'AmerikaLox') {
      activatePromo(2)
   } else {
      promoInput.value = 'Промокод не найден!'
      promoInput.style.color = 'red'
      setTimeout(() => {
         promoInput.style.color = '#fff'
         promoInput.value = ''
      }, 700);
   }
})

const invBtn = document.querySelectorAll('.inv-item-btn');
const invItems = document.querySelector('.inv-items');

invBtn.forEach((el) => {
   el.addEventListener('click', (e) => {
      for (let i = 0; i < inventory.skins.length; i++) {
         if (el.dataset.skin === inventory.skins[i].item) {
            if (!inventory.skins[i].owns) { return; }

            resetActiveSkin()
            inventory.skins[i].enable = true;
            findActiveSkin()

            invBtn.forEach((el) => {
               el.innerText = 'Выбрать'
            })

            el.innerText = 'Используется'
         }
      }
   })
})

const shopBtn = document.querySelectorAll('.shop-item-btn')
const shopPrice = document.querySelectorAll('.shop-item-price')
const shopItem = document.querySelectorAll('.shop-item')

shopBtn.forEach((el) => {
   el.addEventListener('click', () => {
      for (let i = 0; i < inventory.skins.length; i++) {
         if (el.dataset.skin === inventory.skins[i].item) {
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

            for (let i = 0; i < inventory.skins.length; i++) {
               if (inventory.skins[i].item === data) {
                  inventory.skins[i].owns = true;
               }
            }

            shopItem.forEach((el) => {
               if (el.dataset.skin === data) {
                  el.remove()
               }
            })

            let newItem = document.createElement('div')
            newItem.className = "inv-item";
            newItem.innerHTML = `
            <div class="inv-item-title">${el.dataset.skin}</div>
            <img src="skins/${el.dataset.skin}.png" class="inv-item-image">
            <button class="inv-item-btn" data-skin="${el.dataset.skin}">Выбрать</button>
            `;
            invItems.append(newItem)
         }
      }
   })
})