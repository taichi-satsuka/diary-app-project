<template>
    <div v-if='userData' class="mainBox flex flex-col items-center pt-8">
        <div class="w-full max-w-lg h-1/3 bg-white rounded-2xl shadow-2xl px-8 pt-4 mb-4">
            <button @click="goBack" class="text-lg text-teal-400 hover:text-teal-500 mb-2"><< Back</button>
            <!-- ヘッダー -->
            <div class="flex items-center gap-4 mb-3 relative">
                <img
                    :src="userData!.profile_image_url || '/default-avatar.png'"
                    alt="User Avatar"
                    class="w-16 h-16 rounded-full object-cover bg-teal-300"
                />
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">{{ userData!.name }}</h1>
                    <p class="text-gray-500">{{ userData!.email }}</p>
                    <p class="text-gray-400 text-sm">Joined: {{ userData!.created_at }}</p>
                </div>

                <button v-if="Number(id) == me!.id" type="button" class="absolute top-0 right-0 text-md text-white bg-teal-400 hover:bg-teal-500 p-1 rounded-md shadow-lg w-20">edit</button>
            </div>

            <!-- Bio -->
            <div class="mb-4 h-1/2 flex flex-col">
                <h2 class="text-lg font-semibold text-gray-700">Bio</h2>
                <p class="text-gray-600 break-words overflow-y-auto">{{ userData!.bio }}</p>
            </div>
        </div>

        <div class="flex-1 w-full max-w-lg gap-1 flex overflow-scroll flex-col">
            <div class="flex p-1 border-2 border-teal-300 gap-1 sticky top-0 backdrop-blur-sm z-10 bg-teal-100/80 shadow-md rounded-md">
                <button class="flex-1 font-bold hover:underline hover:text-gray-700 transition">User's Diary</button>
                <button class="flex-1 font-bold border-l-2 border-teal-400 hover:underline hover:text-gray-700 transition">Like</button>
            </div>
            <PostCard 
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
            />
        </div>
    </div>
    <div v-else role="status" class="h-100 flex justify-center items-center">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
</div>

</template>

<script setup lang="ts">
import type { Post } from '~/types/type'
import { USERDETAIL } from '~/graphql/queries/user'
import type { UserResponse } from '~/graphql/types/response'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const { me } = useMe()
const { gqlRequest } = useGqlClient()
const variables = {id: id}
const userData = ref<UserResponse['user']>()

const fetchUserData = async () => {
    try {
        const userDetailResponse = await gqlRequest<UserResponse>(USERDETAIL, variables)

        userData.value = userDetailResponse.user
    } catch (e) {
        console.error("error: ", e)
    }
}

const goBack = () => {
    router.back()
}

onMounted(async () => {
    await fetchUserData()
})


const posts: Post[] = [
     {
        id:1,
        user_id:1,
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
]
</script>