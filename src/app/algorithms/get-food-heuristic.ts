import { Board } from '../types/board'
import { Point } from '../types/point'

export const getFoodHeuristic = (start: Point, board: Board): Point => {
  const { food } = board
  const distances = food.map((food) => {
    return Math.abs(food.x - start.x) + Math.abs(food.y - start.y)
  })

  const minDistance = Math.min(...distances)
  const minIndex = distances.indexOf(minDistance)

  return food[minIndex]
}
