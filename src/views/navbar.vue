<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            :router="true">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/course">课程</el-menu-item>
            <el-menu-item index="/test">测试</el-menu-item>
            <el-menu-item index="/my">我的</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {activeIndex: '/home'};
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped="scoped">
    .el-menu {
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .el-menu-item {
        font-size: 1.3rem;
    }
</style>