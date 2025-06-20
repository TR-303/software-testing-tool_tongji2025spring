<script setup>
import PracticeMain from "@/components/practice/PracticeMain.vue";
</script>

<template>
  <div class="mb-8 p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-extrabold mb-3 text-gray-800 border-l-4 border-blue-500 pl-4">
      4. 电脑销售系统
    </h1>
    <div class="text-base text-gray-700 leading-relaxed pl-6 pr-6 mb-2">
      电脑销售系统，主机（25￥单位价格，每月最多销售的数量为70），显示器（30￥单位价格，每月最多销售数量为80），外设（45￥单位价格，每月最多销售的数量为90）；每个销售员每月至少销售一台完整的机器，当系统的主机这个变量接受到-1值的时候，系统自动统计该销售员本月的销售总额。当销售额小于等于1000（包括1000）按照10%提佣金，当销售额在1000-1800之间（包括1800）的时候按照15%提佣金，当销售额大于1800时按照20%提佣金。（用边界值方法分析和设计测试用例）
      <br/><br/>
      <table class="table-auto border-collapse border border-gray-300 w-full text-center mt-2">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">配件</th>
            <th class="border border-gray-300 px-4 py-2">单位价格（￥）</th>
            <th class="border border-gray-300 px-4 py-2">每月最多销售数量</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">主机</td>
            <td class="border border-gray-300 px-4 py-2">25</td>
            <td class="border border-gray-300 px-4 py-2">70</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">显示器</td>
            <td class="border border-gray-300 px-4 py-2">30</td>
            <td class="border border-gray-300 px-4 py-2">80</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">外设</td>
            <td class="border border-gray-300 px-4 py-2">45</td>
            <td class="border border-gray-300 px-4 py-2">90</td>
          </tr>
        </tbody>
      </table>
      <br/>
      <table class="table-auto border-collapse border border-gray-300 w-full text-center mt-2">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2">销售额区间（￥）</th>
            <th class="border border-gray-300 px-4 py-2">提佣金比例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2">0 &lt;= 销售额 ≤ 1000</td>
            <td class="border border-gray-300 px-4 py-2">10%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">1000 &lt; 销售额 ≤ 1800</td>
            <td class="border border-gray-300 px-4 py-2">15%</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2">1800 &lt; 销售额</td>
            <td class="border border-gray-300 px-4 py-2">20%</td>
          </tr>
        </tbody>
      </table>
      <br/>
      例如：<br>
      <ul class="bg-gray-100 rounded p-2 my-1">
        <li><span class="font-semibold text-blue-700">输入：</span>1 1 1 -1</li>
        <li><span class="font-semibold text-green-700">输出：</span>销售总额：100，佣金：10</li>
      </ul>
    </div>
  </div>
  <practice-main problem-key="computer_sales" />
</template>

<style scoped>
</style>
