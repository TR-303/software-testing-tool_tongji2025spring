<script setup>
const { description } = defineProps({
  description: { type: String, required: true }
});
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold text-gray-800">描述</h2>
    <p class="mt-2 text-gray-700">{{ description }}</p>
  </div>
</template>

<style scoped>
</style>
