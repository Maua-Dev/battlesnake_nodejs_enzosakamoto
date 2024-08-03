import { Board } from '../types/board'
import { Point } from '../types/point'
import { Snake } from '../types/snake'
import { getNeighbors } from './get-neighbors'

export const willLoseHeadToHead = (
  you: Snake,
  board: Board,
  move: Point
): boolean => {
  const nextNeighbors = getNeighbors(move, board).filter(
    (n) => !you.body.some((b) => b.x === n.x && b.y === n.y)
  )

  const otherSnakesHeads = board.snakes.map((s) => s.head)

  for (const neighbor of nextNeighbors) {
    if (
      otherSnakesHeads.some((h) => h.x === neighbor.x && h.y === neighbor.y)
    ) {
      if (
        board.snakes.find(
          (s) => s.head.x === neighbor.x && s.head.y === neighbor.y
        ) &&
        board.snakes.find(
          (s) => s.head.x === neighbor.x && s.head.y === neighbor.y
        )!.length >= you.length
      )
        return true
    }
  }

  return false
}
