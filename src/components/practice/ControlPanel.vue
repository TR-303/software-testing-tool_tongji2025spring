<script setup>
import { ref, watch } from 'vue';

// 接收 props
const { versions, testMethod } = defineProps({
  versions:   { type: Array, required: true },
  testMethod: { type: Array, required: true },
});

// 定义事件
const emit = defineEmits(['version-change', 'method-change', 'run']);

// 绑定的值
const selectedVersion = ref('');
const selectedMethod = ref('');
const isRunDisabled = ref(true);

// 监听 props 变化（含初始值）
watch(
    [() => versions, () => testMethod],
    ([newVersions, newMethods]) => {
      if (newVersions.length) {
        selectedVersion.value = newVersions[0];
        emit('version-change', selectedVersion.value);
      }
      if (newMethods.length) {
        selectedMethod.value = newMethods[0];
        emit('method-change', selectedMethod.value);
      }
      updateRunButtonState();
    },
    { immediate: true }
);

// 更新运行按钮状态
function updateRunButtonState() {
  isRunDisabled.value = !selectedVersion.value || !selectedMethod.value;
}

// 事件处理
function handleVersionChange(e) {
  selectedVersion.value = e.target.value;
  emit('version-change', selectedVersion.value);
  updateRunButtonState();
}
function handleMethodChange(e) {
  selectedMethod.value = e.target.value;
  emit('method-change', selectedMethod.value);
  updateRunButtonState();
}
function handleRunClick() {
  emit('run', { version: selectedVersion.value, method: selectedMethod.value });
}
</script>

<template>
  <div class="flex items-center gap-4 w-full px-4 py-2">
    <!-- 版本号下拉框 -->
    <select
        v-model="selectedVersion"
        @change="handleVersionChange"
        class="flex-[3] px-4 py-2 bg-transparent text-black border-b border-gray-400 focus:outline-none focus:border-black"
    >
      <option v-for="v in versions" :key="v" :value="v">{{ v }}</option>
    </select>

    <!-- 测试方法下拉框 -->
    <select
        v-model="selectedMethod"
        @change="handleMethodChange"
        class="flex-[3] px-4 py-2 bg-transparent text-black border-b border-gray-400 focus:outline-none focus:border-black"
    >
      <option v-for="m in testMethod" :key="m" :value="m">{{ m }}</option>
    </select>

    <!-- 运行按钮 -->
    <button
        @click="handleRunClick"
        :disabled="isRunDisabled"
        class="flex-[1] px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
    >
      ▷ 运行
    </button>
  </div>
</template>
