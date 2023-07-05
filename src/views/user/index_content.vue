<template>
    <el-container direction="vertical">
        <el-header><navbar></navbar></el-header>
        <router-view></router-view>
    </el-container>
</template>

<script>
  import navbar from './navbar.vue'
  export default {
    name: "index_content",
    components: {
        navbar,
    },
  }
</script>

<style scoped>
    .el-container{
        min-width: 1050px;
    }
</style>