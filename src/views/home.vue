<template>
  <div>
    <el-container>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import { getTestData1 } from "@/api/graphApis.js";

export default {
  name: "home",
  components: { },
  data() {
    return { homeData: "" };
  },
  methods: {
    test() {
      console.log("1111")
    }
  },
  created() {
    console.log("Home created!");
    this.homeData="1111";
  },
  mounted() {
    console.log("mounted!")
    //请求接口数据
    getTestData1().then((res) => {
        console.log(res);
    });
  },
};

</script>

<style scoped>
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: calc(100vh - 120px);
  }
</style>