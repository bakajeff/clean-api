import { InvalidParamError } from '../../utils/errors/invalid-param-error'
import { IncidentModel, IncidentType } from '../models/incident'
import { OngModel } from '../models/ong'
import { CreateIncidentRepositoryType } from '../repositories/create-incident-repository'

export type CreateIncidentUseCaseType = {
  perform: (incident: IncidentType) => Promise<IncidentModel>
}

type GetOngByIdRepositortyType = {
  perform: (ongId: string) => Promise<OngModel | null>
}

export function CreateIncidentUseCase (createIncidentRepository: CreateIncidentRepositoryType, getOngByIdRepository: GetOngByIdRepositortyType) {
  async function perform (incident: IncidentType) {
    const ong = await getOngByIdRepository.perform(incident.ongId)

    if (!ong) throw new InvalidParamError('ongId')

    return await createIncidentRepository.perform(incident)
  }
  return {
    perform
  }
}
