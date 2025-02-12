<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

type TextInputProps = {
  labelText: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'phone';
  pattern?: string;
  id?: string;
  name: string;
  iconName?: string;
  as?: 'textarea' | 'input' | 'select';
  options?: { value: string; label: string }[];
  autoComplete?: Pick<InputHTMLAttributes, 'autocomplete'>['autocomplete'];
};

defineProps<TextInputProps>();
</script>

<template>
  <div class="text-input-container w-full">
    <!-- Label -->
    <label
      v-if="labelText"
      :for="id ?? name"
      class="text-sm font-medium text-gray-700"
    >
      {{ labelText }}
    </label>

    <!-- Input Container -->
    <div
      class="input-wrapper mt-1 bg-white border border-gray-300 rounded-md shadow-sm transition-all hover:border-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
    >
      <!-- Icon (if provided) -->
      <div v-if="iconName" class="icon-container px-3 border-r border-gray-300">
        <icon :name="iconName" class="text-gray-400" />
      </div>

      <!-- Input Field -->
      <Field
        v-if="as !== 'select'"
        :type="type ?? 'text'"
        :as="as ?? 'input'"
        :id="id ?? name"
        :name="name"
        :autocomplete="autoComplete"
        :pattern="pattern"
        :placeholder="placeholder"
        :aria-label="labelText || name"
        class="input-field w-full px-3 py-2 focus:outline-none placeholder-gray-400"
      />
      <Field
        v-else
        :type="as"
        :id="id ?? name"
        :name="name"
        :autocomplete="autoComplete"
        :pattern="pattern"
        :placeholder="placeholder"
        :aria-label="labelText || name"
        class="input-field w-full px-3 py-2 focus:outline-none placeholder-gray-400"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </Field>
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

textarea {
  resize: none;
  height: 150px;
}
</style>
