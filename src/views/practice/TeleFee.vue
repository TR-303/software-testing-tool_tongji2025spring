<script setup>
import PracticeMain from "@/components/practice/PracticeMain.vue";
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-extrabold mb-3 text-gray-800 border-l-4 border-blue-500 pl-4">
      7. 电信收费
    </h1>
    <div class="text-base text-gray-700 leading-relaxed pl-6 pr-6 mb-2">
      研究一个与我们的生活息息相关的电信收费问题系统，需求描述如下：<br/>
      A. 每月的电话总费用=基本月租费+折扣后的实际的通话费，如果没有折扣则按实际通话费计算，基本月租费为25元，每分钟通话费为0.15元。<br/>
      B. 实际通话费是否有折扣与当月的通话时间（分钟）和本年度至本月的累计未按时缴费的次数有关。<br/>
      C. 当月的通话分钟数和折扣比例及本年度未按时缴费次数之间有直接的对应关系，如果本年度的未按时缴费的次数超过本月通话时间所对应的容许值则免于折扣，并按实际的通话费计算。<br/>
      D. 通话时间和折扣比例及未按时缴费次数的关系为：<br/>

      <table class="table-auto border-collapse border border-gray-300 w-full text-center mt-2">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">本月通话的分钟数</th>
            <th class="border border-gray-300 px-4 py-2">通话时间段的最大容许不按时缴费次数</th>
            <th class="border border-gray-300 px-4 py-2">通话时间段的折扣率</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">0 &lt; 通话时间 ≤ 60</td>
            <td class="border border-gray-300 px-4 py-2">1</td>
            <td class="border border-gray-300 px-4 py-2">1.0%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">60 &lt; 通话时间 ≤ 120</td>
            <td class="border border-gray-300 px-4 py-2">2</td>
            <td class="border border-gray-300 px-4 py-2">1.5%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">120 &lt; 通话时间 ≤ 180</td>
            <td class="border border-gray-300 px-4 py-2">3</td>
            <td class="border border-gray-300 px-4 py-2">2.0%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">180 &lt; 通话时间 ≤ 300</td>
            <td class="border border-gray-300 px-4 py-2">3</td>
            <td class="border border-gray-300 px-4 py-2">2.5%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">300 &lt; 通话时间</td>
            <td class="border border-gray-300 px-4 py-2">6</td>
            <td class="border border-gray-300 px-4 py-2">3.0%</td>
          </tr>
        </tbody>
      </table>
      例如：<br>
      <ul class="bg-gray-100 rounded p-2 my-1">
        <li><span class="font-semibold text-blue-700">输入：</span>60 1</li>
        <li><span class="font-semibold text-green-700">输出：</span>33.91</li>
      </ul>
    </div>
  </div>
  <practice-main problem-key="telefee" />
</template>

<style scoped>
</style>
