<template>
    <div class="test-card-area">
      <el-card class="box-card" v-for="p in 20" :key="p">
        <div v-for="o in 1" :key="o" class="text item">
          {{'列表内容 ' + o }}
          <el-button type="primary" size="medium" style="float: right;">主要按钮</el-button>
        </div>
      </el-card>
    </div>
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
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 95%;
    margin-bottom: 20px;
    min-width: 250px;
  }
  /* 添加内容 */
  .test-card-area{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .box-card:hover{
    transform: translateY(-4px);
    box-shadow: 0 5px 10px -2px rgba(0, 0, 0, .3);
  }
</style>