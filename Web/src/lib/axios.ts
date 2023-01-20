import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.141.214:3333'
})