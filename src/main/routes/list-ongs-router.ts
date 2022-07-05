import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/express-router-adapter'
import { ListOngsComposer } from '../composers/list-ongs-composer'

const { perform: ListOngsController } = ListOngsComposer()

export default (router: Router): void => {
  router.get('/ong', ExpressRouterAdapter(ListOngsController()))
}
