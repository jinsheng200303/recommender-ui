<template>
    <div>
      <el-container direction="horizontal">
        <el-aside width="25%">
          <asidenav></asidenav>
        </el-aside>
        <el-main style="padding: 0;">
          <mainnav></mainnav>
            <el-main class="test-card-area">
              <testcard v-for="p in 30" :key="p"></testcard>
            </el-main>
        </el-main>
      </el-container>
    </div>
</template>

  <script>
    import asidenav from './asidenav.vue';
    import mainnav from './mainnav.vue';
    import testcard from './testcard.vue';
    export default {
      components:{
        asidenav,
        mainnav,
        testcard
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
    height: calc(100vh - 60px);
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: calc(100vh - 60px);
  }
  .test-card-area{
    overflow-y: scroll;
    /* display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center; */
    height: calc(100vh - 120px);
    background: rgb(250, 250, 250);
  }
 </style>