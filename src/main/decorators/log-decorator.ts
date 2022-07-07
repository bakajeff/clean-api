import type { LogRepositoryType } from '../../domain/repositories/log-repository'
import { HttpRequestType } from '../../presentation/helpers/http-helper'
import { RouterType } from '../../presentation/helpers/router'

export function LogDecorator (route: RouterType, logRepository: LogRepositoryType) {
  async function perform (httpRequest: HttpRequestType) {
    const response = await route.perform(httpRequest)

    if (response.statusCode === 500) {
      logRepository.perform(response.body.stack)
    }

    return response
  }
  return {
    perform
  }
}
