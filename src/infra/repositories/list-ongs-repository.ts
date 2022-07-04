import { db } from '../helpers/pg-promise-helper'

export function ListOngsRepository () {
  async function perform () {
    return db.many('SELECT * FROM ongs')
  }
  return {
    perform
  }
}
