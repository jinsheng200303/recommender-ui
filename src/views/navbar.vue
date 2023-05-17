<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><router-link to="/home">首页</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/course">课程</router-link></el-menu-item>
            <el-menu-item index="3"><router-link to="/test">测试</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/my">我的</router-link></el-menu-item>
        </el-menu>
    </div>
</template>

  <script>
    export default {
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
  </script>

  <style>
    .el-menu-demo{
        display: flex;
        justify-content: space-between;
        align-content: center;
        margin: 0;
    }
    a {
        font-size: 1.5rem;
    }
  </style>