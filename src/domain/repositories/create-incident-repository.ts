import { IncidentModel, IncidentType } from '../models/incident'

export type CreateIncidentRepositoryType = {
  perform: (incident: IncidentType) => Promise<IncidentModel>
}
