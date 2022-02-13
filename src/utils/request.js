import axios from 'axios'

const baseUrl = 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd'
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }, {
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      resolve(res.data)
    }, err => {
      reject(err)
    })
  })
}
