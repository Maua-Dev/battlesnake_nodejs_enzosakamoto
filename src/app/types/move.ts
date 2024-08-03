type ObjectValues<T> = T[keyof T]

export const MOVE = {
  UP: 'up',
  LEFT: 'left',
  RIGHT: 'right',
  DOWN: 'down'
} as const

export type MOVE = ObjectValues<typeof MOVE>
