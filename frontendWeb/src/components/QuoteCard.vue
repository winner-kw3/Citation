<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-4 transform transition-all duration-300 hover:scale-105">
    <div class="flex justify-between items-start">
      <div class="flex-1">
        <p class="text-xl font-serif italic text-gray-800 mb-4">"{{ quote.text }}"</p>
        <p class="text-right text-gray-600">- {{ quote.author }}</p>
      </div>
      <div class="flex space-x-2 ml-4">
        <button
          @click="$emit('edit', quote)"
          class="p-2 text-blue-600 hover:text-blue-800 transition-colors"
          title="Modifier"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          @click="$emit('delete', quote.id)"
          class="p-2 text-red-600 hover:text-red-800 transition-colors"
          title="Supprimer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  quote: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script> 