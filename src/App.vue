<script setup>
import SideBar from "./components/main/SideBar.vue";
</script>

<template>
  <div class="flex h-screen">
    <!-- 左侧 Sidebar -->
    <SideBar/>

    <!-- 右侧主内容区域 -->
    <div class="flex-1 bg-gray-100 h-screen overflow-y-auto">
      <router-view/>
    </div>
  </div>
</template>
