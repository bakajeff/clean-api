import { db } from '../helpers/pg-promise-helper'
import type { OngType } from '../../domain/models/ong'
import type { UniqueIdGeneratorType } from '../../utils/helpers/unique-id-generator-adapter'

export function CreateOngRepositorySql (uniqueIdGenerator: UniqueIdGeneratorType) {
  async function perform (ong: OngType) {
    const id = uniqueIdGenerator.perform()
    await db.none('INSERT INTO ongs (id, name, email, whatsapp, city, uf) values ($1, $2, $3, $4, $5, $6)', [id, ong.name, ong.email, ong.whatsapp, ong.city, ong.uf])
    const createdOng = await db.oneOrNone('SELECT * FROM ongs where id = $1', [id])

    return createdOng
  }
  return {
    perform
  }
}
