<template>
    <div>
      <el-main>
        <div class="home-content">
            <el-button type="primary" size="small" @click="show_login">登录</el-button>
            <login_register ref="login_dialog"></login_register>
        </div>
        <el-footer>Footer</el-footer>
      </el-main>
    </div>
  </template>
  
  <script>
  import login_register from "./login_register.vue";
  export default {
    name: "home",
    components: {
      login_register
    },
    data() {
      return {
         homeData: "" 
        };
    },
    methods: {
      show_login() {
        this.$nextTick(()=>{
          this.$refs.login_dialog.dialogVisible();
        })
      }
    },
    created() {
      // console.log("Home created!");
    },
    mounted() {
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
  .home-content{
    /* width: 100%;
    height: 1500px; */
    background-color: rgb(250, 250, 250);
  }
  </style>