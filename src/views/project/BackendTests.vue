<script setup>
import { ref, watch } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const output = ref('');
const running = ref(false);
const passed = ref([]);
const failed = ref([]);

const chartData = ref({
  labels: ['\u901a\u8fc7', '\u5931\u8d25'],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#4CAF50', '#F44336'],
      borderWidth: 0
    }
  ]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

watch([passed, failed], () => {
  chartData.value.datasets[0].data = [passed.value.length, failed.value.length];
});

async function run() {
  running.value = true;
  output.value = '';
  try {
    const res = await fetch('http://localhost:5001/run_tests', {
      method: 'POST'
    });
    const data = await res.json();
    output.value = data.output || JSON.stringify(data);
    passed.value = data.passed || [];
    failed.value = data.failed || [];
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
    <div v-if="passed.length || failed.length" class="bg-gray-100 p-4 whitespace-pre-wrap">
      <h3 class="font-semibold mb-2">测试结果</h3>
      <div v-if="passed.length">
        <div class="font-medium text-green-700">通过的测试：</div>
        <ul class="list-disc pl-6">
          <li v-for="p in passed" :key="p">{{ p }}</li>
        </ul>
      </div>
      <div v-if="failed.length" class="mt-2">
        <div class="font-medium text-red-700">失败的测试：</div>
        <ul class="list-disc pl-6">
          <li v-for="f in failed" :key="f">{{ f }}</li>
        </ul>
      </div>
      <div class="mt-2 font-semibold">
        共 {{ passed.length + failed.length }} 项测试，{{ passed.length }} 通过，{{ failed.length }} 失败
      </div>
      <div class="p-4 flex justify-center">
        <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-64">
          <Pie :data="chartData" :options="chartOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

