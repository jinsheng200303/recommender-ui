<template>
  <el-menu
          text-color="#000"
          :default-openeds="['1', '3']"
          class="example"
          router
          style="
            background-color: rgb(166, 208, 211) ;
            height: 100%;
            color: #fff;
            overflow-x: hidden;
            border-right: none;
          "
        >
        <div style="height: 60px; line-height: 60px; text-align: center">
          <b style="color: black">后台管理系统</b>
        </div>
    <el-menu-item index="/ManagePage/HomePage">
      <template slot="title">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-menu"></i><span slot="title">系统管理</span>
      </template>
      <el-menu-item index="/ManagePage/userManagePage">
        <i class="el-icon-s-custom"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
};
</script>

<style scoped>

</style>