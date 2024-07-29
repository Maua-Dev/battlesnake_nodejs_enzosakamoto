import { Point } from './point'

export type MoveRequestBody = {
  game: {
    id: string
  }
  turn: number
  board: {
    height: number
    width: number
    food: Array<Point>
    hazards: Array<Point>
    snakes: Array<{
      id: string
      name: string
      health: number
      body: Array<Point>
      head: Point
      length: number
    }>
  }
  you: {
    id: string
    name: string
    health: number
    body: Array<Point>
    head: Point
    length: number
  }
}
