import { CreateIncidentUseCase } from '../../domain/usecases/create-incident-usecase'
import { CreateIncidentRepository } from '../../infra/repositories/create-incident-repository-sql'
import { CreateIncidentRouter } from '../../presentation/routers/create-incident-router'
import { UniqueIdGenerator } from '../../utils/helpers/unique-id-generator-adapter'

export default {
  perform: () => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const createIncidentRepository = CreateIncidentRepository(uniqueIdGenerator)
    const createIncidentUseCase = CreateIncidentUseCase(createIncidentRepository)

    return CreateIncidentRouter(createIncidentUseCase)
  }
}
