import { IncidentModel, IncidentType } from '../../domain/models/incident'
import { UniqueIdGeneratorType } from '../../utils/helpers/unique-id-generator-adapter'
import { db } from '../helpers/pg-promise-helper'
import IncidentAdapter from '../../domain/adapters/incident-adapter'

export function CreateIncidentRepository (uniqueIdGenerator: UniqueIdGeneratorType) {
  async function perform (incident: IncidentType): Promise<IncidentModel> {
    const id = uniqueIdGenerator.perform()
    const newIncident = await db.one('INSERT INTO incidents (id, title, description, value, ong_id) VALUES ($1, $2, $3, $4, $5) returning id, title, description, CAST(value AS DECIMAL), ong_id', [id, incident.title, incident.description, incident.value, incident.ongId])
    return IncidentAdapter.perform(newIncident.id, newIncident.title, newIncident.description, newIncident.value, newIncident.ong_id)
  }
  return {
    perform
  }
}
