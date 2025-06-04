<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Email</label>
        <input v-model="email" type="email" class="w-full border rounded p-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Mot de passe</label>
        <input v-model="password" type="password" class="w-full border rounded p-2" required />
      </div>
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        Se connecter
      </button><br>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <RouterLink to="/register" class="text-gray-600 hover:text-blue-600 transition-colors">Pas de compte ? S'inscrire</RouterLink>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../components/auth.js';


const router = useRouter();
const { login } = useAuth();

const email = ref('');
const password = ref('');
const error = ref(null);

const handleLogin = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.value, password: password.value })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Erreur de connexion');

    login(data.user); // Stockage dans le composable
    router.push('/');
  } catch (err) {
    error.value = err.message;
  }
};
</script>
