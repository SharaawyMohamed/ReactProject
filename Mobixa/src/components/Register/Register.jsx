import React from 'react'

export default function Register() {
    return (
            <div class="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6 relative overflow-hidden">
                <div class="absolute inset-0 bg-[radial-gradient(at_top_right,#6366f1_0%,transparent_50%)] opacity-30"></div>
                <div class="absolute inset-0 bg-[radial-gradient(at_bottom_left,#a855f7_0%,transparent_50%)] opacity-30"></div>

                <div class="w-full max-w-md">
                    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 sm:p-12 text-white">

                        <div class="text-center mb-10">
                            <div class="mx-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/30">
                                <span class="text-3xl">✦</span>
                            </div>
                            <h2 class="text-4xl font-bold tracking-tighter">Join us</h2>
                            <p class="mt-3 text-white/70 text-lg">Create your account in seconds</p>
                        </div>

                        <form class="space-y-8">
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-white/80 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        class="block w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-white/80 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        class="block w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    class="block w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-white/80 mb-2">Password</label>
                                <input
                                    type="password"
                                    class="block w-full px-5 py-4 bg-white/10 border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />

                                <div class="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                                    <div class="flex items-center text-emerald-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                        8+ characters
                                    </div>
                                    <div class="flex items-center text-white/60">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        One uppercase
                                    </div>
                                    <div class="flex items-center text-white/60">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        One number
                                    </div>
                                    <div class="flex items-center text-white/60">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        One special char
                                    </div>
                                </div>
                            </div>

                            <div class="flex items-start">
                                <input
                                    type="checkbox"
                                    class="mt-1 h-5 w-5 accent-white border-white/40 bg-white/10 rounded focus:ring-white/50"
                                />
                                <label class="ml-3 text-sm text-white/70 leading-relaxed">
                                    I agree to the
                                    <span class="text-white hover:underline cursor-pointer font-medium">Terms of Service</span>
                                    and
                                    <span class="text-white hover:underline cursor-pointer font-medium">Privacy Policy</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                class="w-full py-4 bg-white text-indigo-950 font-semibold text-lg rounded-2xl hover:bg-white/90 active:scale-[0.985] transition-all duration-200 shadow-lg shadow-black/30 flex items-center justify-center gap-3"
                            >
                                Create Account
                                <span class="text-xl">→</span>
                            </button>
                        </form>

                        <div class="mt-8">
                            <div class="relative">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-white/20"></div>
                                </div>
                                <div class="relative flex justify-center text-xs uppercase tracking-widest text-white/50">
                                    <span class="bg-[#1e1b4b] px-4">or continue with</span>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 gap-4 mt-6">
                                <button class="py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl transition-all flex items-center justify-center">
                                    <span class="text-xl">G</span>
                                </button>
                                <button class="py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl transition-all flex items-center justify-center">
                                    <span class="text-xl">𝕏</span>
                                </button>
                                <button class="py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-2xl transition-all flex items-center justify-center">
                                    <span class="text-xl">f</span>
                                </button>
                            </div>
                        </div>
                        <p class="text-center text-sm text-white/60 mt-10">
                            Already have an account?
                            <a href="#" class="text-white font-medium hover:underline">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
    )
}
