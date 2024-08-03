import { Board } from '../types/board'
import { MOVE } from '../types/move'
import { Point } from '../types/point'
import { Snake } from '../types/snake'
import { getFreeSpace } from './get-free-space'
import { isPointInvalid } from './is-point-invalid'
import { willLoseHeadToHead } from './will-lose-head-to-head'

export const getBestMove = (you: Snake, board: Board): MOVE => {
  const start = you.head
  const possibleMoves = Object.values(MOVE)
  let bestMove = 'up'
  let maxFreeSpace = -1

  for (const move of possibleMoves) {
    const nextPosition: Point = { x: start.x, y: start.y }

    switch (move) {
      case MOVE.UP:
        nextPosition.y += 1
        break
      case MOVE.DOWN:
        nextPosition.y -= 1
        break
      case MOVE.LEFT:
        nextPosition.x -= 1
        break
      case MOVE.RIGHT:
        nextPosition.x += 1
        break
    }

    if (
      !isPointInvalid(nextPosition, board) &&
      !willLoseHeadToHead(you, board, nextPosition)
    ) {
      const freeSpace = getFreeSpace(nextPosition, board)

      if (freeSpace > maxFreeSpace) {
        maxFreeSpace = freeSpace
        bestMove = move
      }
    }
  }

  return bestMove as MOVE
}
