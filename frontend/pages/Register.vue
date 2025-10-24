<template>
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-100 to-emerald-300">
        <div class="rounded-2xl bg-white w-full max-w-md p-8 shadow-2xl">
            <h2 class="text-2xl text-center text-gray-700 mb-6 font-bold">Create your account</h2>

            <!-- エラー表示 -->
            <p v-if='error' class="px-4 py-3 mb-5 w-full bg-red-300/50 border-4 border-red-500/70 rounded-md text-gray-700">{{ error }}</p>

            <!-- 成功メッセージ表示 -->
            <p v-if='successMessage' class="px-4 py-3 mb-5 w-full bg-emerald-300/50 border-4 border-emerald-500/70 rounded-md text-gray-700">{{ successMessage }}</p>

            <form action="" class="space-y-5 " @submit.prevent="onRegister">
                <div>
                    <label for="user_name" class="block text-sm mb-1">name</label>
                    <input
                        type="text"
                        v-model="form.name"
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
                        v-model="form.email"
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
                        v-model="form.password"
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
                        v-model="form.password_confirmation"
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
import { REGISTER_MUTATION } from '~/graphql/mutations/auth'
import type { RegisterResponse } from '~/graphql/types/response'

const showPassword = ref<boolean>(false)
const showPasswordConf = ref<boolean>(false)
const error = ref<string>('')
const successMessage = ref<string>('')

const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
})

const onRegister = async () => {
    const { gqlRequest }= useGqlClient()
    const query = REGISTER_MUTATION
    const variables = {
        input: form
    }

    successMessage.value = ''
    error.value = ''

    try {
        const response = await gqlRequest<RegisterResponse>(query, variables)

        if (response.register.success) {
            successMessage.value = response.register.message

            setTimeout(async () => {
                await navigateTo("/login")
            }, 2000);
        } else {
            error.value = response.register.message
        }
    } catch (e) {
        console.error("An error occurred:", e)
    }

}

</script>

