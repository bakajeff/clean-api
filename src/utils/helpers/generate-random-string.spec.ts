import { GenerateRandomString } from './generate-random-string'

describe('GenerateRandomString', () => {
  it('returns a random string', () => {
    const sut = GenerateRandomString()

    expect(sut).toBeTruthy()
  })
})
