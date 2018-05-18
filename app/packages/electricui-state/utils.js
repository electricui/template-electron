export function arrayEquals(a, b) {
  if (a.length !== b.length) {
    return false
  }

  for (const key of Object.keys(a)) {
    if (a[key] !== b[key]) {
      return false
    }
  }

  return true
}

export function noop() {} // no we don't want default exports
