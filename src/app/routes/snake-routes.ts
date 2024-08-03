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
import { willLoseHeadToHead } from '../algorithms/will-lose-head-to-head'
// import { getNextMove } from '../algorithms/get-next-move'

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

    if (you.health <= 98) {
      const closestFood = getFoodHeuristic(you.head, board)
      const path = pathfinding(you.head, closestFood)
      // const nextMove = getNextMove(you.head, closestFood, board, you)
      const neighbors = getNeighbors(you.head, board)
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (
            neighbor.move === path &&
            !isPointInvalid(neighbor, board) &&
            !willLoseHeadToHead(you, board, neighbor)
          ) {
            move = path
            break
          } else {
            move = getBestMove(you, board)
          }
        }
      } else {
        move = getBestMove(you, board)
      }
    } else {
      move = getBestMove(you, board)
    }

    const response = {
      move: move,
      shout: `I'm moving ${move}!`
    }
    res.json(response)
  }
)
