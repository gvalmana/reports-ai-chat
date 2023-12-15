export function b64DecodeUnicode(str) {
  return decodeURIComponent(
    Array.prototype.map
      .call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
}

export function parseJwt(token) {
  return JSON.parse(b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')))
}

export function createTokenBasic(token) {
  const tokenDecode = parseJwt(token)
  return btoa(`${tokenDecode?.email}:${tokenDecode?.api_key}`)
}
