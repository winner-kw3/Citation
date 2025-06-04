<script setup>
import { ref, onMounted } from 'vue'

const quotes = ref([])
const isLoading = ref(false)
const error = ref(null)
const successMessage = ref(null)

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

// Fonction pour supprimer une citation
const deleteQuote = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette citation ?')) {
    return
  }
  
  isLoading.value = true
  error.value = null
  
  try {
    const response = await fetch(`/api/quotes/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression de la citation')
    }
    
    // Supprimer la citation de la liste locale
    quotes.value = quotes.value.filter(quote => quote.id !== id)
    
    // Afficher un message de succès
    successMessage.value = 'Citation supprimée avec succès !'
    
    // Effacer le message après 3 secondes
    setTimeout(() => {
      successMessage.value = null
    }, 3000)
    
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchQuotes()
})
</script>

<template>
  <div class="w-full">
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 border-b pb-2 text-center">Administration des citations</h2>
      
      <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700 mb-4">
        {{ error }}
      </div>
      
      <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-500 p-4 rounded-md text-green-700 mb-4">
        {{ successMessage }}
      </div>
      
      <div v-if="isLoading && quotes.length === 0" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="quotes.length === 0" class="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
        <p>Aucune citation disponible</p>
      </div>
      
      <div v-else class="grid gap-4">
        <div v-for="quote in quotes" :key="quote.id" class="bg-white shadow-sm rounded-lg p-4 transition-all hover:shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <blockquote class="italic text-lg mb-2 text-gray-700">"{{ quote.text }}"</blockquote>
              <p class="font-semibold text-gray-800">— {{ quote.author }}</p>
              <p class="text-xs text-gray-400 mt-1">
                ID: {{ quote.id }} | Créée le: {{ new Date(quote.createdAt).toLocaleDateString() }}
              </p>
            </div>
            <button 
              @click="deleteQuote(quote.id)" 
              class="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 