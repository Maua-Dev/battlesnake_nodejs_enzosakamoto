import { Router, Request, Response } from 'express'
import { moveHandler } from '../handlers/move-handler'
import { MoveRequestBody } from '../types/move-request'
import { MoveResponseBody } from '../types/move-response'
import { MOVE } from '../types/move'

export const router = Router()

router.get('/', moveHandler)

router.post(
  '/move',
  (
    req: Request<unknown, unknown, MoveRequestBody>,
    res: Response<MoveResponseBody>
  ) => {
    const { board, you } = req.body

    /*
      Estou no (1,1)
      Possíveis:
        - (1,0)
        - (0,1)
        - (1,2)
        - (2,1)
    */

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
        for (let i = 0; i < you.body.length; i++)
          if (move.x === you.body[i].x && move.y === you.body[i].y)
            willColid = true

        return !willColid
      })

    console.log(possibleMoves)

    const i = Math.floor(Math.random() * possibleMoves.length)

    const response = {
      move: possibleMoves[i].move,
      shout: `I'm moving ${possibleMoves[i].move}!`
    }
    res.json(response)
  }
)
