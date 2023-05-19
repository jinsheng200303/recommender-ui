<template>
    <div>
        <el-container direction="vertical">
            <el-container direction="horizontal">
                <el-main>Main</el-main>
                <el-aside width="25%">Aside</el-aside>
            </el-container>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>

<script>

</script>

<style scoped>
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        min-width: 125px;
        max-width: 250px;
        height: calc(50vh - 60px);
    }
  
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: calc(50vh - 60px);
    }
</style>