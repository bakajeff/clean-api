import request from 'supertest'
import { app } from '../config/app'

describe('ListOngsRouter', () => {
  it('returns 200 on success', async () => {
    const response = await request(app).get('/api/ong')

    expect(response.statusCode).toBe(200)
  })
})
