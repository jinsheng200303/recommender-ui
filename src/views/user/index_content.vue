<template>
    <el-container direction="vertical">
        <el-header><navbar></navbar></el-header>
        <router-view></router-view>
        <login_register></login_register>
    </el-container>
</template>

<script>
  import navbar from './navbar.vue'
  import login_register from './login_register.vue';
  export default {
    name: "index_content",
    components: {
        navbar,
        login_register,
    },
  }
</script>

<style scoped>
    .el-container{
        min-width: 1050px;
    }
</style>