<template>
    <div>
      <el-main>
        <div class="home-content">
        </div>
        <el-footer>aaa</el-footer>
      </el-main>
    </div>
  </template>
  
  <script>
  export default {
    name: "home",
    data() {
      return {
         homeData: "" 
        };
    },
    methods: {
      
    },
    created() {
      
    },
    mounted() {

    },
  };
  
  </script>
  
  <style scoped > 
  .el-main {
      background-color: #E9EEF3;
      color: #333;
      padding: 0;
  }
  .el-footer {
      background-color: #B3C0D1;
      color: #333;
      padding: 0;
  }
  .home-content{
    /* width: 100%;
    height: 1500px; */
    background-color: rgb(250, 250, 250);
  }
  </style>