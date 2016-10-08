const t = true
const f = false

const board = [
// 0  1  2  3  4  5  6  7  8  9
  [f, f, f, f, f, f, f, f, f, f ], // 0
  [f, f, f, f, f, t, f, f, f, f ], // 1
  [f, f, f, f, t, t, t, f, f, f ], // 2
  [f, f, f, t, f, t, f, t, f, f ], // 3
  [f, f, t, t, t, f, t, t, t, f ], // 4
  [f, f, f, t, f, t, f, t, f, f ], // 5
  [f, f, f, f, t, t, t, f, f, f ], // 6
  [f, t, f, f, f, t, f, f, f, f ], // 7
  [t, t, t, f, f, f, f, f, f, f ], // 8
  [f, t, f, f, f, f, f, f, f, f ], // 9
]

const directions = [
  [-1, -1],
  [-1,  0],
  [-1,  1],
  [ 0,  1],
  [ 1,  1],
  [ 1,  0],
  [ 1, -1],
  [ 0, -1]
]

~function loop(board) {
  canvas.innerHTML = board.map(line => line.join(' ')).join('\n')
  board = board.map((row, rowIndex) => (
    row.map((cell, columnIndex) => {
      let friends = 0
      directions.forEach(direction => {
        let row = board[rowIndex + direction[0]]
        row && row[columnIndex + direction[1]] == '#' && (friends += 1)
      })
      if (friends < 2) return false
      if (friends > 3) return false
      if (friends == 3) return true
      return cell
    })
  ))
  setTimeout(() => {
    loop(board)
  }, 500)
}(board)
