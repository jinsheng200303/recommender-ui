<template>
  <div class="course-card-area">
    <el-card :body-style="{ padding: '20px' }" v-for="o in 25" :key="o">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
  </div>
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
  .course-card-area{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .el-card{
    margin: 20px;
    width: 300px;
  }
  .el-card:hover{
    transform: translateY(-8px);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .3);
  }
</style>