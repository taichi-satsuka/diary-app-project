<template>
    <div class="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-100 to-teal-300">
        <div class="rounded-2xl bg-white w-full max-w-md p-8 shadow-2xl">
            <h2 class="text-2xl text-center text-gray-700 mb-6 font-bold">Sign in to your account</h2>
            <form action="" class="space-y-5 ">
                <div>
                    <label for="email" class="block text-sm mb-1 ">Your email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 shadow-sm rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                        placeholder="your@example.com"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block text-sm mb-1">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        class="px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    />
                </div>
                <div>
                    <button type="button" class="px-4 py-2 mt-2 w-full text-center rounded-md bg-teal-500 shadow-md text-white hover:bg-teal-600 hover:shadow-lg font-semibold transition">Sign in</button>
                </div>
            </form>
            <p class="text-gray-500 text-sm text-center mt-6">Don't have an account yet?   <NuxtLink to="/signup" class="text-teal-500 hover:text-teal-600 hover:underline">Sign up</NuxtLink></p>
            
        </div>
    </div>
</template>
