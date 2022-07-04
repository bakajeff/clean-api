import * as yup from 'yup'

export type EmailValidatorType = {
  perform: (email: string) => boolean
}

export function EmailValidator (): EmailValidatorType {
  function perform (email: string) {
    const emailSchema = yup.string().email().required()
    return emailSchema.isValidSync(email)
  }
  return {
    perform
  }
}
