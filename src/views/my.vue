<template>
    <div>
      <el-container direction="horizontal">
        <el-aside width="25%">
          <asidenav></asidenav>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </div>
</template>

  <script>
    import asidenav from '../views/asidenav.vue';
    export default {
      components:{
        asidenav
      }
    }
  </script>

  <style scoped>
    .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    min-width: 125px;
    max-width: 250px;
    height: calc(100vh - 120px);
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    height: calc(100vh - 120px);
  }
 </style>