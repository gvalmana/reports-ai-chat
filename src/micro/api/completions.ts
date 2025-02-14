import request from 'app_alegra_commons/request'

export const completions = async messages => {
  return request.post('http://localhost:3001/completions', { messages })
}
