<template>
    <div class="h-full fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-gradient-to-br from-teal-100 to-teal-200 z-50">
        <div class="w-full max-w-md bg-white rounded-2xl p-8">
            <h2 class="text-center font-extrabold text-2xl mb-3">Edit</h2>
            <form class="space-y-5" @submit.prevent="emit('submit', post!)">
                <div>
                    <label for="title" class="block text-md mb-1">title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        placeholder="Your title"
                        v-model="post!.title"
                        required
                    />
                </div>
                <div>
                    <label class="block text-md mb-1">content</label>
                    <textarea
                        name="content"
                        id="content"
                        class="px-4 py-3 h-60 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
                        placeholder="Your content"
                        v-model="post!.content"
                        required
                    ></textarea>
                </div>
                <div class="flex flex-row-reverse gap-1">
                    <div>
                        <input 
                            type="radio"
                            name="visibility"
                            id="followers"
                            class="hidden peer"
                            value="FOLLOWERS"
                            v-model="post!.visibility"
                            required
                        />
                        <label 
                            for="followers"
                            class="text-center px-3 py-1 border-2 rounded-md hover:border-teal-400 transition peer-checked:bg-teal-300"
                        >Only Followers</label>
                    </div>
                    <div>
                        <input 
                            type="radio"
                            name="visibility"
                            id="public"
                            class="hidden peer"
                            value="PUBLIC"
                            v-model="post!.visibility"
                            required
                        />
                        <label 
                            for="public"
                            class="text-center px-3 py-1 border-2 rounded-md hover:border-teal-400 transition peer-checked:bg-teal-300"
                        >public</label>
                    </div>
                </div>
                <div class="flex flex-row-reverse gap-2 mt-4">
                    <button
                        type="submit"
                        class="px-4 py-2 mt-2 w-18 text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition"
                    >Update</button>
                    <button
                        type="button"
                        class="px-4 py-2 mt-2 w-18 text-center rounded-md bg-gray-400 shadow-md text-white hover:bg-gray-500 hover:shadow-lg font-semibold transition"
                        @click="emit('close')"
                        >cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type PostDetail } from '~/graphql/types/response';

const post = defineModel<PostDetail>()

const emit = defineEmits<{
    (e: 'submit', value: PostDetail): void
    (e: 'close'): void
}>()
</script>