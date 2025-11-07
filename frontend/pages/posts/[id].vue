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
                            <div v-if='me && me.id === post.user.id' class="flex gap-1">
                                <button  @click='showEditModal=true' class="w-14 bg-teal-300 hover:bg-teal-400 p-1 rounded-md shadow-lg font-semibold">Edit</button>
                                <button v-if='me && me.id === post.user.id' @click='showCheckModal=true' class="w-14 bg-red-300 hover:bg-red-400 p-1 rounded-md shadow-lg font-semibold">delete</button>
                                <CheckModal
                                    v-if="showCheckModal"
                                    @check='deletePost'
                                    @cancel="showCheckModal=false"
                                />
                            </div>
                            <EditPost
                                v-if="showEditModal"
                                v-model="post"
                                @close="showEditModal=false"
                                @submit="updatePost"
                            />
                            <div
                                class="absolute bottom-0 right-8 flex justify-center items-center gap-2 p-1"
                            >
                                <LikedButton
                                    :isLiked
                                    @toggleLike="toggleLike"
                                />
                                <p
                                    @click="showUserModal=true"
                                    class="hover:text-gray-400"
                                >{{ post.likedByUsers.length ?? 0}}</p>
                            </div>
                            <UserShowModal
                                v-if="showUserModal"
                                @close="showUserModal=false"
                                :userSummaries="post.likedByUsers"
                            />
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
import { DELETE_POST, UPDATE_POST } from '~/graphql/mutations/post'
import { TOGGLE_LIKE } from '~/graphql/mutations/toggleLike'
import { POST } from '~/graphql/queries/post'
import { type PostResponse, type PostDetail, type UpdatePostResponse, type ToggleLikeResponse, type UserSummary, type DeletePostResponse } from '~/graphql/types/response'

const { me } = useMe()
const route = useRoute()
const router = useRouter()
const { gqlRequest } = useGqlClient()
const post_id = route.params.id
const showEditModal =ref<boolean>(false)
const showUserModal = ref<boolean>(false)
const showCheckModal = ref<boolean>(false)

const { data: post } = await useAsyncData<PostDetail>('post', async () => {
    const variables = { post_id: post_id}
    const postResponse = await gqlRequest<PostResponse>(POST, variables)
    
    return postResponse.post
})

const isLiked = ref<boolean>(
    post.value?.likedByUsers.some(user => user.id === me.value!.id) ?? false
)

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
        showEditModal.value=false
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

const toggleLike = async () => {
        if (!post.value) return

        const variables = { post_id }
        await gqlRequest<ToggleLikeResponse>(TOGGLE_LIKE, variables)

        isLiked.value = !isLiked.value

        if (isLiked.value) {
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

const deletePost = async () => {
    try {
        const variables = {
            post_id: post_id
        }
        await gqlRequest<DeletePostResponse>(DELETE_POST, variables)

        goBack()
    } catch(e) {
        console.error(`Error: ${e}`)
    }
}

const goBack = () => {
    router.back()
}
</script>

