<script setup>
import {computed} from 'vue';

// 接收 props
const {testcases, results} = defineProps({
  testcases: {
    type: Array,
    required: true,
  },
  results: {
    type: Array,
    required: false,
    default: null,
  },
});

// 计算通过数和用例数
const totalCases = computed(() => testcases.length);
const passedCases = computed(() =>
    results?.length > 0 ? results.filter((result) => result.passed).length : '-'
);

// 获取表头
const headers = computed(() => {
  if (testcases.length > 0) {
    return Object.keys(testcases[0]);
  }
  return [];
});
</script>

<template>
  <div class="space-y-4 p-4">
    <!-- 通过数/用例数 -->
    <div class="text-base font-medium text-gray-800">
      通过数/用例数: {{ passedCases }} / {{ totalCases }}
    </div>

    <!-- 表格 -->
    <div class="overflow-x-auto">
      <table class="min-w-full border-collapse text-left text-sm text-gray-700">
        <thead class="bg-gray-50 text-gray-800">
        <tr>
          <th class="px-4 py-2 font-medium border-b border-gray-300">ID</th>
          <th
              v-for="header in headers"
              :key="header"
              class="px-4 py-2 font-medium border-b border-gray-300"
          >
            {{ header }}
          </th>
          <th class="px-4 py-2 font-medium border-b border-gray-300">actual</th>
          <th class="px-4 py-2 font-medium border-b border-gray-300">passed</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(testcase, index) in testcases"
            :key="index"
            class="hover:bg-gray-100 transition-colors"
        >
          <td class="px-4 py-2 border-b border-gray-200">{{ index + 1 }}</td>
          <td
              v-for="header in headers"
              :key="header"
              class="px-4 py-2 border-b border-gray-200"
          >
            {{ testcase[header] }}
          </td>
          <td class="px-4 py-2 border-b border-gray-200">
            {{ results?.[index]?.actual || '-' }}
          </td>
          <td
              class="px-4 py-2 border-b border-gray-200 font-semibold"
              :class="results?.[index]?.passed ? 'text-green-600' : 'text-red-600'"
          >
            {{ results?.[index]?.passed !== undefined ? (results[index].passed ? '通过' : '失败') : '-' }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
