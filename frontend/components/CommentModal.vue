<template>
    <div class="min-h-screen fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-gradient-to-br from-teal-100/70 to-teal-200/70 z-50"
    @click.self="emit('close')"
    >
        <div class="w-full max-w-md bg-white rounded-2xl p-8">
            <h2 class="text-center font-extrabold text-2xl mb-3">Create comment</h2>
            <form class="space-y-5" @submit.prevent="emit('submit',commentInput)">
                <div>
                    <label class="block text-md mb-1">comment</label>
                    <textarea
                        name="content"
                        id="content"
                        class="px-4 py-3 h-60 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
                        placeholder="Input your comment"
                        v-model="commentInput"
                        required
                    ></textarea>
                </div>
                <div class="flex flex-row-reverse gap-2 mt-4">
                    <button
                        type="submit"
                        class="px-4 py-2 mt-2 w-18 text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition"
                    >comment</button>
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

const commentInput = ref<string>('')

const emit = defineEmits<{
    (e: 'submit', value: string): void
    (e: 'close'): void
}>()
</script>