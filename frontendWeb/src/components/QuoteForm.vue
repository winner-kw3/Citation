<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      {{ isEditing ? 'Modifier la citation' : 'Ajouter une citation' }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="text" class="block text-sm font-medium text-gray-700 mb-1">Citation</label>
        <textarea
          id="text"
          v-model="formData.text"
          rows="3"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>
      <div>
        <label for="author" class="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
        <input
          type="text"
          id="author"
          v-model="formData.author"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          {{ isEditing ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  quote: {
    type: Object,
    default: () => ({ text: '', author: '' })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = ref({
  text: '',
  author: ''
});

onMounted(() => {
  if (props.isEditing) {
    formData.value = { ...props.quote };
  }
});

const handleSubmit = () => {
  emit('submit', { ...formData.value });
  if (!props.isEditing) {
    formData.value = { text: '', author: '' };
  }
};
</script> 