<template>
    <div>
        <el-header height="auto">
            <el-input
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="input">
            </el-input>
            <div class="el-header-right">
                <el-button type="primary" size="small">主要按钮</el-button>
                <el-button type="primary" size="small">主要按钮</el-button>
            </div>
        </el-header>
  </div>
</template>

<script>
  export default {
    name: 'mainnav',
    methods: {
      
    },
    data() {
        return {
            input: ''
        }
    }
  }
</script>

<style scoped>
    .el-header{
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-between;
    }
    .el-input{
        width: 25%;
        max-width: 350px;
        min-width: 200px;
        margin: 10px 4.16%;
    }
    .el-header-right{
        display: flex;
        align-content: center;
        justify-content: space-between;
        margin: 10px 4.16%;
    }
</style>