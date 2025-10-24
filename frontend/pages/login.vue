<template>
    <div class="mainBox flex justify-center items-center bg-gradient-to-br from-teal-100 to-teal-300">
        <div class="rounded-2xl bg-white w-full max-w-md p-8 shadow-2xl">
            <h2 class="text-2xl text-center text-gray-700 mb-6 font-bold">Sign in to your account</h2>

            <!-- エラー表示 -->
            <p v-if='error' class="px-4 py-3 mb-5 w-full bg-red-300/50 border-4 border-red-500/70 rounded-md text-gray-700">{{ error }}</p>

            <!-- 成功メッセージ表示 -->
            <p v-if='successMessage' class="px-4 py-3 mb-5 w-full bg-teal-300/50 border-4 border-teal-500/70 rounded-md text-gray-700">{{ successMessage }}</p>

            <form action="" class="space-y-5 " @submit.prevent="onLogin">
                <div>
                    <label for="email" class="block text-sm mb-1 ">Your email</label>
                    <input
                        type="email"
                        name="email"
                        v-model="form.email"
                        id="email"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        placeholder="your@example.com"
                        required
                    />
                </div>
                <div class="relative">
                    <label for="password" class="block text-sm mb-1">password</label>
                    <input
                        :type = "showPassword ? 'text' : 'password'"
                        name="password"
                        v-model="form.password"
                        id="password"
                        placeholder="••••••••"
                        class="pl-4 pr-10 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    />
                   <PasswordToggle :show="showPassword" @toggle="showPassword = !showPassword" class="absolute right-3 top-1/2"/> 
                </div>
                <div>
                    <button type="submit" class="px-4 py-2 mt-2 w-full text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition">Sign in</button>
                </div>
            </form>
            <p class="text-gray-500 text-sm text-center mt-6">Don't have an account yet?   <NuxtLink to="/register" class="text-teal-500 hover:text-teal-600 hover:underline">Sign up</NuxtLink></p>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import { LOGIN } from '~/graphql/mutations/auth'
import type { LoginResponse } from '~/graphql/types/response'

const showPassword = ref<boolean>(false)
const error = ref<string>('')
const successMessage = ref<string>('')

const form = reactive<{email: string, password: string}>({
    email: '',
    password: ''
})

const onLogin = async () => {
    const { gqlRequest } = useGqlClient()
    const { setToken } = useAuth()

    const variables = {
        input: form
    }

    successMessage.value = ''
    error.value = ''

    try {
        const response = await gqlRequest<LoginResponse>(LOGIN, variables)
        
        console.log("hellow orld" )

        if (response.login.success) {
            successMessage.value = response.login.message
            setToken(response.login.token!)
            // console.log(response.login.token!)
            setTimeout(async () => {
                await navigateTo("/")
            }, 2000);
        } else {
            error.value = response.login.message
        }
    } catch (e) {
        console.error("An error occurred:", e)
    }

}
</script>