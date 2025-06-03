<script setup lang="ts">
import {ref, onMounted} from 'vue';
import ControlPanel from './ControlPanel.vue';
import CodeSection from './CodeSection.vue';
import TestSection from './TestSection.vue';

// 状态变量
const activeTab = ref('code'); // 当前激活的标签
const problemData = ref<{
  codes: { version: string; description: string; code: string }[];
  tests: { method: string; testcases: string }[];
} | null>(null);
const currentDescription = ref('');
const currentCode = ref('');
const versions = ref([]);
const testMethods = ref([]);
const testcases = ref([]);
const results = ref([]);

// 引用 CodeSection 组件
const codeSectionRef = ref();

// 接收 problemKey 参数
const {problemKey} = defineProps({
  problemKey: {
    type: String,
    required: true,
  },
});

// 加载数据
const loadProblemData = async () => {
  const data = await fetch('/practice.json').then(async res => res.json());
  problemData.value = data[problemKey];
  if (problemData.value) {
    versions.value = problemData.value.codes.map((code) => code.version);
    testMethods.value = problemData.value.tests.map((test) => test.method);
    if (problemData.value.codes.length > 0) {
      await updateCodeSection(problemData.value.codes[0].version);
    }
  }
};

// 更新代码和描述
const updateCodeSection = async (version: string) => {
  const codeData = problemData.value.codes.find((code) => code.version === version);
  if (codeData) {
    currentDescription.value = codeData.description;
    await fetch(`/code/${codeData.code}`).then(async res => currentCode.value = await res.text());
    await codeSectionRef.value.highlightCode();
  }
};

// 加载测试用例
const loadTestcases = async (testcaseFile: string) => {
  const response = await fetch(`/test/${testcaseFile}`);
  const csvText = await response.text();
  const rows = csvText.trim().split('\n').map((row) => {
    return row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g).map((value) => value.trim().replace(/^"|"$/g, ''));
  });
  const headers = rows[0];
  testcases.value = rows.slice(1).map((row) => {
    const obj = {};
    row.forEach((value, index) => {
      obj[headers[index]] = value;
    });
    return obj;
  });
};

// 事件处理
const handleVersionChange = (version: string) => {
  updateCodeSection(version);
};
const handleMethodChange = (method: string) => {
  const testData = problemData.value.tests.find((test) => test.method === method);
  if (testData) {
    loadTestcases(testData.testcases);
  }
};
const handleRun = async () => {
  await fetch('http://localhost:5000/run_cpp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code: currentCode.value,
      input: testcases.value[1].input,
    }),
  }).then(async res => {
    console.log(await res.json());
  });
};

// 初始化加载
onMounted(async () => {
  await loadProblemData();
  if (problemData.value.tests.length > 0) {
    handleMethodChange(problemData.value.tests[0].method);
  }
});
</script>

<template>
  <div class="flex flex-col space-y-6 h-full overflow-y-hidden">
    <!-- Control Panel -->
    <ControlPanel
        :versions="versions"
        :testMethod="testMethods"
        @version-change="handleVersionChange"
        @method-change="handleMethodChange"
        @run="handleRun"
    />

    <div class="border-b border-gray-300 m-0">
      <button
          :class="[
          'px-4 py-2 font-semibold transition-all',
          activeTab === 'code' ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'
        ]"
          @click="activeTab = 'code';"
      >
        代码实现
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
    </div>

    <!-- Sections -->
    <div class="flex-1">
      <transition name="fade" mode="out-in">
        <div v-if="activeTab === 'code'" key="code">
          <CodeSection ref="codeSectionRef" :description="currentDescription" :code="currentCode"/>
        </div>
        <div v-else-if="activeTab==='test'" key="test">
          <TestSection :testcases="testcases" :results="results"/>
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
