import { IncidentModel, IncidentType } from '../models/incident'

export type CreateIncidentUseCaseType = {
  perform: (incident: IncidentType) => Promise<IncidentModel[]>
}

export function CreateIncidentUseCase (createIncidentRepository: any) {
  async function perform (incident: IncidentType) {
    return await createIncidentRepository.perform(incident)
  }
  return {
    perform
  }
}
