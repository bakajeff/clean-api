import request from 'supertest'
import crypto from 'crypto'
import { db } from '../../infra/helpers/pg-promise-helper'
import { app } from '../config/app'
import { OngModel } from '../../domain/models/ong'

function generateRandomText () {
  return crypto.randomBytes(20).toString('hex')
}

describe('CreateIncidentRouter', () => {
  let ong: OngModel

  beforeEach(async () => {
    ong = await db.one('INSERT INTO ongs (id, name, email, whatsapp, city, uf) VALUES ($1, $2, $3, $4, $5, $6) returning *', [
      generateRandomText(),
      generateRandomText(),
      generateRandomText(),
      generateRandomText(),
      generateRandomText(),
      'uf'
    ])
  })

  afterEach(async () => {
    await db.none('DELETE FROM incidents')
    await db.none('DELETE FROM ongs')
  })

  it('returns 200 on success', async () => {
    const response = await request(app).post('/api/incidents').send({
      title: generateRandomText(),
      description: generateRandomText(),
      value: Math.random() * 2.5,
      ongId: ong.id
    })

    expect(response).toBeTruthy()
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('title')
    expect(response.body).toHaveProperty('description')
    expect(response.body).toHaveProperty('value')
    expect(response.body).toHaveProperty('ongId')
  })
})
