<template>
  <!-- <div class="course-card-area"> -->
    <el-tooltip placement="top" content="dsjvsdhb">
      <el-card :body-style="{ padding: '20px' }" >
          <img src="../assets/image1.jpg" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
    </el-tooltip>
  <!-- </div> -->
</template>

<script>
  export default {
    data() {
      return {
        currentDate: new Date()
      };
    },
    methods: {
      
    },
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  /* 添加内容 */
  /* .course-card-area{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  } */
  .el-card{
    margin-bottom: 40px;
    width: 300px;
  }
  .el-card:hover{
    transform: translateY(-8px);
    box-shadow: 0 5px 15px -2px rgba(0, 0, 0, .3);
  }
</style>