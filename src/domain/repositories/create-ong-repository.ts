import { OngModel, OngType } from '../models/ong'

export type CreateOngRepositoryType = {
  perform: (ong: OngType) => Promise<OngModel>
}
