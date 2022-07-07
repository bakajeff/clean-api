import { db } from '../helpers/pg-promise-helper'

export function LogRepository () {
  async function perform (stack: string) {
    const errorOccurredTime = new Date().toISOString()
    return await db.one('INSERT INTO logs (stack, date) VALUES ($1, $2) returning *', [stack, errorOccurredTime])
  }
  return {
    perform
  }
}
