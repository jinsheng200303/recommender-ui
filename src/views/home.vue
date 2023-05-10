<template>
  <div>
    <div>hello world!</div>
    <span>{{ homeData }}</span>
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
