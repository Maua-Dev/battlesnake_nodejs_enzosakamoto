import { Point } from '../types/point'
import { heuristic } from './heuristic'
import { Node } from '../types/node'
import { isPointInBounds } from './is-point-in-bounds'
import { Board } from '../types/board'
import { Snake } from '../types/snake'
import { getNeighbors } from './get-neighbors'

export const aStar = (
  start: Point,
  goal: Point,
  board: Board,
  you: Snake
): Point[] => {
  const obstacles: Point[] = board.snakes
    .filter((snake) => snake.id !== you.id)
    .flatMap((snake) => snake.body)
  const openList: Node[] = []
  const closedList: Node[] = []
  const startNode: Node = {
    point: start,
    parent: null,
    g: 0,
    h: heuristic(start, goal),
    f: heuristic(start, goal)
  }

  openList.push(startNode)

  while (openList.length > 0) {
    // Encontrar o nó com o menor f
    let lowestIndex = 0
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowestIndex].f) {
        lowestIndex = i
      }
    }

    const currentNode = openList[lowestIndex]

    // Verificar se alcançamos o objetivo
    if (currentNode.point.x === goal.x && currentNode.point.y === goal.y) {
      const path: Point[] = []
      let current: Node | null = currentNode
      while (current) {
        path.push(current.point)
        current = current.parent
      }
      return path.reverse() // Caminho do início ao objetivo
    }

    // Mover o nó atual da openList para a closedList
    openList.splice(lowestIndex, 1)
    closedList.push(currentNode)

    // Obter vizinhos
    const neighbors = getNeighbors(currentNode.point, board)

    for (const neighbor of neighbors) {
      if (!isPointInBounds(neighbor, board)) {
        continue // Fora dos limites do tabuleiro
      }

      if (
        obstacles.some(
          (obstacle) => obstacle.x === neighbor.x && obstacle.y === neighbor.y
        )
      ) {
        continue // É um obstáculo
      }

      if (
        closedList.some(
          (node) => node.point.x === neighbor.x && node.point.y === neighbor.y
        )
      ) {
        continue // Já está na closedList
      }

      const g = currentNode.g + 1
      const h = heuristic(neighbor, goal)
      const f = g + h

      const existingNode = openList.find(
        (node) => node.point.x === neighbor.x && node.point.y === neighbor.y
      )

      if (existingNode) {
        if (g < existingNode.g) {
          existingNode.g = g
          existingNode.f = f
          existingNode.parent = currentNode
        }
      } else {
        openList.push({ point: neighbor, parent: currentNode, g, h, f })
      }
    }
  }

  return [] // Caminho não encontrado
}
