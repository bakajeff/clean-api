import express from 'express'
import cors from 'cors'

import setUpRoutes from '../config/routes'

const app = express()
app.use(express.json())
app.use(cors())

setUpRoutes(app)

export {
  app
}
