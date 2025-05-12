<script setup>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {onMounted} from "vue";

const {description, code} = defineProps({
  description: {type: String, required: true},
  code: {type: String, required: true},
});

const highlightCode = async () => {
  if (!code) return;
  hljs.highlightAll();
}

onMounted(highlightCode);

defineExpose({highlightCode});
</script>

<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold text-gray-800">描述</h2>
    <p class="mt-2 text-gray-700">{{ description }}</p>
    <hr class="my-4 border-gray-300"/>
    <h2 class="text-lg font-semibold text-gray-800">代码</h2>
    <pre class="bg-gray-100 overflow-auto text-sm text-gray-900">
      <code class="language-cpp">{{ code }}</code>
    </pre>
  </div>
</template>
