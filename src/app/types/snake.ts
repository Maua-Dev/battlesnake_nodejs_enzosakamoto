import { Point } from './point'

export type Snake = {
  id: string
  name: string
  health: number
  body: Array<Point>
  head: Point
  length: number
}
