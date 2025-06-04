<script setup>
import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const emit = defineEmits(['quote-added'])

const newQuote = ref({
  text: '',
  author: ''
})
const isSubmitting = ref(false)
const error = ref(null)
const successMessage = ref(null)

const addQuote = async () => {
  // Validation basique
  if (!newQuote.value.text || !newQuote.value.author) {
    error.value = "Le texte et l'auteur sont requis"
    return
  }

  isSubmitting.value = true
  error.value = null
  successMessage.value = null

  try {
    const response = await fetch('/api/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote.value)
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la citation")
    }

    const data = await response.json()
    
    // Réinitialiser le formulaire
    newQuote.value.text = ''
    newQuote.value.author = ''
    
    // Afficher un message de succès
    successMessage.value = 'Citation ajoutée avec succès !'
    
    // Émettre un événement pour informer le parent
    emit('quote-added', data)
    
    // Effacer le message de succès après 3 secondes
    setTimeout(() => {
      successMessage.value = null
    }, 3000)
  } catch (err) {
    error.value = err.message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="bg-white shadow-sm rounded-lg p-6">
    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 mb-4">
      {{ error }}
    </div>
    
    <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-green-700 mb-4">
      {{ successMessage }}
    </div>
    
    <form @submit.prevent="addQuote" class="space-y-4">
      <div>
        <label for="quote-text" class="block text-sm font-medium text-gray-700 mb-1">Texte de la citation</label>
        <textarea
          id="quote-text"
          v-model="newQuote.text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows="3"
          placeholder="Entrez le texte de la citation"
        ></textarea>
      </div>
      
      <div>
        <label for="quote-author" class="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
        <input
          id="quote-author"
          v-model="newQuote.author"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Nom de l'auteur"
        />
      </div>
      
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">Ajout en cours...</span>
          <span v-else>Ajouter la citation</span>
        </button>
      </div>
    </form>
  </div>
</template> 