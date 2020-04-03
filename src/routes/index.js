import Vue from "vue"
import VueRouter from "vue-router"
import {routes} from "./routes"
Vue.use(VueRouter)





const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach((to,from,next)=>{
   
    let {meta:{auth},name} = to
    let token = window.sessionStorage.getItem("token")
    if(auth) {
        if(!token) return next({name: "Login"})
    } else {
        if(token && name == "Login") return next({name: "Home"})
    }
    next()
})

export {router}