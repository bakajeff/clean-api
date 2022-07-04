import { ListOngsUseCaseType } from '../../domain/usecases/list-ongs-usecase'

function ListOngsUseCase () {
  return {
    perform: jest.fn()
  }
}

function ListOngsRouter (listOngsUseCase: ListOngsUseCaseType) {
  async function perform () {
    await listOngsUseCase.perform()
  }
  return {
    perform
  }
}

describe('ListOngsRouter', () => {
  it('calls ListOngsUseCase once', async () => {
    const listOngsUseCase = ListOngsUseCase()
    const listOngsRouter = ListOngsRouter(listOngsUseCase)
    const listOngsUseCaseSpy = jest.spyOn(listOngsUseCase, 'perform')

    await listOngsRouter.perform()

    expect(listOngsUseCaseSpy).toHaveBeenCalledTimes(1)
  })
})
