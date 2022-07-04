import * as yup from 'yup'

export type WhatsappValidatorType = {
  perform: (whatsappNumber: string) => boolean
}

export function WhatsAppValidator ():WhatsappValidatorType {
  function perform (whatsappNumber: string) {
    const whatsappSchema = yup.string().required().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Must be at least 10 digits').max(11, 'Must be at most 11 digits')
    return whatsappSchema.isValidSync(whatsappNumber)
  }
  return {
    perform
  }
}
