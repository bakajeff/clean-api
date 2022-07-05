import type { CreateOngRepositoryType } from '../repositories/create-ong-repository'
import type { OngModel, OngType } from '../models/ong'

export type CreateOngUseCaseType = {
  perform: (ong: OngType) => Promise<OngModel | void>
}

export function CreateOngUseCase (createOngRepository: CreateOngRepositoryType): CreateOngUseCaseType {
  async function perform (ong: OngType) {
    return await createOngRepository.perform(ong)
  }

  return {
    perform
  }
}
