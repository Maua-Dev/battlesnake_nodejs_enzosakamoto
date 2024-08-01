import { Board } from '../types/board'
import { Point } from '../types/point'

export const isPointInBounds = (point: Point, board: Board): boolean => {
  return (
    point.x >= 0 &&
    point.x < board.width &&
    point.y >= 0 &&
    point.y < board.height
  )
}
