export default function deepEqual(a, b, recursion = 0) {
  if (a === b) {
    return true
  }

  const arrA = Array.isArray(a)
  const arrB = Array.isArray(b)
  let i
  let length
  let key

  if (arrA && arrB) {
    length = a.length
    if (length !== b.length) {
      return false
    }
    // eslint-disable-next-line
    for (i = 0; i < length; i++) {
      if (!deepEqual(a[i], b[i], recursion + 1)) {
        return false
      }
    }
    return true
  }

  if (arrA !== arrB) {
    return false
  }

  if (a instanceof Object && b instanceof Object) {
    const keys = Object.keys(a)
    length = keys.length

    if (length !== Object.keys(b).length) {
      return false
    }

    for (key of keys) {
      if (!deepEqual(a[key], b[key], recursion + 1)) {
        return false
      }
    }

    return true
  }

  return false
}
