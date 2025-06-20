<template>
  <div class="test-results">
    <h2>🧪 单元测试结果</h2>
    <table>
      <thead>
        <tr>
          <th>类名</th>
          <th>方法名</th>
          <th>状态</th>
          <th>信息</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(test, index) in testResults" :key="index">
          <td>{{ test.className }}</td>
          <td>{{ test.name }}</td>
          <td :style="{ color: test.status === 'passed' ? 'green' : 'red' }">
            {{ test.status }}
          </td>
          <td>{{ test.message || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const testResults = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:8080/api/test-report/results')
  testResults.value = await res.json()
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
