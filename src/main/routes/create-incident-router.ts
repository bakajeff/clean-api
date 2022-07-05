import { Router } from 'express'

import { ExpressRouterAdapter } from '../adapters/express-router-adapter'

import CreateIncidentController from '../composers/create-incident-composer'

export default (router: Router) => {
  router.post('/incidents', ExpressRouterAdapter(CreateIncidentController.perform()))
}
