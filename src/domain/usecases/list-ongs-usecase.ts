import type { OngModel } from '../models/ong'
import type { ListOngsRepositoryType } from '../repositories/list-ong-repository'

export type ListOngsUseCaseType = {
  perform: () => Promise<OngModel[]>
}

export function ListOngsUseCase (listOngsRepository: ListOngsRepositoryType): ListOngsUseCaseType {
  async function perform () {
    return await listOngsRepository.perform()
  }
  return {
    perform
  }
}
