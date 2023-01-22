

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

window.onload = ch(); scoreOut()

function ch() {
   hand.style.bottom = `${310}px`
   // alert('latest Version: 1.0 beta')
}

const banPanel = document.querySelector('.ban-panel')


document.addEventListener('click', () => {
   if (clicksPerSecond == 15) {
      if (ban) return;
      ban = true;
      banCounter = 30;
      scoreOut()
      banPanel.style.display = 'block'
      let interval = setInterval(() => {
         if (banCounter === 0) {
            console.log('unbaned')
            banPanel.style.display = 'none'
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
               hand.style.bottom = `${pos + 310}px`
               dick.style.bottom = `${pos / 2}px`
            }
         }
      } else {
         pos -= speed;
         hand.style.bottom = `${pos + 310}px`
         dick.style.bottom = `${pos / 2}px`
      }

   }

   setTimeout(() => {
      spermiki += multiplier
      console.log(spermiki)
      scoreOut()
   }, speed);
}

const btns = document.querySelectorAll('.btn')
const btnPanels = document.querySelectorAll('.panel-btn')
const leaveBtns = document.querySelectorAll('.leave-btn')

// btns.forEach((el) => {
//    el.addEventListener('click', (e) => {
//       if (el.classList.contains('active')) {
//          el.classList.remove('active')
//       } else {
//          btns.forEach((e) => {
//             e.classList.remove('active')
//          })
//          el.classList.add('active')

//          let data = el.dataset.btn

//          btnPanels.forEach((el) => {
//             if (data === el.dataset.btn) {

//                if (el.classList.contains('active')) {
//                   el.classList.remove('active')
//                } else {
//                   btnPanels.forEach((e) => {
//                      e.classList.remove('active')
//                   })
//                   el.classList.add('active')
//                }
//             }
//          })
//       }
//    })
// })

leaveBtns.forEach((el) => {
   el.addEventListener('click', (e) => {
      btnPanels.forEach(el => el.classList.remove('active'))
   })
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


