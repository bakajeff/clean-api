import type { OngModel } from '../models/ong'

export type ListOngsRepositoryType = {
  perform: () => Promise<OngModel[]>
}

export type ListOngsUseCaseType = {
  perform: () => Promise<OngModel[]>
}

export function ListOngsUseCase (listOngsRepository: ListOngsRepositoryType) {
  async function perform () {
    return await listOngsRepository.perform()
  }
  return {
    perform
  }
}
