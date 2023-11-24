import axios from "axios";
import { useSelector } from "react-redux";


export const authInstances = axios.create({
    baseURL: '`http://localhost:8080/api/v1/users/',
})

// authInstances.interceptors.request.use((config) => {
//     const tokn = localStorage.getItem()
//    console.log('config',config)
//    config.params = config.params || {}
//    config.params['auth'] = tokn
// })