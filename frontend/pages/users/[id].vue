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

                    <div class="absolute bottom-0 right-0 flex gap-2">
                        <div class="flex flex-col items-center hover:bg-gray-200 transition"
                        @click="isFollowedModal=true">
                            <span class="font-bold">{{ userData!.followers?.length || 0 }}</span>
                            <span class="text-gray-500 text-sm">Followers</span>
                        </div>
                        <div class="flex flex-col items-center hover:bg-gray-200 transition"
                        @click="isFollowingModal=true">
                            <span class="font-bold">{{ userData!.followings?.length || 0 }}</span>
                            <span class="text-gray-500 text-sm">Following</span>
                        </div>
                    </div>

                <!-- 編集ボタン（ログイン中ユーザーのみ表示） -->
                <button v-if="Number(id) == me!.id" type="button" class="absolute top-0 right-0 text-sm text-white bg-teal-400 hover:bg-teal-500 p-1 rounded-md shadow-lg w-20">edit</button>

                <!-- ✅ フォロー／アンフォローボタン（本人以外に表示） -->
                <button
                    v-else
                    @click="toggleFollow"
                    class="absolute top-0 right-0 text-sm text-white p-1 rounded-md shadow-lg w-24 transition"
                    :class="isFollowing ? 'bg-gray-400 hover:bg-gray-500' : 'bg-teal-400 hover:bg-teal-500'"
                >
                    {{ isFollowing ? 'Unfollow' : 'Follow' }}
                </button>
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
    <Loading v-else class="mainBox flex justify-center items-center"/>
    <FollowModal
        v-if="isFollowingModal"
        :userSummaries="userData!.followings!"
        @close="isFollowingModal=false"
    />
    <FollowModal
        v-if="isFollowedModal"
        :userSummaries="userData!.followers!"
        @close="isFollowedModal=false"
    />
</template>

<script setup lang="ts">
import type { Post } from '~/types/type'
import { USERDETAIL } from '~/graphql/queries/user'
import { TOGGLEFOLLOW  } from '~/graphql/mutations/toggleFollow'
import type { ToggleFollowResponse, UserResponse, UserSummary } from '~/graphql/types/response'

const route = useRoute()
const router = useRouter()
const { me } = useMe()
const { gqlRequest } = useGqlClient()

const id = route.params.id
const userData = ref<UserResponse['user']>()
const isFollowing = ref<boolean>(false)
const MyfollowingUsers = ref<UserSummary[]>(
    me.value?.followings ?? []
);
const isFollowingModal = ref<boolean>(false)
const isFollowedModal = ref<boolean>(false)

const fetchUserData = async () => {
    try {
        const variables = {id: id}
        const userDetailResponse = await gqlRequest<UserResponse>(USERDETAIL, variables)

        userData.value = userDetailResponse.user

        isFollowing.value = MyfollowingUsers.value.some(user => Number(user.id) === Number(id))
    } catch (e) {
        console.error("error: ", e)
    }
}

const toggleFollow = async () => {
    try {
        const variables = {followed_id: id}
        const toggleFollowResponse = await gqlRequest<ToggleFollowResponse>(TOGGLEFOLLOW, variables)
        
        const userSummary: UserSummary = {
            id: me.value!.id,
            name: me.value!.name,
            email: me.value!.email,
            profile_image_url: me.value!.profile_image_url
        }

        isFollowing.value = !isFollowing.value 

        if (isFollowing.value) {
            if (!userData.value!.followers) userData.value!.followers = []

            userData.value!.followers?.push(userSummary)
        } else {
            userData.value!.followers = userData.value?.followers?.filter(user => user.id !== userSummary.id)
        }
    } catch (e) {
        console.error("error:", e)
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