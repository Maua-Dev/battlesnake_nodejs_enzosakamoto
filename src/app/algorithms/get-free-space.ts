import { Board } from '../types/board'
import { Point } from '../types/point'
import { isPointInvalid } from './is-point-invalid'
import { getNeighbors } from './get-neighbors'

export const getFreeSpace = (start: Point, board: Board): number => {
  const queue: Point[] = [start]
  const visited: Set<string> = new Set([`${start.x},${start.y}`])

  let freeSpace = 0

  while (queue.length > 0) {
    const point = queue.shift() as Point
    freeSpace++

    const neighbors = getNeighbors(point, board)
    for (const neighbor of neighbors) {
      const key = `${neighbor.x},${neighbor.y}`
      if (!visited.has(key) && !isPointInvalid(neighbor, board)) {
        visited.add(key)
        queue.push(neighbor)
      }
    }
  }

  return freeSpace
}
