
const wrapper = document.querySelector('.wrapper')
const dick = document.getElementById('dick')
const hand = document.getElementById('hand')
const spermikiOut = document.getElementById('spermiki')

let animateActive = false;
let spermiki = 0;
let multiplier = 1;

window.onload = ch(); scoreOut()

function ch() {
   hand.style.top = `${206}px`
   dick.style.marginTop = `${53.25}px`
}

function scoreOut() {
   spermikiOut.innerText = 'Спермиков: ' + spermiki
}

function drochAnim() {
   if (animateActive === true) return;
   animateActive = true;

   let pos = 0;
   let one = setInterval(frameOne, 0)
   let speed = 10;

   function frameOne() {
      if (pos >= 350) {
         clearInterval(one)
         let two = setInterval(frameTwo, 0)

         function frameTwo() {
            if (pos === 0) {
               clearInterval(two)
               animateActive = false;
            } else {
               pos -= speed
               hand.style.top = `${pos + 200}px`
               dick.style.marginTop = `${pos / 2}px`
            }
         }
      } else {
         pos += speed;
         hand.style.top = `${pos + 200}px`
         dick.style.marginTop = `${pos / 2}px`
      }
   }

   setTimeout(() => {
      spermiki += multiplier
      console.log(spermiki)
      scoreOut()
   }, speed * 20);
}

