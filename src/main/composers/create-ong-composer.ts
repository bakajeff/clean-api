import { CreateOngUseCase } from '../../domain/usecases/create-ong-usecase'
// import { CreateOngRepositoryMemory } from '../../infra/repositories/create-ong-repository-memory'
import { CreateOngRepositorySql } from '../../infra/repositories/create-ong-repository-sql'
import { CreateOngRouter } from '../../presentation/routers/create-ong-router'
import { EmailValidator } from '../../utils/helpers/email-validator'
import { UniqueIdGenerator } from '../../utils/helpers/unique-id-generator-adapter'
import { WhatsAppValidator } from '../../utils/helpers/whatsapp-validator'

export function CreateOngComposer () {
  function perform () {
    const uniqueIdGenerator = UniqueIdGenerator()
    const createOngRespository = CreateOngRepositorySql(uniqueIdGenerator)
    const emailValidator = EmailValidator()
    const whatsappValidator = WhatsAppValidator()
    const createOngUseCase = CreateOngUseCase(createOngRespository)

    return CreateOngRouter(emailValidator, whatsappValidator, createOngUseCase)
  }
  return {
    perform
  }
}
