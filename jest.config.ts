import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**'
  ],
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}

export default config
