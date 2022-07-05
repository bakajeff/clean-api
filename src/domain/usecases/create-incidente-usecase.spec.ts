function CreateIncidentUseCase (createIncidentRepository: any) {
  async function perform () {
    createIncidentRepository.perform()
  }
  return {
    perform
  }
}

describe('CreateIncidentUseCase', () => {
  it('calls CreateIncidentRepository once', async () => {
    const createIncidentRepository = {
      perform: jest.fn()
    }
    const sut = CreateIncidentUseCase(createIncidentRepository)
    const createIncidentRepositorySpy = jest.spyOn(createIncidentRepository, 'perform')

    await sut.perform()

    expect(createIncidentRepositorySpy).toHaveBeenCalledTimes(1)
  })
})
