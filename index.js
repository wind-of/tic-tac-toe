let FLAG_pvp = true
let FLAG_cross = true

const cubes = document.querySelectorAll(".cube")
const map = []



// document
//   .querySelector(".switcher")
//   .addEventListener(
//     "click",
//     ({ currentTarget }) => (currentTarget.classList.toggle("active"), FLAG_pvp = !FLAG_pvp)
//   )




function checkWinning(movemaker) {
  for(let i = 0, row = 0, column = 0; i < 3; row = column = 0, i++) {
    for(let m = 0; m < 3; m++) {
      row += Number(cubes[i * 3 + m].classList.contains(movemaker))
      column += Number(cubes[i + m * 3].classList.contains(movemaker))
    }
    if(row === 3 || column === 3)
      return true
  }
    
  let upsDownDiag = 0, downUpsDiag = 0
  for(let i = 0, m = 0; i < 3 && m < 3; i = ++m) {
    upsDownDiag += Number(cubes[i + m * 3].classList.contains(movemaker))
    downUpsDiag += Number(cubes[i + (2 - m) * 3].classList.contains(movemaker))
  }
  return upsDownDiag === 3 || downUpsDiag === 3
}

function finishGame(movemaker) {
  FLAG_cross = true

  document
    .querySelector(".winner")
    .textContent = "Победа " + ({"cross": "крестиков", "circle": "ноликов"})[movemaker]

  cubes.forEach(
    (cube) => {
      cube.removeEventListener("click", cubeClickListener)
      cube.classList.add("game-finished")
    }
  )
}




function cubeClickListener({ target, currentTarget }) {
  if(target !== currentTarget) {
    return
  }
  const movemaker = (["circle", "cross"])[Number(FLAG_cross)]
  target.classList.add(movemaker)
  FLAG_cross = !FLAG_cross
  
  if(checkWinning(movemaker)) 
    finishGame(movemaker)
}
cubes.forEach(
  (cube) => cube.addEventListener("click", cubeClickListener)
)




document
  .querySelector(".clear-button")
  .addEventListener("click", () => {
    cubes.forEach((cube) => {
      cube.classList.remove("circle", "cross", "game-finished")
      cube.addEventListener("click", cubeClickListener)
    })
    document
      .querySelector(".winner")
      .textContent = ""
  })
  