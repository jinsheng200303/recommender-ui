<template>
  <div class="container">
    <div class="header" @click="goBackRouter"><-学 生</div>
    <div class="staticsChart" id="echartsGraph">
    </div>
    <div class="button-area">
      <el-button type="primary" @click="sub">上一页</el-button>
      <el-button type="primary" @click="add">下一页</el-button>
    </div>
  </div>

</template>

<script>
import { getDinaById } from '@/api/userEchartsApis'
import my from "@/views/user/my.vue";
export default {
  data(){
    return{
      studentChart: '',
      option: {},
      name: [],
      value: [],
      start: 0,
      end: 5,
    }
  },
  methods: {
    add(){
      this.start+=5;
      this.end+=5;
      this.drawKnowledgeComprehension()
    },
    sub(){
      this.start-=5;
      this.end-=5;
      this.drawKnowledgeComprehension()
    },
    formatterHover(params){
      let str=' ';
      str ='<div style="width:100%;padding:10px 15px 10px 15px;font-size:1rem;color:#222;box-sizing:border-box;border-radius:4px;position:relative;">' +
          "<div style='display:flex;align-items:center;'>" +
          params[0].axisValue +
          '<br>知识掌握程度:&nbsp&nbsp'+
          params[0].data +
          "</div>" +
          "</div>";
      return str
    },
    drawKnowledgeComprehension(){
      this.studentChart = this.$echarts.init(document.getElementById("echartsGraph"))
      this.option = {
        label: {
          textBorderWidth: -1,
        },
        // tooltip: {
        //   backgroundColor: 'rgb(199,242,246)',
        //   trigger: 'item',
        //   triggerOn: 'mousemove',
        //   formatter: this.formatterHover,
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: this.formatterHover,
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.name.slice(this.start,this.end),
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.value.slice(this.start,this.end)
          }
        ]
      }
      this.studentChart.setOption(this.option);
    },
    goBackRouter(){
      this.$router.go(-1)
    }
  },
  created() {

  },
  mounted() {
    let userId;
    if(this.$route.query.studentId !== undefined){
      userId = this.$route.query.studentId;
    }else {
      userId = JSON.parse(localStorage.getItem("userInfo")).userId;
    }
    getDinaById(userId).then((res) => {
      if (res.code === 200){
        res.data.forEach((item) => {
          this.name.push(item.knowledgeName)
          this.value.push(item.comprehension)
        })
      }else {
        this.$message.error(res.msg);
      }
      this.drawKnowledgeComprehension();
    })
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100vh;
}
.header{
  width: 80%;
  height: 5vh;
  margin: auto;
  box-sizing: border-box;
  padding: 20px;
  cursor: pointer;
}
.header:hover{
  color: #13a8e8;
}
.staticsChart{
  height: 75vh;
  width: 100%;
}
.button-area{
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>