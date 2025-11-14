import type { MeResponse } from "~/graphql/types/response"

export const useMe = () => {
    const me = useCookie<MeResponse['me'] | null>('me', { 
        sameSite: 'lax',
        maxAge: 60 * 60 * 24
    })

    const setMe = (user: MeResponse['me']) => {
        me.value = user
    }

    const deleteMe = () => {
        me.value = null
    }

    return {me, setMe, deleteMe}
}