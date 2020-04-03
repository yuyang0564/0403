
const routes = [
    {
        name: "Home",
        path: "/",
        redirect: {name: "Welcome"},
        meta: {
            auth: true
        },
        component: _ => import(/* webpackChunkName: "Home" */"@/views/Home"),
        children: [
            {
                name: "Welcome",
                path: '',
                meta: {
                    auth: true
                },
                component: _ => import(/* webpackChunkName: "Home" */ "@/components/layout/Welcome")
            },
            {
                name: "Users",
                path: 'users',
                meta: {
                    auth: true
                },
                component: _ => import(/* webpackChunkName: "User" */"@/views/user/List")
            },
            {
                name: "Rights",
                path: "/rights",
                meta: {auth: true},
                component: _ => import(/* webpackChunkName: "Power" */ "@/views/power/Rights")
            },
            {
                name: "Roles",
                path: "/roles",
                meta: {auth: true},
                component: _ => import(/* webpackChunkName: "Power" */ "@/views/power/Roles")
            }
        ]
    },
    {
        name: "Login",
        path: "/login",
        meta: {
            auth: false
        },
        component: () => import(/* webpackChunkName: "User" */"@/views/user/Login")
    }

    
]

export {routes}    