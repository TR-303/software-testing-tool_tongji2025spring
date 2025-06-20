<script setup>
import { ref, watch, reactive, computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { testCases } from '@/data/testCases';

Chart.register(ArcElement, Tooltip, Legend);

const output = ref('');
const running = ref(false);
const passed = ref([]);
const failed = ref([]);

const tabs = [
  { label: 'User类', key: 'User' },
  { label: 'JoinRequest类', key: 'JoinRequest' },
  { label: 'Task类', key: 'Task' }
];
const selectedTab = ref(tabs[0]);
const selectedTag = ref('');
const cases = reactive(JSON.parse(JSON.stringify(testCases)));

const tagList = computed(() => {
  const list = cases[selectedTab.value.key] || [];
  return [...new Set(list.map(tc => tc.tag))];
});

watch(selectedTab, () => {
  selectedTag.value = tagList.value[0] || '';
}, { immediate: true });

const chartData = ref({
  labels: ['通过', '失败'],
  datasets: [
    {
      data: [0, 0],
      backgroundColor: ['#16a34a', '#dc2626'],
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
  for (const list of Object.values(cases)) {
    list.forEach(tc => {
      if (passed.value.includes(tc.testName)) tc.status = true;
      else if (failed.value.includes(tc.testName)) tc.status = false;
      else tc.status = null;
    });
  }
});

const currentCases = computed(() => {
  let list = cases[selectedTab.value.key] || [];
  if (selectedTag.value) list = list.filter(tc => tc.tag === selectedTag.value);
  return list;
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
  <div class="mb-8 p-8 bg-white rounded-lg">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-4">单元测试</h1>
    <div class="text-base text-gray-700 pl-6">
      单元测试用于验证各个模块的功能正确性。<br>
      请选择需要查看的类和标签，点击右上角按钮运行所有单元测试。<br>
    </div>
  </div>
  <div class="flex justify-end items-center px-10 gap-4 mb-4">
    <button
      @click="run"
      :disabled="running"
      class="flex items-center px-4 py-2 bg-black text-white rounded transition-colors duration-150 hover:bg-gray-800 active:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg class="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <polygon points="4,3 16,10 4,17"/>
      </svg>
      {{ running ? '运行中...' : '运行单元测试' }}
    </button>
  </div>

  <div class="border-b flex space-x-2 px-10">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      @click="selectedTab = tab"
      class="px-4 py-2 text-sm font-medium transition-colors duration-150"
      :class="selectedTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'"
    >
      {{ tab.label }}
    </button>
  </div>

  <div class="border-b flex space-x-2 mt-2 px-10" v-if="tagList.length">
    <button
      v-for="tag in tagList"
      :key="tag"
      @click="selectedTag = tag"
      class="px-3 py-1 text-sm font-medium transition-colors duration-150"
      :class="selectedTag === tag ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-500'"
    >
      {{ tag }}
    </button>
  </div>

  <div class="overflow-x-auto p-10">
    <table class="min-w-full border-separate border-spacing-y-1 text-sm">
      <thead>
        <tr>
          <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">ID</th>
          <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">标识</th>
          <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">测试项描述</th>
          <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">输入</th>
          <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">期望输出</th>
          <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">通过</th>
        </tr>
      </thead>
      <tbody v-if="currentCases.length">
        <tr v-for="(c, idx) in currentCases" :key="c.id" class="even:bg-gray-50 hover:bg-gray-100 transition-colors">
          <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ idx + 1 }}</td>
          <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ c.id }}</td>
          <td class="px-4 py-2 whitespace-pre-wrap text-gray-800">{{ c.desc }}</td>
          <td class="px-4 py-2 whitespace-pre-wrap text-gray-800">{{ c.input }}</td>
          <td class="px-4 py-2 whitespace-pre-wrap text-gray-800">{{ c.expected }}</td>
          <td class="px-4 py-2 text-center">
            <span v-if="c.status === true" class="inline-flex items-center text-green-600 font-bold">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <span v-else-if="c.status === false" class="inline-flex items-center text-red-600 font-bold">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </span>
            <span v-else class="text-gray-500">-</span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="text-center py-6 text-gray-400">暂无测试用例</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-if="passed.length || failed.length" class="bg-gray-50 p-6 rounded-lg w-full p-10 mx-auto">
    <h3 class="font-semibold mb-2 text-lg">测试结果</h3>
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
</template>
