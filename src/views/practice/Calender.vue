<script setup>
import PracticeMain from "@/components/practice/PracticeMain.vue";
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-extrabold mb-3 text-gray-800 border-l-4 border-blue-500 pl-4">
      2. 万年历问题
    </h1>
    <div class="text-base text-gray-700 leading-relaxed pl-6 pr-6  mb-2">
      输入年，月，日，输出该日的下一天。业务规定的时间范围是1900年到2100年。<br>

      例如：<br>
      <ul class="bg-gray-100 rounded p-2 my-1">
        <li><span class="font-semibold text-blue-700">输入：</span>2004 2 28</li>
        <li><span class="font-semibold text-green-700">输出：</span>2004年2月29日</li>
      </ul>

      <br>
    </div>
  </div>
  <practice-main problem-key="calender"/>
</template>

<style scoped>

</style>