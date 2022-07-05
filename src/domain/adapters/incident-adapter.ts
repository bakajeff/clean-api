import { IncidentModel } from '../models/incident'

export default {
  perform: (id: string, title: string, description: string, value: string, ongId: string): IncidentModel => {
    const parsedValue = parseFloat(value)

    return {
      id,
      title,
      description,
      value: parsedValue,
      ongId
    }
  }
}
