import { Point } from './point'
import { Snake } from './snake'

export type Board = {
  height: number
  width: number
  food: Array<Point>
  hazards: Array<Point>
  snakes: Array<Snake>
}
