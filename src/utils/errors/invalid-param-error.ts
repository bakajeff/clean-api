export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`${paramName} must be a valid ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
