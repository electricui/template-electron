import accessState from './accessState'

function checkOperator(a, operator, b) {
  switch (operator) {
    case '!=':
      if (a !== b) {
        return true
      }
      break
    case '==':
      if (a === b) {
        return true
      }
      break
    case '<':
      if (a < b) {
        return true
      }
      break
    case '<=':
      if (a <= b) {
        return true
      }
      break
    case '>=':
      if (a >= b) {
        return true
      }
      break
    case '>':
      if (a > b) {
        return true
      }
      break
    case 'vmodr':
      if (a % b === 0) {
        return true
      }
      break
    case 'rmodv':
      if (b % a === 0) {
        return true
      }
      break
    default:
      return false
  }

  return false
}

function checkTrigger(state, check, hardware = false) {
  if (check.length === 3) {
    const variableValue = accessState(state, check[0], hardware)
    const operator = check[1]
    const value = check[2]
    if (checkOperator(variableValue, operator, value)) {
      return true
    }
  } else if (check.length === 2) {
    if (check[0] === 'all') {
      let successes = 0
      for (const subCheck of check[1]) {
        if (checkTrigger(state, subCheck, hardware)) {
          successes += 1
        }
      }

      if (successes === check[1].length) {
        return true
      }
    } else if (check[0] === 'any') {
      for (const subCheck of check[1]) {
        if (checkTrigger(state, subCheck, hardware)) {
          return true
        }
      }
    } else if (check[1] === 'exists') {
      const variableValue = accessState(state, check[0], hardware)
      return variableValue !== null && variableValue !== undefined
    }
  } else if (check.length === 1) {
    if (check[0] === 'always') {
      return true
    }
  }

  return undefined
}

export default {
  checkOperator,
  checkTrigger
}
