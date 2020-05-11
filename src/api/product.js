import {API_URL, public_api} from './base'

const PAYMENT_METHOD_URL = `${API_URL}product/`

export function getAll(){
  return new Promise((resolve, reject) => {
    public_api.get(PAYMENT_METHOD_URL).then(response=>{
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {getAll}