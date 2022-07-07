import { HttpRequestType, ok } from '../../presentation/helpers/http-helper'
import { RouterType } from '../../presentation/helpers/router'

type LogRepositoryType = {
  perform: (stack: string, date: string) => Promise<void>
}

function LogDecorator (route: RouterType, logRepository: LogRepositoryType) {
  async function perform (httpRequest: HttpRequestType) {
    const response = await route.perform(httpRequest)

    return response
  }
  return {
    perform
  }
}

describe('LogDecorator', () => {
  it('calls route perform', async () => {
    const route = { perform: jest.fn() }
    const logRepository = { perform: jest.fn() }
    const logDecorator = LogDecorator(route, logRepository)
    const routeSpy = jest.spyOn(route, 'perform')

    await logDecorator.perform({
      body: {
        name: 'any_name'
      }
    })

    expect(routeSpy).toHaveBeenCalledTimes(1)
  })
  it('retuns the same value as route', async () => {
    const route = { perform: jest.fn() }
    const logRepository = { perform: jest.fn() }
    const logDecorator = LogDecorator(route, logRepository)

    jest.spyOn(route, 'perform').mockResolvedValueOnce(ok({
      name: 'any_name'
    }))

    const httpResponse = await logDecorator.perform({
      body: {
        name: 'any_name'
      }
    })

    expect(httpResponse).toEqual(ok({ name: 'any_name' }))
  })
})
