export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} is a required field`)
    this.name = 'MissingParamError'
  }
}
