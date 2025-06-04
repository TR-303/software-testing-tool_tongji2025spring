<script setup> 
import PracticeMain from "@/components/practice/PracticeMain.vue";
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-extrabold mb-3 text-gray-800 border-l-4 border-blue-500 pl-4">
      16. 销售佣金计算
    </h1>
    <div class="text-base text-gray-700 leading-relaxed pl-6 pr-6  mb-2">
      根据销售员的年销售额、请假天数和现金到账比例，计算其佣金。<br>
      规则如下：<br>
      <ul class="bg-gray-100 rounded p-2 my-1">
        <li>若年销售额 &gt; 200 万 RMB，且请假天数 ≤ 10 天，现金到账比例 ≥ 60%，佣金系数为 7</li>
        <li>若年销售额 &gt; 200 万 RMB，且请假天数 ≤ 10 天，现金到账比例 &lt; 60%，无佣金</li>
        <li>其他情况：现金到账比例 ≤ 85%，佣金系数为 6；现金到账比例 &gt; 85%，佣金系数为 5</li>
      </ul>
      佣金 = 年销售额 ÷ 佣金系数。<br>
      例如：<br>
      <ul class="bg-gray-100 rounded p-2 my-1">
        <li><span class="font-semibold text-blue-700">输入：</span>2500000 8 0.65</li>
        <li><span class="font-semibold text-green-700">输出：</span>佣金为357142.86元</li>
      </ul>

    </div>
  </div>
  <practice-main problem-key="whitebox"/>
</template>

<style scoped>
</style>
