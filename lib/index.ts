export function removeEmptyProps<T = any> (body: T, preserveEmpty: boolean = false, isArray: boolean = false): T {
  const clean: any = Array.isArray(body) ? [] : {}

  Object.entries(body).forEach(function ([key, value]) {
    if (typeof value === 'string') {
      const trimed = String(value).trim()
      if (trimed.length > 0) {
        clean[key] = String(trimed)
      } else if (preserveEmpty && !isArray && trimed.length === 0) {
        // allow empty string to remove props when it is object property only
        clean[key] = ''
      }
    } else if (typeof value === 'object' && value !== null) {
      const keys = Object.keys(value)
      if (keys.length > 0) {
        clean[key] = removeEmptyProps(value, preserveEmpty, Array.isArray(value))
      } else if (preserveEmpty && keys.length === 0) {
        // allow empty array or object to remove props
        clean[key] = Array.isArray(value) ? [] : {}
      }
    } else if (typeof value !== 'undefined' && value !== null) {
      clean[key] = value
    }
  })

  return clean
}

export function slugify (str: string, limit: number = 72): string {
  str = str.replace(/^\s+|\s+$/g, '') // trim
  str = str.toLowerCase()

  // remove accents, swap ñ for n, etc
  const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeiiiioooouuuunc------'

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  str = str.replace(/[^a-zA-Z0-9_\u3400-\u9FBF\s-]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes

  // strip if it is too long
  if (str.length > limit) str = str.substr(0, limit)
  if (str.endsWith('-')) str = str.substr(0, str.length - 1)

  return str
}

// perf
// obj - 34,506,144 ops/sec ±1.54%
// arr - 32,347,650 ops/sec ±0.97%
// oth - 165,792,729 ops/sec ±1.97%
export function clone<T = any> (o: T): T {
  if (typeof o === 'object' && o !== null && !Array.isArray(o)) {
    const tmp: any = {}
    Object.keys(o).forEach(function (k) {
      tmp[k] = clone((o as any)[k])
    })
    return tmp
  } else if (typeof o === 'object' && o !== null && Array.isArray(o)) {
    return (o as never as unknown[]).map(clone) as never as T
  } else {
    return o
  }
}
