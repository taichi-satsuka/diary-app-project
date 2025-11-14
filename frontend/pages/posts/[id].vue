<template>
    <div>
        <div v-if='post' class="mainBox flex flex-col items-center pt-8 gap-2">
            <div class="w-full h-1/2 max-w-lg bg-white rounded-2xl shadow-2xl px-10 pt-5 pb-2">
                <button @click="goBack" class="text-lg text-teal-400 hover:text-teal-500 mb-1"><< Back</button>
                <div class="h-5/6 flex flex-col">
                    <!-- ヘッダー: 投稿タイトル -->
                    <div class="h-20 flex justify-between items-start mb-6">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-800">{{ post.title }}</h1>
                            <NuxtLink :to="`/users/${post.user.id}`" class="text-gray-500 mt-1 hover:text-teal-400">by {{ post.user.name }} ({{ post.user.email }})</NuxtLink>
                            <p v-if="post.created_at === post.updated_at" class="text-gray-400 text-sm mt-1">Posted: {{ post.created_at }}</p>
                            <p v-else class="text-gray-400 text-sm mt-1">Updated: {{ post.updated_at }}</p>
                        </div>
                        <div class="h-full flex flex-col justify-between">
                            <div v-if='me && me.id === post.user.id' class="flex gap-1">
                                <button  @click='showEditModal=true' class="w-14 bg-teal-300 text-white hover:bg-teal-400 p-1 rounded-md shadow-lg font-semibold">Edit</button>
                                <button @click='showCheckModal=true' class="w-14 bg-red-400 text-white hover:bg-red-500 p-1 rounded-md shadow-lg font-semibold">delete</button>
                            </div>
                            <div
                                v-else
                                class="h-24"></div>
                            <div
                                class="flex justify-center items-center gap-2 p-1"
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
                        </div>
                        <UserShowModal
                            v-if="showUserModal"
                            @close="showUserModal=false"
                            :userSummaries="post.likedByUsers"
                        />
                    </div>

                    <!-- 投稿内容 -->
                    <div class="2/3 overflow-y-auto">
                        <p class="text-gray-700 whitespace-pre-wrap break-words">{{ post.content }}</p>
                    </div>
                </div>
            </div>
            
            <div class="w-full max-w-lg flex-1 flex overflow-y-auto flex-col">
                <div class="flex justify-between px-4 py-2 border-2 border-teal-300 gap-1 sticky top-0 backdrop-blur-sm z-10 bg-teal-100/80 shadow-md rounded-2xl">
                    <h2 class="font-bold">Comments</h2>
                    <button
                        type="button"
                        class="text-md bg-teal-300 rounded-2xl shadow-md px-4 hover:bg-teal-400 transition font-bold"
                        @click="showCreateCommentModal=true"
                    >+</button>
                </div>
                <CommentCard
                    v-for="comment in post.comments"
                    :key="comment.id"
                    :comment
                    @delete="deleteComment"
                />
            </div>
            <EditPost
                v-if="showEditModal"
                :post
                @close="showEditModal=false"
                @submit="updatePost"
            />
        </div>
        <Loading v-else class="mainBox flex justify-center items-center"/>
        <CheckModal
            v-if="showCheckModal"
            @check='deletePost'
            @cancel="showCheckModal=false"
        />
        <CommentModal
            v-if="showCreateCommentModal"
            @close="showCreateCommentModal=false"
            @submit="createComment"
        />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { CREATE_COMMENT, DELETE_COMMENT } from '~/graphql/mutations/comment'
import { DELETE_POST, UPDATE_POST } from '~/graphql/mutations/post'
import { TOGGLE_LIKE } from '~/graphql/mutations/toggleLike'
import { POST } from '~/graphql/queries/post'
import { type PostResponse, type PostDetail, type UpdatePostResponse, type ToggleLikeResponse, type DeletePostResponse, type CreateCommentResponse, type DeleteCommentResponse } from '~/graphql/types/response'

const { me } = useMe()
const route = useRoute()
const router = useRouter()
const { gqlRequest } = useGqlClient()
const post_id = route.params.id
const showEditModal =ref<boolean>(false)
const showUserModal = ref<boolean>(false)
const showCheckModal = ref<boolean>(false)
const showCreateCommentModal = ref<boolean>(false)

const { data: post } = await useAsyncData<PostDetail>(`post-${post_id}-${Date.now()}`, async () => {
    const variables = { post_id: post_id}
    const postResponse = await gqlRequest<PostResponse>(POST, variables)
    
    return postResponse.post
}, {
    server: true,
    lazy: false,
})

const isLiked = ref<boolean>(
    post.value?.likedByUsers.some(user => user.id === me.value!.id) ?? false
)

const updatePost = async (newData: PostDetail) => {
    try {
        const variables = {
            input: {
                id: post_id,
                title: newData.title,
                content: newData.content,
                visibility: newData.visibility
            }
        }
        const updatePostResponse = await gqlRequest<UpdatePostResponse>(UPDATE_POST, variables)

        post.value = {...updatePostResponse.updatePost.post}
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

const createComment = async (commentInput: string) => {
    try {
        const variables = {
            input: {
                post_id: post_id,
                content: commentInput
            }
        }
        
        const createCommentResponse = await gqlRequest<CreateCommentResponse>(CREATE_COMMENT, variables)

        if (createCommentResponse.createComment.success) {
            post.value?.comments.unshift(createCommentResponse.createComment.comment)
        }
        showCreateCommentModal.value = false
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

const deleteComment = async (delete_comment_id: number) => {
    try {
        const variables = {
            comment_id: delete_comment_id
        }
        
        const deleteCommentResponse = await gqlRequest<DeleteCommentResponse>(DELETE_COMMENT, variables)

        if (deleteCommentResponse.deleteComment.success) {
            post.value!.comments = (post.value?.comments ?? []).filter(comment => comment.id !== delete_comment_id)
        }
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}


const goBack = () => {
    router.back()
}
</script>

