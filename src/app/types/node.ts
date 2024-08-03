import { Point } from './point'

export type Node = {
  point: Point
  parent: Node | null
  g: number // Custo do caminho desde o início até este nó
  h: number // Heurística (estimativa de custo do nó até o objetivo)
  f: number // g + h
}
