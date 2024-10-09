import { validateCheckCleared } from "./check"

describe('validateCheckCleared', () => {
  it('should return true when check cleared for \'true\'', () => {
    expect(validateCheckCleared('true')).toBe(true)
  })

  it('should return true when check cleared for null', () => {
    expect(validateCheckCleared(null)).toBe(true)
  })  

  it('should return false when check is not \'true\' or null', () => {
    expect(validateCheckCleared(false)).toBe(false)
    expect(validateCheckCleared('false')).toBe(false)
    expect(validateCheckCleared(123)).toBe(false)
    expect(validateCheckCleared(undefined)).toBe(false)
    expect(validateCheckCleared(new Date())).toBe(false)
    expect(validateCheckCleared({ foo: 'bar'})).toBe(false)

  })  
})