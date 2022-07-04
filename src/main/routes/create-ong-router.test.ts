import request from 'supertest'
import { db } from '../../infra/helpers/pg-promise-helper'
import { app } from '../config/app'

describe('CreateOngRouter', () => {
  afterEach(async () => {
    await db.none('DELETE from ongs')
  })

  it('returns an account on success', async () => {
    const response = await request(app).post('/api/ong/new').send({
      name: 'any ong',
      email: 'any@email.com',
      whatsapp: '98900000000',
      city: 'any city',
      uf: 'uf'
    })
    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('whatsapp')
    expect(response.body).toHaveProperty('city')
    expect(response.body).toHaveProperty('uf')
  })
})
