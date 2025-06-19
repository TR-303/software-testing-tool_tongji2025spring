<script setup>
import { ref, watch } from 'vue';
import ControlPanel from '@/components/practice/ControlPanel.vue';
import TestMethodSection from '@/components/practice/TestMethodSection.vue';
import TestSection from '@/components/practice/TestSection.vue';
import DataStatistics from '@/components/practice/DataStatistics.vue';

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

const classNames = Object.keys(classes);
const methodOptions = ref([]);
const selectedClass = ref('');
const selectedMethod = ref('');
const activeTab = ref('method');
const results = ref([]);

watch(selectedClass, (newVal) => {
  methodOptions.value = classes[newVal] || [];
  selectedMethod.value = methodOptions.value[0] || '';
});

function handleClassChange(cls) {
  selectedClass.value = cls;
  results.value = [];
}

function handleMethodChange(method) {
  selectedMethod.value = method;
  results.value = [];
}

function runTest() {
  results.value = [{ actual: 'pass', passed: true }];
  activeTab.value = 'test';
}
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-extrabold mb-3 text-gray-800 border-l-4 border-blue-500 pl-4">
      单元测试
    </h1>
    <div class="text-base text-gray-700 leading-relaxed pl-6 pr-6 mb-2">
      选择类和方法，点击运行开始单元测试。
    </div>
  </div>
  <div class="flex flex-col space-y-6 h-full">
    <ControlPanel
      :versions="classNames"
      :testMethod="methodOptions"
      @version-change="handleClassChange"
      @method-change="handleMethodChange"
      @run="runTest"
    />
    <div class="border-b border-gray-300 m-0">
      <button
        :class="[
          'px-4 py-2 font-semibold transition-all',
          activeTab === 'method' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
        ]"
        @click="activeTab = 'method'"
      >
        测试方法
      </button>
      <button
        :class="[
          'px-4 py-2 font-semibold transition-all',
          activeTab === 'test' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
        ]"
        @click="activeTab = 'test'"
      >
        测试结果
      </button>
      <button
        :class="[
          'px-4 py-2 font-semibold transition-all',
          activeTab === 'stats' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
        ]"
        @click="activeTab = 'stats'"
      >
        数据统计
      </button>
    </div>
    <div class="flex-1">
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'method'" key="method">
          <TestMethodSection :description="`执行 ${selectedClass}.${selectedMethod} 的单元测试`" />
        </div>
        <div v-else-if="activeTab === 'test'" key="test">
          <TestSection :testcases="[]" :results="results" />
        </div>
        <div v-else-if="activeTab === 'stats'" key="stats">
          <DataStatistics :results="results" :totalCases="results.length" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* noinspection CssUnusedSymbol */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
/* noinspection CssUnusedSymbol */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
