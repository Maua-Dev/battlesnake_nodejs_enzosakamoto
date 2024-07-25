import { Request, Response } from 'express'

export function moveHandler(req: Request, res: Response) {
  try {
    res.json({
      apiversion: '1',
      author: 'Enzo Sakamoto',
      color: '#8B0000',
      head: 'tiger-king',
      tail: 'hook',
      version: '1.0.0'
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error: ' + (error as Error).message)
  }
}
