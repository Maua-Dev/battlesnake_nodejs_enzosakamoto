import { getBestMove } from '../algorithms/get-best-move'
import { Router, Request, Response } from 'express'
import { moveHandler } from '../handlers/move-handler'
import { MoveRequestBody } from '../types/move-request'
import { MoveResponseBody } from '../types/move-response'
import { MOVE } from '../types/move'
import { getFoodHeuristic } from '../algorithms/get-food-heuristic'
import { pathfinding } from '../algorithms/pathfinding'
import { getNeighbors } from '../algorithms/get-neighbors'
import { isPointInvalid } from '../algorithms/is-point-invalid'

export const router = Router()

router.get('/', moveHandler)

router.post(
  '/move',
  (
    req: Request<unknown, unknown, MoveRequestBody>,
    res: Response<MoveResponseBody>
  ) => {
    const { board, you } = req.body

    let move: MOVE = MOVE.UP

    if (you.health <= 80) {
      const minDistanceToFood = getFoodHeuristic(you.head, board)
      const path = pathfinding(you.head, minDistanceToFood)
      const neighbors = getNeighbors(you.head, board)
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (neighbor.move === path && !isPointInvalid(neighbor, board)) {
            move = path
            break
          } else {
            move = getBestMove(you.head, board)
          }
        }
      } else {
        move = getBestMove(you.head, board)
      }
    } else {
      move = getBestMove(you.head, board)
    }

    const response = {
      move: move,
      shout: `I'm moving ${move}!`
    }
    res.json(response)
  }
)
