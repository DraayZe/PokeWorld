import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component : () => import('@/View/HomeView.vue')
        },
        {
            path: '/pokedex',
            component : () => import('@/View/PokedexView.vue'),
            name: 'pokedex',
        },
        {
            path : '/favoris',
            component : () => import('@/View/FavorisView.vue'),
            name: 'favoris',
        },
        {
            path : '/contact',
            component : () => import('@/View/ContactView.vue'),
            name: 'contact',
        }



    ]
})

export default router