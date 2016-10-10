const life = document.getElementById('life')
const go = document.getElementById('go')
const pause = document.getElementById('pause')
const clear = document.getElementById('clear')

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
  const board = undraw()
  pause.style.display = 'inline-block'
  clear.style.display = go.style.display = 'none'
  localStorage.setItem('board', JSON.stringify(board))
  loop(board)
})

pause.addEventListener('mousedown', () => {
  clear.style.display = go.style.display = 'inline-block'
  pause.style.display = 'none'
  clearTimeout(timeout)
})

clear.addEventListener('mousedown', () => {
  draw(clearBoard(undraw()))
})

function tap(event) {
  const target = event.target
  if (target.type == 'checkbox') {
    const checked = target.checked
    function drag(event) {
      const currentTarget = event.touches
        ? document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY)
        : event.target
      target.checked = !checked
      currentTarget.checked = !checked
    }
    function release() {
      life.removeEventListener('mouseover', drag)
      life.removeEventListener('touchmove', drag)
      life.removeEventListener('mouseup', release)
      life.removeEventListener('touchend', release)
    }
    life.addEventListener('mouseover', drag)
    life.addEventListener('touchmove', drag)
    window.addEventListener('mouseup', release)
    window.addEventListener('touchend', release)
  }
}

life.addEventListener('mousedown', tap)
life.addEventListener('touchstart', tap)

function buildBoard(width, height = width) {
  const row = [...Array(width)].map(Boolean)
  const board = []
  while (height--) {
    board.push([...row])
  }
  return board
}

function randomBoard(width, height = width) {
  const board = buildBoard(width, height)
  return board.map(line => line.map(cell => (
    Math.random() > 0.5 ? true : false
  )))
}

function clearBoard(board) {
  const width = board.length
  const height = board[0].length
  return buildBoard(width, height)
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
  }, 100)
}

let storageBoard = localStorage.getItem('board')
draw((storageBoard && JSON.parse(storageBoard)) || randomBoard(20))
