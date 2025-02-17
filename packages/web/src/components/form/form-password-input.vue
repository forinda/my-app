<script setup lang="ts">
import { ref, computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import { Icon } from '@iconify/vue';
type TextInputProps = {
  labelText: string;
  placeholder?: string;
  id?: string;
  name: string;
};

defineProps<TextInputProps>();
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const inputType = computed(() => (showPassword.value ? 'text' : 'password'));
const iconName = computed(() =>
  showPassword.value ? 'lucide-eye-off' : 'lucide-eye',
);
</script>

<template>
  <div class="text-input-container">
    <!-- Label -->
    <label v-if="labelText" :for="id ?? name" class="text-sm font-medium text-gray-700">
      {{ labelText }}
    </label>

    <!-- Input Container -->
    <div
      class="input-wrapper mt-1 bg-white border border-gray-300 rounded-md shadow-sm transition-all hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 flex">
      <!-- Icon (if provided) -->
      <!-- <div v-if="iconName" class="icon-container px-3 border-r border-gray-300">
				<Icon :icon="'lucide-lock'" class="text-gray-400" />
			</div> -->

      <!-- Input Field -->
      <Field :type="inputType ?? 'text'" :id="id ?? name" :name="name" :placeholder="placeholder"
        :aria-label="labelText || name" class="input-field w-full px-3 py-2 focus:outline-none placeholder-gray-400" />
      <div class="icon-container px-3 border-l border-gray-300">
        <button type="button" @click="togglePasswordVisibility" class="focus:outline-none cursor-pointer">
          <Icon :icon="iconName" class="text-gray-400" />
        </button>
      </div>
    </div>
    <error-message :name="name" class="text-red-500 text-xs mt-1" />
    <!-- <p class="text-red-500 text-xs mt-1">{{ error }}</p> -->
  </div>
</template>

<style scoped>
.text-input-container {
  width: 100%;
}

.input-wrapper {
  display: flex;
  align-items: center;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.input-field {
  background: transparent;
  border: none;
  color: inherit;
  width: 100%;
}

.input-field:focus {
  box-shadow: none;
  outline: none;
}
</style>
