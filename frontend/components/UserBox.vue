<template>
    <NuxtLink v-if="user" :to="`/users/${user!.id}`" class="w-full bg-white border border-gray-300 hover:bg-gray-100 rounded-2xl flex items-center shadow-md">
        <div class="pl-2">
            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-8 h-8 bg-sky-200 rounded-full">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
            </svg>
        </div>
        <div class="flex flex-col">
            <h2 class="text-md w-full px-2 text-gray-800 font-semibold">{{ user!.name }}</h2>
            <p class="text-sm px-2 pb-1 text-gray-400">{{ user!.email}}</p>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { UserSummary } from '~/graphql/types/response';

defineProps<{user?: UserSummary | null}>()
</script>