<template>
  <!-- <div id="app"> -->
  <el-container class="layout">
    <el-container class="el-main-box">
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <!-- </div> -->
</template>

<script setup>

</script>

<style scoped>
.aside {
  background-color: #021132;
  overflow: hidden;
}

.el-main-box{
  height: calc(100vh);
}

.main {
  width: 100%;
  min-height: calc(95vh);
  background-color: rgb(245, 245, 245);
}

.pagination {
  margin-right: 2%;
  margin-top: 1%;
  margin-bottom: 1%;
  text-align: right;
}

</style>