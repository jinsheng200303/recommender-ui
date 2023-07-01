<template>
  <div id="app">
    <!-- <el-container class="layout">
      <el-container class="el-main-box">
        <el-main class="main"> -->
          <!-- <el-container direction="vertical"> -->
            <!-- <el-header><navbar></navbar></el-header> -->
            <router-view></router-view>
            <!-- <el-footer>Footer</el-footer> -->
          <!-- </el-container> -->
        <!-- </el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script setup>
  import navbar from './views/navbar.vue';
</script>

<style scoped>
  /* .el-container{
    min-width: 650px;
  } */
  #app{
    height: 100%;
  }
</style>