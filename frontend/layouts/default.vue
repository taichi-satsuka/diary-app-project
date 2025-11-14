<template>
    <div class="h-screen flex flex-col bg-gradient-to-br from-teal-50 to-teal-200">
        <header class="h-20 bg-teal-400 text-white flex items-center justify-center shadow-md ">
            <NuxtLink to="/" class="text-5xl">Diary App</NuxtLink>
        </header>
        <div class="flex-1">
            <slot />
        </div>
    </div>
</template>