function currying (callback, ...initialParam) {
  return (...param) => {
      return ((params) => {
          return params.length === callback.length ? callback(...params) : currying(callback, ...params)
      })([...initialParam, ...param])
  }
}
