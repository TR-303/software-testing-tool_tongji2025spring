<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const routes = router.options.routes;

// 控制展开状态
const isPracticeOpen = ref(false);
const isProjectOpen = ref(false);

// 获取课程练习的子路由
const practiceRoutes = routes.find(route => route.name === "课程练习")?.children || [];

// 跳转到指定路由
const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="w-64 h-screen bg-gray-800 text-white flex flex-col">
    <!-- 顶部 Logo 和标题 -->
    <div class="flex items-center justify-between p-4 border-b border-gray-700">
      <div class="w-8 h-8 bg-gray-600 rounded-full"></div> <!-- Logo 占位 -->
      <div class="text-xl font-bold">软件测试</div>
    </div>

    <!-- 课程练习 -->
    <div>
      <button
          class="w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center"
          @click="isPracticeOpen = !isPracticeOpen"
      >
        <span>课程练习</span>
        <span>{{ isPracticeOpen ? '▲' : '▼' }}</span>
      </button>
      <div v-if="isPracticeOpen" class="pl-6">
        <ul>
          <li
              v-for="route in practiceRoutes"
              :key="route.path"
              class="py-2 px-2 rounded-md cursor-pointer hover:bg-gray-700 hover:text-white transition"
              @click="navigateTo(`/practice/${route.path}`)"
          >
            <span>{{ route.name }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 项目测试 -->
    <div>
      <button
          class="w-full text-left px-4 py-2 hover:bg-gray-700 flex justify-between items-center"
          @click="isProjectOpen = !isProjectOpen"
      >
        <span>项目测试</span>
        <span>{{ isProjectOpen ? '▲' : '▼' }}</span>
      </button>
      <div v-if="isProjectOpen" class="pl-6">
        <p class="text-gray-400">暂无内容</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
