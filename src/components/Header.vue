<template>
  <div style="line-height: 60px; display: flex">
    <div style="flex: 1;">
      <!-- <span :class="collapseBtnClass" style="cursor: pointer; font-size: 18px" @click="collapse"></span> -->
      <el-breadcrumb separator="/" style="float:left;line-height: 60px;display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="'/'">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-dropdown style="width: 70px; cursor: pointer">
      <span>{{ userInfo.userName }}</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
      <el-dropdown-menu slot="dropdown" style="width: 100px; text-align: center">
        <el-dropdown-item style="font-size: 14px; padding: 5px 0">
          <el-button @click="signOut">退出登录</el-button></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    
  </div>
</template>

<script>
import { getUserInfoById } from '@/api/userApis.js'

export default {
  name: "Header",
  props: {
    
  },
  data() {
        return {
            userInfo: {
            },
            roleId: 0,
        }
    },
  computed: {
    currentPathName () {
      this.getInfo();
      return this.$store.state.currentPathName;　　//需要监听的数据
    },
    
    // watch: {
    //   currentPathName (newVal, oldVal) {
    //     console.log(newVal)
    //   }
    // },
  },
  methods: {
    getUserRole(){
            if(this.roleId == 1){
                return "学 生";
            }else if(this.roleId == 2){
                return "教 师"
            }
        },
        getInfo(){
            this.getUserRole()
            let userId = JSON.parse(window.localStorage.getItem("userInfo")).userId;
            this.roleId = JSON.parse(window.localStorage.getItem("userInfo")).roleId;
            getUserInfoById(userId)
            .then((res) => {
                console.log(JSON.stringify(res.data))
                this.userInfo = res.data
            })
        },
        signOut(){
            this.$confirm("确定退出?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                window.localStorage.clear();
                sessionStorage.clear();
                this.$router.push('/login');
            })
        },
    },

}
</script>

<style scoped>

</style>
