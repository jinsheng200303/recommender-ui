<template>
    <el-card :body-style="{ padding: '0px' }">
        <img src="../assets/image1.jpg" class="image">
        <div class="class-card-info">
            <el-descriptions class="margin-top" title="个人信息" :column="1" size="medium">
                <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
                <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
                <el-descriptions-item label="备注">
                    <el-tag size="small">学校</el-tag>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <el-button type="primary" class="button" size="small">操作按钮</el-button>
    </el-card>
</template>

<script>
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      
    },
  }
</script>

<style scoped>
  .image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
  }

  /* 添加内容 */
  .el-card{
    margin: 20px;
    width: 300px;
  }
  .el-card:hover{
    transform: translateY(-8px);
    box-shadow: 0 5px 15px -2px rgba(0, 0, 0, .3);
  }
  .class-card-info{
    padding: 14px;
  }
  .button{
    float: right;
    margin-right: 14px;
    margin-bottom: 14px;
  }
</style>
