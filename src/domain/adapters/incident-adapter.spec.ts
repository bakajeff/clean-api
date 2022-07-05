import sut from './incident-adapter'

describe('IncidentAdapter', () => {
  it('returns a valid incident', () => {
    const incident = sut.perform('valid id', 'valid title', 'valid description', '23234.23', 'valid ong id')

    expect(incident).toHaveProperty('id')
    expect(incident).toHaveProperty('title')
    expect(incident).toHaveProperty('description')
    expect(incident).toHaveProperty('value')
    expect(incident).toHaveProperty('ongId')
  })
})
