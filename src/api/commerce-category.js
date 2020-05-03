import {API_URL, public_api} from './base'

const COMMERCE_CATEGORY_URL = `${API_URL}commerce-category/`

export function getAll(){
  return new Promise((resolve, reject) => {
    public_api.get(COMMERCE_CATEGORY_URL).then(response=>{
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {getAll}