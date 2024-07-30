import { Board } from './board'
import { Snake } from './snake'

export type MoveRequestBody = {
  game: {
    id: string
  }
  turn: number
  board: Board
  you: Snake
}
