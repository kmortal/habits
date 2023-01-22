import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://192.168.46.214:3333'
})