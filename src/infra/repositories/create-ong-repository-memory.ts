import { OngModel, OngType } from '../../domain/models/ong'
import { CreateOngRepositoryType } from '../../domain/repositories/create-ong-repository'
import type { UniqueIdGeneratorType } from '../../utils/helpers/unique-id-generator-adapter'

export function CreateOngRepositoryMemory (uniqueIdGenerator: UniqueIdGeneratorType): CreateOngRepositoryType {
  async function perform (ong:OngType): Promise<OngModel> {
    return {
      id: uniqueIdGenerator.perform(),
      ...ong
    }
  }
  return {
    perform
  }
}
