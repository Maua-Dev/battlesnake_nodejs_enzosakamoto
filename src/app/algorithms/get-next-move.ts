import { Board } from '../types/board'
import { MOVE } from '../types/move'
import { Point } from '../types/point'
import { Snake } from '../types/snake'
import { aStar } from './a-star'

export const getNextMove = (
  start: Point,
  goal: Point,
  board: Board,
  you: Snake
): MOVE => {
  const path = aStar(start, goal, board, you)

  if (path.length > 1) {
    const nextMove = path[1]

    if (nextMove.x > start.x) {
      return MOVE.RIGHT
    } else if (nextMove.x < start.x) {
      return MOVE.LEFT
    } else if (nextMove.y > start.y) {
      return MOVE.DOWN
    } else {
      return MOVE.UP
    }
  }

  return MOVE.UP
}
