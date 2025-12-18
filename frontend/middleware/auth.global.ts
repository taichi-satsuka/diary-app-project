export default defineNuxtRouteMiddleware((to, from) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated() && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }
})