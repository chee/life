const canvas = document.getElementById('canvas')
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
      if (friends < 2) return '.'
      if (friends > 3) return '.'
      if (friends == 3) return '#'
      return cell
    })
  ))
  setTimeout(() => {
    loop(board)
  }, 500)
}([
  //0    1    2    3    4    5    6    7    8    9
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ], // 0
  ['.', '.', '.', '.', '.', '#', '.', '.', '.', '.', ], // 1
  ['.', '.', '.', '.', '#', '#', '#', '.', '.', '.', ], // 2
  ['.', '.', '.', '#', '.', '#', '.', '#', '.', '.', ], // 3
  ['.', '.', '#', '#', '#', '.', '#', '#', '#', '.', ], // 4
  ['.', '.', '.', '#', '.', '#', '.', '#', '.', '.', ], // 5
  ['.', '.', '#', '.', '#', '#', '#', '.', '.', '.', ], // 6
  ['.', '.', '#', '.', '.', '#', '.', '.', '.', '.', ], // 7
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ], // 8
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', ], // 9
])
