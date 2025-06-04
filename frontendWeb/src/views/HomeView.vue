<script setup>
import { ref, onMounted } from 'vue'
import AddQuoteForm from '@/components/AddQuoteForm.vue'

const quotes = ref([])
const randomQuote = ref(null)
const isLoading = ref(false)
const error = ref(null)

// Fonction pour récupérer toutes les citations
const fetchQuotes = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('/api/quotes')
    if (!response.ok) throw new Error('Erreur lors de la récupération des citations')
    const data = await response.json()
    quotes.value = data.quotes
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Fonction pour récupérer une citation aléatoire
const fetchRandomQuote = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('/api/quotes/random')
    if (!response.ok) throw new Error('Erreur lors de la récupération de la citation')
    const data = await response.json()
    randomQuote.value = data.quote
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

// Gestionnaire pour l'ajout d'une citation
const handleQuoteAdded = (newQuote) => {
  // Ajouter la nouvelle citation à la liste
  quotes.value.push(newQuote)
}

onMounted(() => {
  fetchQuotes()
  fetchRandomQuote()
})
</script>

<template>
  <div class="w-full">
    <!-- Section citation aléatoire -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Citation aléatoire</h2>
      
      <div v-if="isLoading && !randomQuote" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
        {{ error }}
      </div>
      
      <div v-else-if="randomQuote" class="bg-white shadow-sm rounded-lg p-8 mb-4 transition-all hover:shadow-md">
        <blockquote class="italic text-2xl mb-4 text-gray-700 leading-relaxed">"{{ randomQuote.text }}"</blockquote>
        <p class="text-right font-semibold text-gray-800">— {{ randomQuote.author }}</p>
      </div>
      
      <div v-else class="bg-gray-50 rounded-lg p-6 mb-4 text-center text-gray-500">
        <p>Aucune citation disponible</p>
      </div>
      
      <div class="text-center mt-6">
        <button 
          @click="fetchRandomQuote" 
          class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Afficher une autre citation
        </button>
      </div>
    </section>

    <!-- Formulaire d'ajout de citation -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Ajouter une citation</h2>
      <AddQuoteForm @quote-added="handleQuoteAdded" />
    </section>

  </div>
</template> 