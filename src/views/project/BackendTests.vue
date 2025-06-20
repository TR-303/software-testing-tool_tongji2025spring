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
  <div class="p-6 space-y-4">
    <button @click="run" :disabled="running" class="px-4 py-2 bg-blue-500 text-white rounded">
      {{ running ? '运行中...' : '运行单元测试' }}
    </button>
    <pre class="bg-gray-100 p-4 whitespace-pre-wrap">{{ output }}</pre>

    <div class="border-b flex space-x-2">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        @click="selectedTab = tab"
        class="px-4 py-2"
        :class="selectedTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="border-b flex space-x-2 mt-2" v-if="tagList.length">
      <button
        v-for="tag in tagList"
        :key="tag"
        @click="selectedTag = tag"
        class="px-3 py-1"
        :class="selectedTag === tag ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'"
      >
        {{ tag }}
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-3 py-2">标识</th>
            <th class="px-3 py-2">测试项描述</th>
            <th class="px-3 py-2">输入</th>
            <th class="px-3 py-2">期望输出</th>
            <th class="px-3 py-2">Pass</th>
          </tr>
        </thead>
        <tbody v-if="currentCases.length" class="bg-white divide-y divide-gray-200">
          <tr v-for="c in currentCases" :key="c.id">
            <td class="px-3 py-2">{{ c.id }}</td>
            <td class="px-3 py-2 whitespace-pre-wrap">{{ c.desc }}</td>
            <td class="px-3 py-2 whitespace-pre-wrap">{{ c.input }}</td>
            <td class="px-3 py-2 whitespace-pre-wrap">{{ c.expected }}</td>
            <td class="px-3 py-2 text-center">
              <span v-if="c.status === true" class="text-green-600">✔️</span>
              <span v-else-if="c.status === false" class="text-red-600">❌</span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-4 text-gray-500">暂无测试用例</td>
          </tr>
        </tbody>
      </table>
    </div>

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

