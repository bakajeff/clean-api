import { CreateIncidentUseCase } from '../../domain/usecases/create-incident-usecase'
import { CreateIncidentRepository } from '../../infra/repositories/create-incident-repository-sql'
import { GetOngByIdRepository } from '../../infra/repositories/get-ong-by-id-repository-sql'
import { LogRepository } from '../../infra/repositories/log-repository-sql'
import { RouterType } from '../../presentation/helpers/router'
import { CreateIncidentRouter } from '../../presentation/routers/create-incident-router'
import { UniqueIdGenerator } from '../../utils/helpers/unique-id-generator-adapter'
import { LogDecorator } from '../decorators/log-decorator'

export default {
  perform: (): RouterType => {
    const uniqueIdGenerator = UniqueIdGenerator()
    const getOngByIdRepository = GetOngByIdRepository()
    const createIncidentRepository = CreateIncidentRepository(uniqueIdGenerator)
    const createIncidentUseCase = CreateIncidentUseCase(createIncidentRepository, getOngByIdRepository)
    const logRepository = LogRepository()

    return LogDecorator(CreateIncidentRouter(createIncidentUseCase), logRepository)
  }
}
