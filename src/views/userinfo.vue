<template>
    <div>
        <el-container>
            <el-container direction="horizontal" class="user-info-container">
                <el-aside width="25%">
                    <img src="../assets/image1.jpg" alt="" class="image">
                </el-aside>
                    <el-main>
                        <el-descriptions class="margin-top" title="个人信息" :column="1" :border="true">
                            <template slot="extra">
                                <el-button type="primary" size="small">操作</el-button>
                            </template>
                            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                            <el-descriptions-item label="备注">
                                <el-tag size="small">学校</el-tag>
                            </el-descriptions-item>
                            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
                            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                            <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                            <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                            <el-descriptions-item label="居住地">苏州市</el-descriptions-item>
                        </el-descriptions>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </template>

<script>
export default {
    methods: {
        
    },
}
</script>

<style scoped>
.el-aside {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 300px;
}
.el-main {
    padding: 40px;
}
.image {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    margin: 20px;
    box-shadow: 0 5px 15px -2px rgba(0, 0, 0, .3);
}
.el-descriptions__body {
    background-color: #E9EEF3;
}
@media(max-width: 950px){
    .user-info-container{
        display: flex;
        flex-direction: column;
    }
    .el-aside {
        min-width: 100%;
    }
}
</style>