<script setup>
import { ref, watch } from 'vue';

const classes = {
  User: [
    'register',
    'login',
    'getAccountInfo',
    'updateAccountInfo',
    'getResume',
    'updateResume'
  ],
  JoinRequest: [
    'createRequest',
    'respondToRequest'
  ]
};

const selectedClass = ref('');
const methodOptions = ref([]);
const selectedMethod = ref('');
const resultMessage = ref('');

watch(selectedClass, (newVal) => {
  methodOptions.value = classes[newVal] || [];
  selectedMethod.value = '';
});

function runTest() {
  resultMessage.value = `${selectedClass.value}.${selectedMethod.value} 已触发测试 (待实现)`;
}
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">单元测试</h1>
    <div>
      <label class="mr-2">选择类:</label>
      <select v-model="selectedClass" class="border rounded p-2">
        <option disabled value="">请选择</option>
        <option v-for="(methods, name) in classes" :key="name" :value="name">
          {{ name }}
        </option>
      </select>
    </div>
    <div v-if="methodOptions.length">
      <label class="mr-2">选择方法:</label>
      <select v-model="selectedMethod" class="border rounded p-2">
        <option disabled value="">请选择</option>
        <option v-for="m in methodOptions" :key="m" :value="m">{{ m }}</option>
      </select>
    </div>
    <button
      class="px-4 py-2 bg-blue-600 text-white rounded"
      :disabled="!selectedClass || !selectedMethod"
      @click="runTest"
    >
      运行
    </button>
    <div v-if="resultMessage" class="text-gray-700">
      {{ resultMessage }}
    </div>
  </div>
</template>

<style scoped>
</style>
