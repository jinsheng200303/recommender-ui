<template>
  <div>
    <el-main>
      <div class="index-content">
          
      </div>
      <el-footer>Footer</el-footer>
    </el-main>
  </div>
</template>

<script>
import { getTestData1 } from "@/api/graphApis.js";
import coursecard from './coursecard.vue' 

export default {
  name: "home",
  components: {
    coursecard
  },
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
    // //请求接口数据
    // getTestData1().then((res) => {
    //     console.log(res);
    // });
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
.index-content{
  /* width: 100%;
  height: 1500px; */
  background-color: rgb(250, 250, 250);
}
</style>