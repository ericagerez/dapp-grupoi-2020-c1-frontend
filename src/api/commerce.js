import {API_URL, public_api} from './base'

const COMMERCE_URL = `${API_URL}commerce/`
export function registerCommerce(email, password, name, address, max_distance, category, paymentMethods) {
  const payload = {
    email,
    password,
    name,
    address,
    max_distance,
    category,
    payment_methods: paymentMethods
  }
  return new Promise((resolve, reject)=>{
    public_api.post(COMMERCE_URL, payload).then(response=>{
      resolve(response.data)
    }).catch(error=>{
      reject(error)
    })
  })
}