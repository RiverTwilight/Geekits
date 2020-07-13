import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.ygktool.cn',
    //baseURL: 'http://localhost:444',
    timeout: 10000
})
