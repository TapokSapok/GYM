
const wrapper = document.querySelector('.wrapper')
const dick = document.getElementById('dick')
const hand = document.getElementById('hand')

let posY = undefined;

window.onload = ch()

function ch() {
   hand.style.top = `${206}px`
   dick.style.marginTop = `${53.25}px`

}

wrapper.addEventListener('mousemove', (e) => {

   posY = e.clientY;
   console.log(posY)

   if (posY <= 425) {
      return;
   } else {
      hand.style.top = `${posY - 220}px`
      dick.style.marginTop = `${posY / 8}px`
   }



   // console.log(posY)
})

