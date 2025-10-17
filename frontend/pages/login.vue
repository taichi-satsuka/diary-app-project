<template>
    <div class="min-h-screen flex justify-center items-center bg-gray-100">
        <div class="rounded-lg bg-white w-full max-w-md p-4 shadow-xl">
            <h2 class="text-2xl text-center text-gray-1000 my-2">Sign in to your account</h2>
            <form action="">
                <div class="mb-2">
                    <label for="email" class="block">Your email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md w-full shadow-sm"
                        placeholder="your@example.com"
                        required
                    />
                </div>
                <div class="mb-2">
                    <label for="password" class="block">password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md w-full shwdow-sm"
                    />
                </div>
                <div class="mb-2">
                    <button type="button" class="px-4 py-2 w-full text-center rounded-md bg-sky-500 text-white hover:bg-sky-600">Sign in</button>
                </div>
            </form>
            <p class="text-center">Don't have an account yet?   <NuxtLink to="/signup" class="text-sky-500 hover:text-sky-600">Sign up</NuxtLink></p>
            
        </div>
    </div>
</template>
