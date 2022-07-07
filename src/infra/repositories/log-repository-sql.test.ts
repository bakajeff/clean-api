import { db } from '../helpers/pg-promise-helper'
import { LogRepository } from './log-repository-sql'

describe('LogRepository', () => {
  beforeEach(async () => {
    await db.none('DELETE FROM logs')
  })

  afterEach(async () => {
    await db.none('DELETE FROM logs')
  })

  it('retuns a log on success', async () => {
    const logRepository = LogRepository()

    const log = await logRepository.perform('stack')

    expect(log).toBeTruthy()
  })
})
