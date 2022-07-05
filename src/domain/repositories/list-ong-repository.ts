import { OngModel } from '../models/ong'

export type ListOngsRepositoryType = {
  perform: () => Promise<OngModel[]>
}
