<script setup>
import PracticeMain from "@/components/practice/PracticeMain.vue";
</script>

<template>
    <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-extrabold mb-3 text-gray-800 border-l-4 border-blue-500 pl-4">
      1. 三角形分类
    </h1>
    <div class="text-base text-gray-700 leading-relaxed pl-6 pr-6  mb-2">
      输入三条边，判断三角形的类型（等边、等腰、普通或无法构成三角形）。<br>

      例如：<br>
      <ul class="bg-gray-100 rounded p-2 my-1">
        <li><span class="font-semibold text-blue-700">输入：</span>3  4  5</li>
        <li><span class="font-semibold text-green-700">输出：</span>普通三角形</li>
      </ul>

      在此处可以添加更多描述。<br>
    </div>
  </div>
  <practice-main problem-key="triangle"/>
</template>

<style scoped>
</style>
