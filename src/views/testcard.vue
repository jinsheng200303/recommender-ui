<template>
      <el-card class="box-card">
        <div class="text item">
          {{'列表内容 '}}
          <el-button type="primary" size="small" style="float: right;">主要按钮</el-button>
        </div>
      </el-card>
</template>

<script>
export default {
    methods: {
      
    },
}
</script>

<style scoped>
  .text {
    font-size: 1.3rem;
  }

  .box-card {
    width: 95%;
    margin: 20px auto;
    min-width: 250px;
    height: 67px;
  }
  /* 添加内容 */
  .box-card:hover{
    transform: translateY(-8px);
    box-shadow: 0 5px 10px -2px rgba(0, 0, 0, .3);
  }
</style>