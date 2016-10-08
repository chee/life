const life = document.getElementById('life')
const go = document.getElementById('go')
const pause = document.getElementById('pause')

const directions = [
  { x: -1, y: -1 },
  { x: -1, y:  0 },
  { x: -1, y:  1 },
  { x:  0, y:  1 },
  { x:  1, y:  1 },
  { x:  1, y:  0 },
  { x:  1, y: -1 },
  { x:  0, y: -1 },
]

go.addEventListener('mousedown', () => {
  pause.style.display = 'block'
  go.style.display = 'none'
  loop(undraw())
})

pause.addEventListener('mousedown', () => {
  go.style.display = 'block'
  pause.style.display = 'none'
  clearTimeout(timeout)
})

function board(width, height = width) {
  const row = [...Array(width)].map(Boolean)
  const board = []
  while (height--) {
    board.push([...row])
  }
  return board
}

function draw(board) {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  life.innerHTML = board.map(line => (
    '<div>' +
    line.map(cell => (cell
      ? checkbox.setAttribute('checked', 'checked')
      : checkbox.removeAttribute('checked')) || checkbox.outerHTML
    ).join('')
    + '</div>'
  )).join('')
}

function undraw() {
  return [...life.children]
    .map(line => [...line.children]
      .map(input => input.checked))
}

let timeout
function loop(board) {
  board = board.map((row, rowIndex) => (
    row.map((cell, columnIndex) => {
      let friends = 0
      directions.forEach(direction => {
        let row = board[rowIndex + direction.x]
        row && row[columnIndex + direction.y] && (friends += 1)
      })
      if (friends < 2) return false
      if (friends > 3) return false
      if (friends == 3) return true
      return cell
    })
  ))
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    draw(board)
    loop(undraw())
  }, 250)
}

draw(board(20))
