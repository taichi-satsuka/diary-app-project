<template>
    <div class="min-h-screen fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-gradient-to-br from-teal-100/70 to-teal-200/70 z-50">
        <div class="bg-teal-300 flex flex-col gap-2 rounded-2xl w-full max-w-md p-8">
            <h2
                class="text-2xl text-center font-bold mb-4"
            >Are you sure to delete？</h2>
            <div class="w-full flex gap-3 m-2">
                <button
                    class="flex-1 text-lg bg-red-400 hover:bg-red-500 p-2 rounded-md shadow-lg font-bold"
                    @click="emit('check')"
                >Yes</button>
                <button
                    class="flex-1 text-lg bg-green-300 hover:bg-green-400 p-2 rounded-md shadow-lg font-bold"
                    @click="emit('cancel')"
                >No</button>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'cancel'): void,
    (e: 'check'): void
}>()
</script>