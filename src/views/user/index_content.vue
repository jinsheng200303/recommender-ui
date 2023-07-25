<template>
    <el-container direction="vertical">
        <el-header><navbar></navbar></el-header>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <component :is="componentName"></component>
    </el-container>
</template>

<script>
  import navbar from './navbar.vue'
  import personStylePaperDialog from "@/views/user/personStylePaperDialog.vue";
  import { getPersonStyleById } from  '@/api/personStylePaperApis'
  export default {
    name: "index_content",
    components: {
        navbar,
        personStylePaperDialog,
    },
    data() {
      return {
        componentName: null,
      };
    },
    created() {
      let userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      getPersonStyleById(userId).then((res) => {
        if(res.code == 200){
          if(res.data.records.length === 0 || res.data.records[0].answers === null){
            this.componentName = "personStylePaperDialog";
          }
        }else {
          this.$message.error(res.msg);
        }
      })
    }
  }
</script>

<style scoped>
    .el-container{
        min-width: 1050px;
    }
</style>