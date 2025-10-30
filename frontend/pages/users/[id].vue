<template>
  <div class="mainBox flex flex-col items-center pt-8">
    <div class="w-1/2 h-1/3 bg-white rounded-2xl shadow-2xl p-6">
      <!-- ヘッダー -->
      <div class="flex items-center gap-4 mb-6 relative">
        <img
          :src="user.avatar || '/default-avatar.png'"
          alt="User Avatar"
          class="w-16 h-16 rounded-full object-cover bg-teal-300"
        />
        <div>
          <h1 class="text-2xl font-bold text-gray-800">{{ user.name }}</h1>
          <p class="text-gray-500">{{ user.email }}</p>
          <p class="text-gray-400 text-sm">Joined: {{ user.created_at }}</p>
        </div>
        
        <button type="button" class="absolute top-0 right-0 text-md text-white bg-teal-400 hover:bg-teal-500 p-1 rounded-md shadow-lg w-20">edit</button>
      </div>

      <!-- Bio -->
      <div class="mb-4">
        <h2 class="text-lg font-semibold text-gray-700 mb-1">Bio</h2>
        <p class="h-20 text-gray-600i break-words overflow-y-auto">{{ user.bio }}ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
      </div>

    </div>
    <div class="flex-1 w-1/2 gap-1 flex overflow-scroll flex-col">
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
</template>

<script setup lang="ts">
import type { Post } from '~/types/type';

const route = useRoute()
const id = route.params.id

const user = {
    id,
    name: 'User ' + id,
    avatar: null,
    email: `user${id}@example.com`,
    created_at: 'now',
    bio: "This is demo user"
}

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