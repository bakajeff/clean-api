import { ServerError } from '../../presentation/errors/server-error'
import { HttpRequestType, ok, serverError } from '../../presentation/helpers/http-helper'
import { RouterType } from '../../presentation/helpers/router'

type LogRepositoryType = {
  perform: (stack: string) => Promise<void>
}

function LogDecorator (route: RouterType, logRepository: LogRepositoryType) {
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

describe('LogDecorator', () => {
  const route = { perform: jest.fn().mockResolvedValue(ok({ name: 'any value' })) }

  it('calls route perform once', async () => {
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
  it('calls route perform with correct values', async () => {
    const logRepository = { perform: jest.fn() }
    const logDecorator = LogDecorator(route, logRepository)
    const routeSpy = jest.spyOn(route, 'perform')

    await logDecorator.perform({
      body: {
        name: 'any_name'
      }
    })

    expect(routeSpy).toHaveBeenCalledWith({
      body: {
        name: 'any_name'
      }
    })
  })
  it('retuns the same value as route', async () => {
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
  it('calls logRepository with correct error if controller return an server error', async () => {
    const logRepository = { perform: jest.fn() }
    const logDecorator = LogDecorator(route, logRepository)
    const logRepositorySpy = jest.spyOn(logRepository, 'perform')

    jest.spyOn(route, 'perform').mockResolvedValueOnce(serverError(new ServerError('any_stack')))
    await logDecorator.perform({
      body: {
        name: 'any_name'
      }
    })

    expect(logRepositorySpy).toHaveBeenCalledWith('any_stack')
  })
})
