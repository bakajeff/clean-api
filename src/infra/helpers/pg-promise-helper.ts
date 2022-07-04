import pgPromise from 'pg-promise'

const pgp = pgPromise({})

const connectionString = 'postgres://postgres:postgres@localhost:5432/bethehero'

export const db = pgp({
  connectionString,
  allowExitOnIdle: true
})
