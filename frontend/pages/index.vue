<template>
        <div class="flex justify-center ">
            <aside class="w-1/5 mr-2 flex flex-col">
                <h1 class="text-3xl font-extrabold text-center text-teal-700 mt-4 mb-6 tracking-wide">Home</h1>

                <UserBox :user='{id:me?.id!, name: me?.name!, email:me?.email!, profile_image_url: me?.profile_image_url!}' class="mb-2"/>

                <button
                class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition"
                @click="showModal=true"
                >Create Diary</button>
            </aside>

            <div class="mainBox w-1/3 gap-1 flex overflow-scroll flex-col">
                <div class="flex p-1 border-2 border-teal-300 gap-1 sticky top-0 backdrop-blur-sm z-10 bg-teal-100/80 shadow-md rounded-md">
                    <button class="flex-1 font-bold hover:underline hover:text-gray-700 transition">Timeline</button>
                    <button class="flex-1 font-bold border-l-2 border-teal-400 hover:underline hover:text-gray-700 transition">Like</button>
                </div>
                <PostCard 
                    v-if="posts"
                    v-for="postSummary in posts"
                    :key="postSummary.id"
                    :postSummary
                />
                <Loading v-else class="mainBox flex justify-center items-center"/>
            </div>
        </div>
        <PostModal v-if="showModal" :manipulateType="`Create`" @close="showModal=false"/>
</template>

<script setup lang="ts">
import { type PostsResponse, type MeResponse, type PostSummary } from '~/graphql/types/response';
import { ME } from '~/graphql/queries/user';
import { POSTS } from '~/graphql/queries/post';

const { gqlRequest } = useGqlClient()
const { me, setMe } = useMe()
const showModal = ref<boolean>(false)
const posts = ref<PostSummary[]>()


const fetchMe = async () => {
    try {
        const meResponse = await gqlRequest<MeResponse>(ME)

        if (meResponse?.me) {
            setMe(meResponse.me)
        }

    } catch (e){
        console.error(`Error: ${e}`)
    }
}

const fetchPosts = async () => {
    try {
        const postsResponse = await gqlRequest<PostsResponse>(POSTS)

        posts.value = postsResponse.posts
    } catch (e) {
        console.error(`Error: ${e}`)
    }
}

onMounted(async () => {
    await Promise.all([fetchMe(), fetchPosts()])
})
</script>
