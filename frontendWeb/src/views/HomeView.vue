<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <!-- En-tête -->
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Citations Inspirantes</h1>
          <p class="text-gray-600">Partagez vos citations préférées avec le monde</p>
        </div>

        <!-- Citation aléatoire -->
        <div class="mb-8 bg-white rounded-lg shadow-lg p-6">
          <div v-if="randomLoading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <div v-else-if="randomError" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {{ randomError }}
          </div>
          <div v-else-if="randomQuote" class="text-center">
            <blockquote class="italic text-2xl mb-2 text-gray-700">"{{ randomQuote.text }}"</blockquote>
            <p class="text-right font-semibold text-gray-800">— {{ randomQuote.author }}</p>
          </div>
          <div class="flex justify-center mt-4 space-x-2">
            <button @click="fetchRandomQuote" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">Nouvelle citation aléatoire</button>
            <button @click="showAll = !showAll" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
              {{ showAll ? 'Masquer toutes les citations' : 'Voir toutes les citations' }}
            </button>
          </div>
        </div>

        <!-- Bouton pour ajouter une citation -->
        <div class="mb-8">
          <button
            @click="showForm = true"
            class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Ajouter une citation
          </button>
        </div>

        <!-- Formulaire d'ajout/modification -->
        <div v-if="showForm" class="mb-8">
          <QuoteForm
            :quote="editingQuote"
            :is-editing="!!editingQuote"
            @submit="handleFormSubmit"
            @cancel="closeForm"
          />
        </div>

        <!-- Liste des citations -->
        <div v-if="showAll">
          <div v-if="loading" class="text-center py-8">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {{ error }}
          </div>
          <div v-else>
            <div v-if="quotes.length === 0" class="text-center py-8 text-gray-600">
              Aucune citation disponible. Soyez le premier à en ajouter une !
            </div>
            <div v-else class="space-y-4">
              <QuoteCard
                v-for="quote in quotes"
                :key="quote.id"
                :quote="quote"
                @edit="handleEdit"
                @delete="handleDelete"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { quoteService } from '../services/quoteService';
import QuoteCard from '../components/QuoteCard.vue';
import QuoteForm from '../components/QuoteForm.vue';

const quotes = ref([]);
const loading = ref(true);
const error = ref(null);
const showForm = ref(false);
const editingQuote = ref(null);
const showAll = ref(false);

const randomQuote = ref(null);
const randomLoading = ref(false);
const randomError = ref(null);

const fetchRandomQuote = async () => {
  try {
    randomLoading.value = true;
    randomError.value = null;
    const response = await quoteService.getRandomQuote();
    randomQuote.value = response;
  } catch (err) {
    randomError.value = "Erreur lors de la récupération de la citation aléatoire";
    console.error(err);
  } finally {
    randomLoading.value = false;
  }
};

const loadQuotes = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await quoteService.getAllQuotes();
    quotes.value = response;
  } catch (err) {
    error.value = "Erreur lors du chargement des citations";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleFormSubmit = async (formData) => {
  try {
    if (editingQuote.value) {
      await quoteService.updateQuote(editingQuote.value.id, formData);
    } else {
      await quoteService.addQuote(formData);
    }
    await loadQuotes();
    closeForm();
  } catch (err) {
    error.value = editingQuote.value
      ? "Erreur lors de la modification de la citation"
      : "Erreur lors de l'ajout de la citation";
    console.error(err);
  }
};

const handleEdit = (quote) => {
  editingQuote.value = quote;
  showForm.value = true;
};

const handleDelete = async (id) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette citation ?')) return;
  
  try {
    await quoteService.deleteQuote(id);
    await loadQuotes();
  } catch (err) {
    error.value = "Erreur lors de la suppression de la citation";
    console.error(err);
  }
};

const closeForm = () => {
  showForm.value = false;
  editingQuote.value = null;
};

onMounted(() => {
  loadQuotes();
  fetchRandomQuote();
});
</script> 