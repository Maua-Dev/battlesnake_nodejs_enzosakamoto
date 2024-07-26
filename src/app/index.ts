import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express'
import ServerlessHttp from 'serverless-http'
import { STAGE } from './enums/stage_enum'
import { router } from './routes/snake-routes'

const app = express()
app.use(express.json())
app.use(router)

app.post('/start', (req: Request, res: Response) => {
  res.send('ok')
})

app.post('/end', (req: Request, res: Response) => {
  res.send('ok')
})

console.log('process.env.STAGE: ' + process.env.STAGE)

if (process.env.STAGE === STAGE.TEST) {
  app.listen(3000, () => {
    console.log('Server up and running on: http://localhost:3000 🚀')
  })
} else {
  module.exports.handler = ServerlessHttp(app)
}
