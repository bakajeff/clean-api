import * as uuid from 'uuid'
import { UniqueIdGenerator } from './unique-id-generator-adapter'

jest.mock('uuid')

describe('UniqueIdGenerator', () => {
  it('calls uuid v4 once', () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const uuidSpy = jest.spyOn(uuid, 'v4')

    uniqueIdGenerator.perform()

    expect(uuidSpy).toHaveBeenCalledTimes(1)
  })
  it('returns a valid uuid', () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    jest.spyOn(uuid, 'v4').mockReturnValueOnce('valid uuid')

    const uniqueId = uniqueIdGenerator.perform()

    expect(uniqueId).toBe('valid uuid')
  })
})
