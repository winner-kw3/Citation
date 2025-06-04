<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Créer un compte</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Email</label>
        <input v-model="email" type="email" class="w-full border rounded p-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Mot de passe</label>
        <input v-model="password" type="password" class="w-full border rounded p-2" required />
      </div>
      <div class="mb-4">
        <label class="block mb-1 text-gray-700">Confirmation du mot de passe</label>
        <input v-model="confirmPassword" type="password" class="w-full border rounded p-2" required />
      </div>
      <button type="submit" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
        S'inscrire
      </button>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
      <p v-if="success" class="text-green-600 mt-2">{{ success }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../components/auth.js';

const { register } = useAuth();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref(null);
const success = ref(null);
const router = useRouter();



const handleRegister = async () => {
  error.value = null;
  success.value = null;

  if (password.value !== confirmPassword.value) {
    error.value = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.value, password: password.value }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Erreur lors de l\'inscription');

    success.value = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
    setTimeout(() => router.push('/login'), 2000);
  } catch (err) {
    error.value = err.message;
  }
};
</script>
