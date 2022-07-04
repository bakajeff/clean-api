import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/express-router-adapter'
import { CreateOngComposer } from '../composers/create-ong-composer'

const { perform: CreateOngController } = CreateOngComposer()

export default (router: Router): void => {
  router.post('/ong/new', ExpressRouterAdapter(CreateOngController()))
}
