<template>
  <div class="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-5 py-10">

    <!-- Brand -->
    <div class="mb-8 text-center">
      <p class="font-black text-slate-900 text-2xl leading-tight">PreLearn</p>
      <p class="text-xs text-slate-400 mt-0.5">Bac II exam preparation</p>
    </div>

    <!-- Card -->
    <div class="w-full max-w-sm bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

      <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Create your account</p>

      <form @submit.prevent="handleRegister" class="flex flex-col gap-5">

        <!-- Name -->
        <div>
          <label for="name" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Full Name
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Your name"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            minlength="8"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirm" class="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
            Confirm Password
          </label>
          <input
            id="confirm"
            v-model="form.confirm"
            type="password"
            required
            placeholder="••••••••"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            :class="{ 'border-red-300 focus:ring-red-300': passwordMismatch }"
          />
          <p v-if="passwordMismatch" class="text-red-500 text-xs font-semibold mt-1">Passwords do not match</p>
        </div>

        <!-- Error -->
        <p v-if="error" class="text-red-500 text-xs font-semibold -mt-1">{{ error }}</p>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading || passwordMismatch"
          class="w-full inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl transition"
        >
          <svg v-if="loading" class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
          {{ loading ? 'Creating account…' : 'Create account' }}
        </button>

      </form>

    </div>

    <!-- Footer link -->
    <p class="mt-6 text-sm text-slate-500">
      Already have an account?
      <RouterLink to="/login" class="font-bold text-blue-700 hover:text-blue-800 transition">
        Sign in
      </RouterLink>
    </p>

    <!-- Back to home -->
    <RouterLink
      to="/"
      class="mt-3 text-xs text-slate-400 hover:text-slate-600 transition"
    >
      ← Back to home
    </RouterLink>

  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({ name: '', email: '', password: '', confirm: '' })
const loading = ref(false)
const error = ref('')

const passwordMismatch = computed(
  () => form.confirm.length > 0 && form.password !== form.confirm
)

async function handleRegister() {
  if (passwordMismatch.value) return
  loading.value = true
  error.value = ''
  try {
    // TODO: wire up Firebase Auth
    console.log('Register', form.name, form.email)
    router.push('/')
  } catch (e) {
    error.value = e.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
