import { MOVE } from '../types/move'
import { Board } from '../types/board'
import { Point } from '../types/point'

type Neighbors = { move: MOVE } & Point

export const getNeighbors = (point: Point, board: Board): Neighbors[] => {
  const { width, height } = board
  const neighbors: Neighbors[] = []

  if (point.x + 1 < width)
    neighbors.push({ move: MOVE.RIGHT, x: point.x + 1, y: point.y })
  if (point.x - 1 >= 0)
    neighbors.push({ move: MOVE.LEFT, x: point.x - 1, y: point.y })
  if (point.y + 1 < height)
    neighbors.push({ move: MOVE.UP, x: point.x, y: point.y + 1 })
  if (point.y - 1 >= 0)
    neighbors.push({ move: MOVE.DOWN, x: point.x, y: point.y - 1 })

  return neighbors
}
