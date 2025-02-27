import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component : () => import('@/View/AccueilView.vue')
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
            path : '/about',
            component : () => import('@/View/AProposView.vue'),
            name: 'apropos',
        },
        {
            path : '/fiche-pokemon/:pokemon',
            component : () => import('@/View/FichePokemonView.vue'),
            name: 'pokemon',
        }




    ]
})

export default router