import type { OngModel } from '../models/ong'

type ListOngsRepositoryType = {
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
