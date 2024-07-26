import { Request, Response } from 'express'

export function moveHandler(req: Request, res: Response) {
  try {
    res.json({
      apiversion: '1',
      author: 'Enzo Sakamoto',
      color: '#FC2DCC',
      head: 'replit-mark',
      tail: 'replit-notmark',
      version: '1.0.0'
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error: ' + (error as Error).message)
  }
}
