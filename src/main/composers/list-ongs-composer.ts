import { ListOngsUseCase } from '../../domain/usecases/list-ongs-usecase'
import { ListOngsRepository } from '../../infra/repositories/list-ongs-repository'
import { ListOngsRouter } from '../../presentation/routers/list-ongs-router'

export function ListOngsComposer () {
  function perform () {
    const listOngsRepository = ListOngsRepository()
    const listOngsUseCase = ListOngsUseCase(listOngsRepository)
    return ListOngsRouter(listOngsUseCase)
  }
  return {
    perform
  }
}
