<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            :router="true">
            <el-menu-item index="/index_content/home">首页</el-menu-item>
            <el-menu-item index="/index_content/course">课堂</el-menu-item>
            <el-menu-item index="/index_content/test">测试</el-menu-item>
            <el-menu-item index="/index_content/my">我的</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
    data() {
        return {
                activeIndex: "/index_content/home" 
            };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            sessionStorage.setItem("activeIndex",key);
        }
    },
    created() {
        if(sessionStorage.getItem("activeIndex") == null){
            this.activeIndex = "/index_content/home";
        }else{
            this.activeIndex = sessionStorage.getItem("activeIndex");
        }
    },
}
</script>

<style scoped="scoped">
    .el-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-menu-item {
        font-size: 1.3rem;
    }
</style>