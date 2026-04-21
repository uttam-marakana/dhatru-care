import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Firebase for tests
vi.mock('../firebase', () => ({
  app: {},
  db: {},
  auth: {},
  analytics: null,
}))

// Suppress React 19 warnings in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      args[0]?.includes?.('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

