import { db } from '../helpers/pg-promise-helper'

export function LogRepository () {
  async function perform (stack: string, date: string) {
    return await db.one('INSERT INTO logs (stack, date) VALUES ($1, $2) returning *', [stack, date])
  }
  return {
    perform
  }
}
