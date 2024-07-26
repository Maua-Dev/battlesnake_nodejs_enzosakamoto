export type MoveRequestBody = {
  game: {
    id: string
  }
  turn: number
  board: {
    height: number
    width: number
    food: Array<{ x: number; y: number }>
    hazards: Array<{ x: number; y: number }>
    snakes: Array<{
      id: string
      name: string
      health: number
      body: Array<{ x: number; y: number }>
      head: { x: number; y: number }
      length: number
    }>
  }
  you: {
    id: string
    name: string
    health: number
    body: Array<{ x: number; y: number }>
    head: { x: number; y: number }
    length: number
  }
}
