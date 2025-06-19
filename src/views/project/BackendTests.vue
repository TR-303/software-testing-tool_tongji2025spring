<script setup>
import { ref } from 'vue';

const output = ref('');
const running = ref(false);

async function run() {
  running.value = true;
  output.value = '';
  try {
    const res = await fetch('http://localhost:5001/run_tests', {
      method: 'POST'
    });
    const data = await res.json();
    output.value = data.output || JSON.stringify(data);
  } catch (e) {
    output.value = '请求失败';
  } finally {
    running.value = false;
  }
}
</script>

<template>
  <div class="p-6 space-y-4">
    <button @click="run" :disabled="running" class="px-4 py-2 bg-blue-500 text-white rounded">
      {{ running ? '运行中...' : '运行单元测试' }}
    </button>
    <pre class="bg-gray-100 p-4 whitespace-pre-wrap">{{ output }}</pre>
  </div>
</template>

