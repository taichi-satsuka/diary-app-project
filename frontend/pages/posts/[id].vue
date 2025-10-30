<template>
  <div class="flex flex-col items-center pt-8">
    <div class="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10">
        <button @click="goBack" class="text-lg text-teal-400 hover:text-teal-500 mb-2"><< Back</button>
        <div class="flex flex-col">
            <!-- ヘッダー: 投稿タイトル -->
            <div class="flex justify-between items-start mb-6">
                <div>
                <h1 class="text-3xl font-bold text-gray-800">{{ post.title }}</h1>
                <NuxtLink :to="`/users/${post.user_id}`" class="text-gray-500 mt-1 hover:text-teal-400">by {{ post.name }} ({{ post.email }})</NuxtLink>
                <p class="text-gray-400 text-sm mt-1">Posted: {{ post.created_at }}</p>
                </div>
                <button @click='showModal=true' class="w-20 bg-teal-300 hover:bg-teal-400 p-2 rounded-md shadow-lg">Edit</button>
            </div>

            <!-- 投稿内容 -->
            <div class="flex-1 overflow-y-auto max-h-[40vh]">
                <p class="text-gray-700 whitespace-pre-wrap break-words">{{ post.content }}</p>
            </div>
        </div>
    </div>
  </div>
    <PostModal v-if="showModal" :manipulateType="`Update`" @close="showModal=false"/>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { Post } from '~/types/type'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const showModal =ref<boolean>()

const post: Post = {
    id: 100,
    user_id: 1,
    name: '山田太郎',
    email: 'your@example.com',
    title: `Sample Post #${id}`,
    content: `ここに投稿内容が入ります。長い文章の場合はスクロール可能です。\n`.repeat(30),
    created_at: '2025-10-30'
}

const goBack = () => {
    router.back()
}
</script>

