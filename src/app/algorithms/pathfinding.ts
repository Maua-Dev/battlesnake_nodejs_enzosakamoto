import { MOVE } from '../types/move'
import { Point } from '../types/point'

export const pathfinding = (start: Point, end: Point): MOVE => {
  if (start.x === end.x && start.y === end.y) return MOVE.DOWN

  if (start.x < end.x) return MOVE.RIGHT
  if (start.x > end.x) return MOVE.LEFT
  if (start.y < end.y) return MOVE.UP
  if (start.y > end.y) return MOVE.DOWN

  return MOVE.DOWN
}
