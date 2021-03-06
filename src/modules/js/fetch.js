import axios from 'axios'

function fetch(url, data) {
  return new Promise((resolve,reject) => {
    let type = !data ? axios.get(url, data) : axios.post(url, data)
    type.then(res => {
      let status = res.data.status
      if(status === 200) {
        resolve(res)
      }
      if(status === 300) {
        location.href = 'login.html'
        resolve(res)
      }
      reject(res)
    }).catch(error => {
      reject(res)
    })
  })
}

export default fetch
