import { OngModel } from '../../domain/models/ong'
import { db } from '../helpers/pg-promise-helper'

export function GetOngByIdRepository () {
  async function perform (ongId: string): Promise<OngModel | null> {
    return await db.oneOrNone<OngModel | null>('SELECT * FROM ongs WHERE id = $1', ongId)
  }
  return {
    perform
  }
}
