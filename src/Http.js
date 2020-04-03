import Axios from "axios"
import {Ls} from "@/utils/ls"
import { Message } from "element-ui"
const Http = Axios.create()
Http.defaults.baseURL = "http://timemeetyou.com:8889/api/private/v1"
Http.defaults.timeout = 5000

Http.interceptors.request.use(config => {
    let {url,headers} = config
    if(url == '/login') return config
    let token = window.sessionStorage.getItem("token")
    headers.Authorization = token
    return config
},err => {

})

Http.interceptors.response.use(res=>{
    let {msg,status} = res.data.meta
    if(status != 200) {
        if(msg == "无效token") {
            Message.error("token失效，需重新登陆")
            Ls.remove("token")
            return
        } else {
            Message.error(msg)
            throw new Error(msg)
        }
    } else {
        return res.data.data
    }
})

export {Http}