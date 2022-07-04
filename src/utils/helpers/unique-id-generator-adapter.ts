import * as uuid from 'uuid'

export type UniqueIdGeneratorType = {
  perform: () => string
}

export function UniqueIdGenerator ():UniqueIdGeneratorType {
  function perform () {
    return uuid.v4()
  }
  return {
    perform
  }
}
