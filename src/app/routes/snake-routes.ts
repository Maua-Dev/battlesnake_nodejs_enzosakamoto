import { Router, Request, Response } from 'express'
import { moveHandler } from '../handlers/move-handler'
import { MoveRequestBody } from '../types/move-request'
import { MoveResponseBody } from '../types/move-response'
import { MOVE } from '../types/move'
import { Point } from '../types/point'

export const router = Router()

router.get('/', moveHandler)

router.post(
  '/move',
  (
    req: Request<unknown, unknown, MoveRequestBody>,
    res: Response<MoveResponseBody>
  ) => {
    const { board, you } = req.body

    const busyPoints = board.snakes.reduce<Point[]>((acc, snake) => {
      return acc.concat(snake.body)
    }, [])

    busyPoints.push(...board.hazards)

    const possibleMoves = [
      { move: MOVE.DOWN, x: you.head.x, y: you.head.y - 1 },
      { move: MOVE.LEFT, x: you.head.x - 1, y: you.head.y },
      { move: MOVE.UP, x: you.head.x, y: you.head.y + 1 },
      { move: MOVE.RIGHT, x: you.head.x + 1, y: you.head.y }
    ]
      .filter(
        (move) =>
          move.x < board.width &&
          move.x >= 0 &&
          move.y < board.height &&
          move.y >= 0
      )
      .filter((move) => {
        let willColid = false
        for (const body of you.body)
          if (move.x === body.x && move.y === body.y) willColid = true

        return !willColid
      })
      .filter((move) => {
        let willColid = false
        for (const busy of busyPoints)
          if (move.x === busy.x && move.y === busy.y) willColid = true

        return !willColid
      })

    const i = Math.floor(Math.random() * possibleMoves.length)

    const response = {
      move: possibleMoves ? possibleMoves[i].move : MOVE.DOWN,
      shout: `I'm moving ${possibleMoves[i].move}!`
    }
    res.json(response)
  }
)
