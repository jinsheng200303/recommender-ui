<template slot-scope="scope">
  <div>
    <el-row :gutter="10" style="margin-bottom:40px;">
      <el-col :span="5">
        <el-card>
          <div style="text-align:center;margin-bottom:5px;color:red;">
            <i class="el-icon-user-solid"></i>用户总数</div>
          <div style="padding:10px 0; text-align:center;font-weight:bold;">
            <el-tag type="primary" style="font-size:20px;color:red;">{{userNumbers}}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div style="text-align:center;margin-bottom:5px;color:rgb(182, 91, 152);">
            <i class="el-icon-user"></i>学生总数</div>
          <div style="padding:10px 0; text-align:center;font-weight:bold;">
            <el-tag type="primary" style="font-size:20px;color:rgb(182, 91, 152);">{{studentNumbers}}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div style="text-align:center;margin-bottom:5px;color:rgb(15, 114, 145);">
            <i class="el-icon-user"></i>教师总数</div>
          <div style="padding:10px 0; text-align:center;font-weight:bold;">
            <el-tag type="primary" style="font-size:20px;color:rgb(15, 114, 145);">{{teacherNumbers}}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div style="text-align:center;margin-bottom:5px;color:blue;">
            <i class="el-icon-user"></i>管理员总数</div>
          <div style="padding:10px 0; text-align:center;font-weight:bold;">
            <el-tag type="primary" style="font-size:20px;color:blue;">{{managerNumbers}}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div style="text-align:center;margin-bottom:5px;color:green;">
            <i class="el-icon-user"></i>其他</div>
          <div style="padding:10px 0; text-align:center;font-weight:bold;">
            <el-tag type="primary" style="font-size:20px;color:green;">{{other}}</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row style="margin-top:20px;">
      <el-col :span="12">
        <div id="left" style="width: 500px; height: 500px"></div>
      </el-col>
      <el-col :span="12">
        <div id="right" style="width: 500px; height: 500px"></div>
      </el-col>
    </el-row>
  </div>
  
</template>

<style scoped>

</style>

<script>
import * as echarts from 'echarts';
import {getEchartsUsersAge} from "@/api/userEchartsApis.js";
import {getEchartsUsersPolitics} from "@/api/userEchartsApis.js";
import {getUsersRole} from "@/api/userEchartsApis.js";
import {getAllUser} from "@/api/userApis.js";


export default { 
  data() {
    return {
      userNumbers: 0,
      studentNumbers: 0,
      teacherNumbers: 0,
      managerNumbers: 0,
      other: 0,
      sideWidth: 200,
    };
  },
  created(){
    this.load()
  },
  methods:{
    load() {
      getAllUser().then((res) => {
          // console.log(res)
          this.userNumbers = res.length
        })
      getUsersRole().then((res) => {
        console.log(res)
        this.studentNumbers = res.data[0]
        this.teacherNumbers = res.data[1]
        this.managerNumbers = res.data[2]
        this.other = res.data[3]
      })
    }
  },
  mounted() {   //页面元素加载完成之后再触发
    var chartDom = document.getElementById('left');
    var myChart = echarts.init(chartDom);
    var cookieOption;
    cookieOption = {  //空心饼图
      title: {
        text: '用户年龄统计图',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        left: 'center'
      },
      series: [
        {
          name: '用户年龄分布概况',
          type: 'pie',
          radius: [20, 140],
          center: ['50%', '60%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: [],
        }
      ]
    };
    getEchartsUsersAge().then((res) => {
      cookieOption.series[0].data=[
        {name: "0-18岁", value: res.data[0]},
        {name: "19-22岁", value: res.data[1]},
        {name: "23-35岁", value: res.data[2]},
        {name: "36-60岁", value: res.data[3]},
        {name: "61+岁", value: res.data[4]},
        {name: "<0岁", value: res.data[5]},
      ]
      cookieOption && myChart.setOption(cookieOption);
    })
    
    var chartDom2 = document.getElementById('right');
    var myChart2 = echarts.init(chartDom2);
    var colOption;
    colOption = {
      title: {
        text: '不同用户政治面貌分类总数统计',
        subtext: '比例图',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['共青团员', '中共党员', '民主党派', '群众', '其他'],
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
          name: 'column',
          type: 'bar',
          barWidth: '60%',
          data: []
        },
        {
          name: '人数',
          type: 'line',
          smooth: true,
          // yAxisIndex: 1,
          // tooltip: {
          //   valueFormatter: function (value) {
          //     return value + ' °C';
          //   }
          // },
          data: []
        }
        
      ]
    };
    getEchartsUsersPolitics().then((res) => {
      colOption.series[0].data=res.data
      colOption.series[1].data=res.data
      colOption && myChart2.setOption(colOption);
    })
  },
}
</script>