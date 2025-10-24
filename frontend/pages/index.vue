<template>
    <div class="h-full flex justify-center ">
        <aside class="w-1/5 mr-2 bg-white/70 flex flex-col">
            <h1 class="text-3xl font-extrabold text-center text-teal-700 mt-4 mb-6 tracking-wide">Home</h1>

            <UserBox class="mb-2"/>

            <button
            class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition"
            >Create Post</button>
        </aside>

        <div class="mainBox w-1/3 gap-1 flex overflow-scroll flex-col">
            <div class="flex p-1 border-2 border-teal-300 gap-1 sticky top-0 backdrop-blur-sm z-10 bg-teal-100/80 shadow-md rounded-md">
                <button class="flex-1 font-bold hover:underline hover:text-gray-700 transition">Timeline</button>
                <button class="flex-1 font-bold border-l-2 border-teal-400 hover:underline hover:text-gray-700 transition">Like</button>
            </div>
            <PostCard 
                v-for="(post, index) in posts"
                :key="index"
                :post="post"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/type';

const posts: Post[] = [
     {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },   {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
    {
        name: '山田太郎',
        email: 'your@example.com',
        title: "title",
        content: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        created_at: "now",
    },
]
</script>
