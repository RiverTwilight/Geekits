import axios from 'axios'
export default axios.create({
    baseURL: 'https://api.ygktool.cn',
    timeout: 10000
})
