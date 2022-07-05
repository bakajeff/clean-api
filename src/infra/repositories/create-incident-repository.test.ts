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
  const uniqueIdGenerator = { perform: jest.fn() }
  it('calls UniqueIdGenerator once', async () => {
    const sut = CreateIncidentRepository(uniqueIdGenerator)
    const uniqueIdGeneratorSpy = jest.spyOn(uniqueIdGenerator, 'perform')

    await sut.perform()

    expect(uniqueIdGeneratorSpy).toHaveBeenCalledTimes(1)
  })
  it('throws if UniqueIdGenerator throws', async () => {
    const sut = CreateIncidentRepository(uniqueIdGenerator)
    jest.spyOn(uniqueIdGenerator, 'perform').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.perform()

    expect(promise).rejects.toThrow()
  })
})
