const canvas = document.getElementById('canvas')

let board = [
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

canvas.innerHTML = board.map(line => line.join(' ')).join('\n')

~function loop() {
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
    canvas.innerHTML = board.map(line => line.join(' ')).join('\n')
    loop()
  }, 500)
}()
