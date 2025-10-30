import type { MeResponse } from "~/graphql/types/response"

export const useMe = () => {
    const me = useState<MeResponse['me'] | null>('me', () => null)

    const setMe = (user: MeResponse['me']) => {
        me.value = user
    }

    const deleteMe = () => {
        me.value = null
    }

    return {me, setMe, deleteMe}
}