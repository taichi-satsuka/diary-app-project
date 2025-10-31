<template>
    <div class="min-h-screen fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-gradient-to-br from-teal-100/70 to-teal-200/70 z-50" @click.self='$emit("close")'>
        <div class="bg-teal-300 flex flex-col gap-2 rounded-2xl w-full max-w-md h-full max-h-[500px] overflow-y-auto p-2">
            <UserBox
                v-for="userSummary in userSummaries"
                :user="userSummary"
            />
        </div>
        
    </div>
</template>

<script setup lang="ts">
import type { UserSummary } from '~/graphql/types/response';

defineProps<{userSummaries?: UserSummary[] | null}>()
</script>