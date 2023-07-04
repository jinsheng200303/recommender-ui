<template slot-scope="scope">
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="200px" style="height: 100%;box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
        <Aside />
      </el-aside>

      <el-container>
        <el-header style="font-size: 14px; border-bottom: 1px solid #ccc; line-height: 60px; text-align:right;">
          <Header />
        </el-header>

        <el-main>
          这是测试主页
        </el-main> 

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default { 
  data() {
    return {
      sideWidth: 200,
    };
  },
  components:{
    Aside,
    Header
  },
  
}
</script>