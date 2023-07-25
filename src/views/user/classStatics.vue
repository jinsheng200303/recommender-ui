<template>
    <div class="staticsChart" id="echartsGraph">

    </div>
</template>

<script>
import { getDinaById } from '@/api/userEchartsApis'
export default {
  data(){
    return{
      graphData:{
        name: "",
        value: 0,
        children: [],
      },
    }
  },
  methods: {
    formatterHover(params){
      let str=' ';
      str ='<div style="width:100%;padding:10px 15px 10px 15px;font-size:1rem;color:#222;box-sizing:border-box;border-radius:4px;position:relative;">' +
          "<div style='display:flex;align-items:center;'>" +
          params.data.name +
          '<br>知识掌握程度:&nbsp&nbsp'+
          params.data.value +
          "</div>" +
          "</div>";
      return str
    },
    drawKnowledgeComprehension(){
      let myChart = this.$echarts.init(document.getElementById("echartsGraph"))
      let option = {
        label: {
          textBorderWidth: -1,
        },
        tooltip: {
          backgroundColor: 'rgb(166,208,211)',
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: this.formatterHover,
        },
        series: [
          {
            type: 'tree',
            data: [this.graphData],
            top: '8%',
            left: '12%',
            bottom: '8%',
            right: '20%',
            layout: 'radial',
            symbolSize: 17,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 15
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              // focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
      myChart.setOption(option);
    },
  },
  created() {
    this.graphData.name = JSON.parse(sessionStorage.getItem("classInfo")).className
  },
  mounted() {
    getDinaById(JSON.parse(localStorage.getItem("userInfo")).userId).then((res) => {
      if (res.code === 200){
        let totleComprehension = 0;
        res.data.forEach((item,index) => {
          // if (index<30){
            this.graphData.children.push({name: item.knowledgeName,value:item.comprehension})
          // }
          totleComprehension +=item.comprehension;
        })
        this.graphData.value = (totleComprehension/res.data.length).toFixed(4);
      }else {
        this.$message.error(res.msg);
      }
      this.drawKnowledgeComprehension()
    })
  }
}
</script>

<style scoped>
.staticsChart{
    height: 100vh;
    width: 100%;
    /*display: flex;*/
    //justify-content: center;
    //align-items: center;
}
</style>