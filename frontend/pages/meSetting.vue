<template>
    <div v-if="me">
        <div class="mainBox flex justify-center items-center ">
            <div class="max-w-md w-full bg-white rounded-2xl p-8">
                <button @click="() => router.back()" class="text-lg text-teal-400 hover:text-teal-500 mb-2"><< Back</button>
                <h2 class="font-bold text-2xl mb-6 text-center">Settings</h2>
                <form @submit.prevent="updateMe">
                    <div class="space-y-5">
                        <div class="flex">
                            <div class="w-24 p-4">
                                <img
                                    :src="editData.profile_image_url || ''"
                                    alt=""
                                    class="w-16 h-16 rounded-full object-cover bg-teal-300"
                                />
                            </div>
                            <div class="flex-1">
                                <label for="profie_image_url" class="block text-sm mb-1 ">profile image</label>
                                <input
                                    v-if="isEdit"
                                    type="text"
                                    name="profile_image_url"
                                    id="profile_image_url"
                                    v-model="editData.profile_image_url"
                                    class="px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                                />
                                <p
                                    v-else
                                    class="px-4 py-3 rounded-md w-full text-md font-semibold"
                                >{{editData.profile_image_url}}</p>
                            </div>
                        </div>
                        <div>
                            <label for="name" class="block text-sm mb-1 ">name</label>
                            <input
                                v-if="isEdit"
                                type="text"
                                name="name"
                                id="name"
                                v-model="editData.name"
                                class="px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                            />
                            <p
                                v-else
                                class="px-4 py-3 rounded-md w-full text-md font-semibold"
                            >{{editData.name}}</p>
                        </div>
                        <div>
                            <label for="email" class="block text-sm mb-1 ">email</label>
                            <p
                                class="px-4 py-3 rounded-md w-full text-md font-semibold"
                            >{{me!.email}}</p>
                        </div>
                        <div>
                            <label for="bio" class="block text-sm mb-1 ">bio</label>
                            <textarea
                                v-if="isEdit"
                                name="bio"
                                id="bio"
                                v-model="editData.bio"
                                class="h-32 px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
                            >{{editData.bio}}</textarea>
                            <p
                                v-else
                                class="h-32 px-4 py-3 rounded-md w-full text-md font-semibold break-words"
                            >{{editData.bio}}</p>
                        </div>
                        <div
                            v-if="!isEdit"
                            class="flex gap-2"
                        >
                            <button
                                type="button"
                                class="px-4 py-2 mt-2 w-full text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition"
                                @click="isEdit=!isEdit"
                            >Edit</button>
                            <button
                                type="button"
                                class="px-4 py-2 mt-2 w-full text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition"
                                @click="logout"
                            >Logout</button>
                            <button
                                type="button"
                                class="px-4 py-2 mt-2 w-full text-center rounded-md bg-red-500 shadow-md text-white hover:bg-red-600 hover:shadow-lg font-semibold transition"
                                @click="isEdit=!isEdit"
                            >Delete</button>
                        </div>
                        <div
                            v-else
                            class="flex gap-2"
                        >
                            <button
                                type="submit"
                                class="px-4 py-2 mt-2 w-full text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition"
                            >Update</button>
                            <button
                                type="button"
                                class="px-4 py-2 mt-2 w-full text-center rounded-md bg-gray-400 shadow-md text-white hover:bg-gray-500 hover:shadow-lg font-semibold transition"
                                @click="handleCancel"
                            >Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LOGOUT } from '~/graphql/mutations/auth'
import { UPDATA_ME } from '~/graphql/mutations/me'
import { type LogoutResponse, type updataMeResponse,  type UserEditData } from '~/graphql/types/response'

const { gqlRequest } = useGqlClient()
const router = useRouter()
const { me, setMe } = useMe()
const isEdit = ref<boolean>(false)
const editData = reactive<UserEditData>({
    name: me.value?.name || '',
    bio: me.value?.bio || '',
    profile_image_url: me.value?.profile_image_url || '',
})


console.log(editData)
console.log(me.value!.bio)

const handleCancel = () => {
    isEdit.value = false
   
    editData.name = me.value!.name
    editData.bio = me.value!.bio
    editData.profile_image_url = me.value!.profile_image_url
}

const updateMe = async () => {
    try {
        const variables = {
            input: editData
        }

        const updateMeResponse = await gqlRequest<updataMeResponse>(UPDATA_ME, variables)

        if (updateMeResponse.updateMe.success) {
            setMe(updateMeResponse.updateMe.user)
            isEdit.value = false
        }
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

const logout = async () => {
    try {
        const logoutResponse = await gqlRequest<LogoutResponse>(LOGOUT)
        
        if (logoutResponse.logout.success) {
            navigateTo('/login?from=logout')
        }
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}
</script>