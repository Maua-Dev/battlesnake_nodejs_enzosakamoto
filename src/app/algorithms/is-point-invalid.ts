import { Board } from '../types/board'
import { Point } from '../types/point'
import { isPointInBounds } from './is-point-in-bounds'

export const isPointInvalid = (point: Point, board: Board): boolean => {
  if (!isPointInBounds(point, board)) {
    return true
  }

  const busyPoints = board.snakes.reduce<Point[]>((acc, snake) => {
    return acc.concat(snake.body)
  }, [])

  busyPoints.push(...board.hazards)

  return busyPoints.some((busy) => busy.x === point.x && busy.y === point.y)
}
