<script setup>
import {ref, watch, computed} from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart, ArcElement, Tooltip, Legend
} from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  results: { type: Array, required: false, default: null },
  totalCases: { type: Number, required: true }
});

const chartData = ref({
  labels: ['\u901a\u8fc7', '\u672a\u901a\u8fc7'],
  datasets: [
    {
      data: [props.totalCases],
      backgroundColor: ['#F44336'],
      borderWidth: 0
    }
  ]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};

const hasResults = computed(() => props.results && props.results.length > 0);

watch(
  () => props.results,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      const pass = newVal.filter(r => r.passed).length;
      if (pass === props.totalCases) {
        chartData.value.labels = ['\u901a\u8fc7'];
        chartData.value.datasets[0].data = [pass];
        chartData.value.datasets[0].backgroundColor = ['#4CAF50'];
      } else if (pass === 0) {
        chartData.value.labels = ['\u672a\u901a\u8fc7'];
        chartData.value.datasets[0].data = [props.totalCases];
        chartData.value.datasets[0].backgroundColor = ['#F44336'];
      } else {
        chartData.value.labels = ['\u901a\u8fc7', '\u672a\u901a\u8fc7'];
        chartData.value.datasets[0].data = [pass, props.totalCases - pass];
        chartData.value.datasets[0].backgroundColor = ['#4CAF50', '#F44336'];
      }
    } else {
      chartData.value.labels = ['\u672a\u901a\u8fc7'];
      chartData.value.datasets[0].data = [props.totalCases];
      chartData.value.datasets[0].backgroundColor = ['#F44336'];
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="p-4 flex justify-center">
    <div v-if="hasResults" class="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-64">
      <Pie :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md h-64 text-gray-500">
      请先进行测试
    </div>
  </div>
</template>

<style scoped>
</style>
