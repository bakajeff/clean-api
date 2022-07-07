import { HttpRequestType } from '../../presentation/helpers/http-helper'
import { RouterType } from '../../presentation/helpers/router'

type LogRepositoryType = {
  perform: (stack: string, date: string) => Promise<void>
}

function LogDecorator (route: RouterType, logRepository: LogRepositoryType) {
  async function perform (httpRequest: HttpRequestType) {
    await route.perform(httpRequest)
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
        name: 'any name'
      }
    })

    expect(routeSpy).toHaveBeenCalledTimes(1)
  })
})
