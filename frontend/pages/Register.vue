<template>
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-100 to-emerald-300">
        <div class="rounded-2xl bg-white w-full max-w-md p-8 shadow-2xl">
            <h2 class="text-2xl text-center text-gray-700 mb-6 font-bold">Create your account</h2>
            <form action="" class="space-y-5 ">
                <div>
                    <label for="user_name" class="block text-sm mb-1">name</label>
                    <input
                        type="text"
                        v-model="userName"
                        name="user_name"
                        id="user_name"
                        placeholder="Your name"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        required
                    />
                </div>
                <div>
                    <label for="email" class="block text-sm mb-1 ">Your email</label>
                    <input
                        type="email"
                        v-model="email"
                        name="email"
                        id="email"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        placeholder="your@example.com"
                        required
                    />
                </div>
                <div class="relative">
                    <label for="password" class="block text-sm mb-1">password</label>
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        v-model="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        required
                    />
                   <PasswordToggle :show="showPassword" @toggle="showPassword = !showPassword" class="absolute right-3 top-1/2"/> 
                </div>
                <div class="relative">
                    <label for="password_confirmation" class="block text-sm mb-1">password confirmation</label>
                    <input
                        :type="showPasswordConf ? 'text': 'password'"
                        v-model="passwordConf"
                        name="password_confirmation"
                        id="password_confirmation"
                        placeholder="••••••••"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        required
                    />
                   <PasswordToggle :show="showPasswordConf" @toggle="showPasswordConf = !showPasswordConf" class="absolute right-3 top-1/2"/> 
                </div>
                <div>
                    <button type="submit" class="px-4 py-2 mt-2 w-full text-center rounded-md bg-emerald-500 shadow-md text-white hover:bg-emerald-600 hover:shadow-lg font-semibold transition">Create</button>
                </div>
            </form>
            <p class="text-gray-500 text-sm text-center mt-6">Already have an account?   <NuxtLink to="/login" class="text-emerald-500 hover:text-emerald-600 hover:underline">Sign in</NuxtLink></p>
        </div>
    </div>
</template>

<script setup lang="ts">
const showPassword = ref<boolean>(false)
const showPasswordConf = ref<boolean>(false)

const userName = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const passwordConf = ref<string>('')
</script>

