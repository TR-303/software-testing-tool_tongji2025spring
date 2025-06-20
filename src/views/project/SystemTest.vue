<script setup>
import {ref, onMounted} from "vue";

const rows = ref([]);
const headers = ref([]);
const loading = ref(true);
const headless = ref(true);
const passStatus = ref([]); // 存储每行的通过状态
const running = ref(false); // 是否正在运行

const fetchCsv = async () => {
  try {
    const res = await fetch("/systest.csv");
    const text = await res.text();
    const lines = text.trim().split(/\r?\n/);
    if (lines.length === 0) return;
    headers.value = lines[0].split(",");
    rows.value = lines.slice(1).map(line => {
      // 简单CSV分割，假设无逗号嵌套
      return line.split(",");
    });
    passStatus.value = Array(rows.value.length).fill(null); // 初始全部为null
  } finally {
    loading.value = false;
  }
};

const handleRun = () => {
  passStatus.value = Array(rows.value.length).fill(null);
  running.value = true;

  const url = `http://localhost:5001/run_systest?headed=${!headless.value}`;
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    const data = event.data;
    if (data === "[Cypress Finished]") {
      eventSource.close();
      running.value = false;
      return;
    }
    // 解析 [标识符] PASSED/FAILED
    const match = data.match(/^\[([^\]]+)\]\s+(PASSED|FAILED)$/);
    if (match) {
      const caseId = match[1];
      const result = match[2];
      // 找到“测试用例标识”字段是哪一列
      const idCol = headers.value.findIndex(h => h.includes("标识"));
      if (idCol === -1) return;
      // 找到对应行
      const rowIdx = rows.value.findIndex(row => row[idCol] === caseId);
      if (rowIdx !== -1) {
        passStatus.value[rowIdx] = result === "PASSED";
      }
    }
  };

  eventSource.onerror = () => {
    eventSource.close();
    running.value = false;
  };
};

onMounted(fetchCsv);
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-gray-900 mb-4 border-l-4 border-blue-500 pl-4">系统测试</h1>
    <div class="text-base text-gray-700 pl-6">
      系统测试用于验证整个软件系统的功能和性能是否满足需求。<br>
      以下为系统功能测试，包括14个功能测试，2个业务流测试，1个数据测试。<br>
    </div>
  </div>
  <div class="flex justify-end items-center px-10 gap-4">
    <label class="flex items-center text-sm text-gray-700 select-none cursor-pointer">
      <input type="checkbox" v-model="headless" class="accent-blue-600 w-4 h-4 mr-2"/>
      无头模式
    </label>
    <button
        @click="handleRun"
        :disabled="running"
        class="flex items-center px-4 py-2 bg-black text-white rounded transition-colors duration-150 hover:bg-gray-800 active:bg-gray-900 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg class="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <polygon points="4,3 16,10 4,17"/>
      </svg>
      运行系统测试
    </button>
  </div>
  <div class="overflow-x-auto p-10">
    <table class="min-w-full border-separate border-spacing-y-1 text-sm">
      <thead>
      <tr>
        <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">ID</th>
        <th v-for="(h, i) in headers" :key="i" class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">
          {{ h }}
        </th>
        <th class="text-left font-semibold text-gray-700 px-4 py-2 bg-gray-50">通过</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="loading">
        <td :colspan="headers.length + 2" class="text-center py-6 text-gray-400">加载中...</td>
      </tr>
      <tr v-for="(row, idx) in rows" :key="idx" class="even:bg-gray-50 hover:bg-gray-100 transition-colors">
        <td class="px-4 py-2 text-gray-800 whitespace-nowrap">{{ idx + 1 }}</td>
        <td v-for="(cell, j) in row" :key="j" class="px-4 py-2 text-gray-800 whitespace-nowrap">
          {{ cell }}
        </td>
        <td class="px-4 py-2">
          <template v-if="passStatus[idx] === true">
                <span class="inline-flex items-center text-green-600 font-bold">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </span>
          </template>
          <template v-else-if="passStatus[idx] === false">
                <span class="inline-flex items-center text-red-600 font-bold">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </span>
          </template>
          <template v-else>
            <span class="text-gray-500">-</span>
          </template>
        </td>
      </tr>
      <tr v-if="!loading && rows.length === 0">
        <td :colspan="headers.length + 2" class="text-center py-6 text-gray-400">暂无数据</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>
