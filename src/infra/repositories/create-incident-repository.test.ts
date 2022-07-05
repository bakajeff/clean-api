import { UniqueIdGeneratorType } from '../../utils/helpers/unique-id-generator-adapter'

function CreateIncidentRepository (uniqueIdGenerator: UniqueIdGeneratorType) {
  async function perform () {
    uniqueIdGenerator.perform()
  }
  return {
    perform
  }
}

describe('CreateIncidentRepository', () => {
  it('calls UniqueIdGenerator once', async () => {
    const uniqueIdGenerator = { perform: jest.fn() }
    const sut = CreateIncidentRepository(uniqueIdGenerator)
    const uniqueIdGeneratorSpy = jest.spyOn(uniqueIdGenerator, 'perform')

    await sut.perform()

    expect(uniqueIdGeneratorSpy).toHaveBeenCalledTimes(1)
  })
})
