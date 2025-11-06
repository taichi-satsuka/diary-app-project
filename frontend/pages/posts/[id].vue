<template>
    <div>
        <div v-if='post' class="flex flex-col items-center pt-8">
                <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10">
                    <button @click="goBack" class="text-lg text-teal-400 hover:text-teal-500 mb-2"><< Back</button>
                    <div class="flex flex-col">
                        <!-- ヘッダー: 投稿タイトル -->
                        <div class="flex justify-between items-start mb-6 relative">
                            <div>
                                <h1 class="text-3xl font-bold text-gray-800">{{ post.title }}</h1>
                                <NuxtLink :to="`/users/${post.user.id}`" class="text-gray-500 mt-1 hover:text-teal-400">by {{ post.user.name }} ({{ post.user.email }})</NuxtLink>
                                <p v-if="post.created_at === post.updated_at" class="text-gray-400 text-sm mt-1">Posted: {{ post.created_at }}</p>
                                <p v-else class="text-gray-400 text-sm mt-1">Updated: {{ post.updated_at }}</p>
                            </div>
                            <button v-if='me && me.id === post.user.id' @click='showModal=true' class="w-20 bg-teal-300 hover:bg-teal-400 p-1 rounded-md shadow-lg">Edit</button>
                            <EditPost
                                v-if="showModal"
                                v-model="post"
                                @close="showModal=false"
                                @submit="updatePost"
                            />
                            <div
                                v-if="isLiked !== undefined"
                                class="absolute bottom-0 right-8 flex justify-center items-center gap-2 p-1"
                            >
                                <LikedButton
                                    :isLiked
                                    @toggleLike="isLiked=!isLiked"
                                />
                                <p>{{ post.likedByUsers.length}}</p>
                            </div>
                        </div>

                        <!-- 投稿内容 -->
                        <div class="flex-1 overflow-y-auto max-h-[40vh]">
                            <p class="text-gray-700 whitespace-pre-wrap break-words">{{ post.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Loading v-else class="mainBox flex justify-center items-center"/>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { UPDATE_POST } from '~/graphql/mutations/post'
import { TOGGLE_LIKE } from '~/graphql/mutations/toggleLike'
import { POST } from '~/graphql/queries/post'
import { type PostResponse, type PostDetail, type UpdatePostResponse, type ToggleLikeResponse, type UserSummary } from '~/graphql/types/response'

const { me } = useMe()
const route = useRoute()
const router = useRouter()
const { gqlRequest } = useGqlClient()
const post_id = route.params.id
const post = ref<PostDetail>()
const showModal =ref<boolean>(false)
const isLiked = computed<boolean>({
        get: () => post.value?.likedByUsers.some(user => user.id === me.value!.id) ?? false,
        set: async (newVal: boolean) => {
            if (!post.value) return

            const variables = { post_id }
            await gqlRequest<ToggleLikeResponse>(TOGGLE_LIKE, variables)

            if (newVal) {
                post.value.likedByUsers.push({
                    id: me.value!.id,
                    name: me.value!.name,
                    email: me.value!.email,
                    profile_image_url: me.value!.profile_image_url,
                })
            } else {
                post.value.likedByUsers = post.value.likedByUsers.filter(user => user.id !== me.value!.id)
            }
        }
    })


const fetchPost = async () => {
    try {
        const variables = { post_id: post_id}
        const postResponse = await gqlRequest<PostResponse>(POST, variables)

        post.value = postResponse.post
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

const updatePost = async () => {
    try {
        const variables = {
            input: {
                id: post_id,
                title: post.value!.title,
                content: post.value!.content,
                visibility: post.value!.visibility
            }
        }
        const updatePostResponse = await gqlRequest<UpdatePostResponse>(UPDATE_POST, variables)

        post.value = updatePostResponse.updatePost.post
        showModal.value=false
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

const goBack = () => {
    router.back()
}

onMounted(async () => {
    console.log(post_id)
    await fetchPost()

})


</script>

