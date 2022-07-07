import { db } from '../helpers/pg-promise-helper'

function LogRepository () {
  async function perform (stack: string, date: string) {
    return await db.one('INSERT INTO logs (stack, date) VALUES ($1, $2) returning *', [stack, date])
  }
  return {
    perform
  }
}

describe('LogRepository', () => {
  beforeEach(async () => {
    await db.none('DELETE FROM logs')
  })

  afterEach(async () => {
    await db.none('DELETE FROM logs')
  })

  it('retuns a log on success', async () => {
    const logRepository = LogRepository()

    const log = await logRepository.perform('stack', new Date().toISOString())

    expect(log).toBeTruthy()
  })
})
