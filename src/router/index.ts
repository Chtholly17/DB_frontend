import { createRouter, createWebHistory , RouteRecordRaw} from 'vue-router'

const routes :Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect:'/hello',
    },
    {
        path: '/hello',
        name: 'hello',
        component: () => import('../views/hello.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router