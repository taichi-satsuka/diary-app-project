<template>
    <div>
        <NuxtLink v-if="postSummary" :to="`/posts/${postSummary.id}`" class="w-full bg-white border border-gray-300 hover:bg-gray-100 rounded-2xl flex shadow-md py-2 pr-2 mb-1">
            <div class="flex-shrink-0 pl-2">
                <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-8 h-8 rounded-full">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                </svg>
            </div>
            <div class="flex-1 flex flex-col min-w-0">
                <div class="w-full flex items-center justify-between mb-1">
                    <div class="flex flex-1 flex-wrap items-baseline items-center gap-2">
                        <NuxtLink :to="`/users/${postSummary.user.id}`" class="hover:text-teal-400 text-sm px-2 text-gray-800 font-semibold truncate">{{ postSummary.user.name }}</NuxtLink>
                        <span class="text-sm px-2 text-gray-400 truncate">{{ postSummary.user.email}}</span>
                    </div>
                    <span class="text-sm pr-5 text-gray-400 truncate">{{ time }}</span>
                </div>
                <h2 class="text-lg font-bold px-2 break-words">{{ postSummary.title}}</h2>
            </div>
        </NuxtLink>
        <Loading v-else class="mainBox flex justify-center items-center"/>
    </div>
</template>

<script setup lang="ts">
import { type PostSummary } from '~/graphql/types/response';

const { getTime } = useDate()
const props = defineProps<{
    postSummary: PostSummary
}>()

const time = getTime(props.postSummary.created_at)
</script>