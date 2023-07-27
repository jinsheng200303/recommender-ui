<template>
    <div>
      <el-header>
        <el-input
            class="search-input"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input">
        </el-input>
        <p style="margin:auto;font-size:30px;float:right;">对外汉语教育个性化智学系统</p>
      </el-header>
      <el-main>
        <template >
          <ul
              class="infinite-list"
              v-infinite-scroll="load"
              style="overflow:auto">
            <li class="recommend-area">
              <div class="recommend-container">


<div class="SwiperBox" ref="SwiperBox" @mouseenter="MouseFun('移入')" @mouseleave="MouseFun('移出')">
				<!-- 图片 -->
				<div class="imgBox" :style="{left:`-${leftVal}px`,transition:`${ition}s`}">
					<img :src="item.imgUrl" v-for="(item,index) in imgList" :key="index" />
					<!-- 复制第一张放到最后,以实现无缝无线循环滚动效果 -->
					<img :src="imgList[0].imgUrl" alt="">
				</div>
				<!-- 左箭头按钮 -->
				<div class="leftBtn" @click="throttle(PrevFun)">&larr;</div>
				<!-- 右箭头按钮 -->
				<div class="rightBtn" @click="throttle(NextFun)">&rarr;</div>
				<!-- 下方指示点容器 -->
				<div class="instBox">
					<div @click="instFun(index)" v-for="(item,index) in imgList.length" :key="index"
						:class="['inst',index==imgShow?'instActv':'']">
					</div>
				</div>
			</div>

                <div class="recommend-container-title">资 源 推 荐</div>
                <div class="recommend-card-wrapper"
                     v-for="item in recommendData"
                     :key="item.resourcesId">
                  <recommend-text-card
                      :recommendData="item">
                  </recommend-text-card>
                </div>
              </div>
            </li>
            <div class="lesson-title">公 共 课 程 资 源</div>
            <li v-for="item in lessonData" class="infinite-list-item" :key="item.lessonId">
              <recommend-video-card :recommendData="item"></recommend-video-card>
            </li>
            <p class="infinite-footer">{{ footerTip }}</p>
          </ul>
        </template>
      </el-main>
    </div>
  </template>
  
  <script>
  import recommendTextCard from "@/views/user/recommendTextCard.vue";
  import recommendVideoCard from "@/views/user/recommendVideoCard.vue";
  import { getRecommendResource } from "@/api/personStylePaperApis";
  import testcard from "@/views/user/testcard.vue";
  import {getLessonPage} from "@/api/lessonApis";

  export default {
    name: "home",
    components: {
      testcard,
      recommendVideoCard,
      recommendTextCard,
    },
    data() {
      return {
        recommendData: [],
        lessonData: [],
        pageInfo:{
          pageNum: 1,
          pageSize: 8,
          resourcesName: '',
        },
        input: '',
        isLoading: true,
        noMore: false,


        imgList: [
					    {imgUrl: "https://pic.2amok.com/20210527/e7883f3d86ce53b9c043d1f984895c80output_00004.jpg"},
					    {imgUrl: "https://img.tukuppt.com/ad_preview/00/05/43/5c98d7efa7804.jpg!/fw/980"},
					    {imgUrl: "https://pic1.zhimg.com/v2-463f671095a7591e30b727d295fe701b_1440w.jpg?source=172ae18b"},
					    {imgUrl: "https://pic4.zhimg.com/v2-39587221096a0d44e876c70459957db2_r.jpg"},
					],
					leftVal: 0, // 轮播图盒子的偏移值
					flag: true, // 用来节流防止重复点击
					start: null, // 自动执行下一张定的时器
					imgWidth: 1400, // 在这里填写你需要的图片宽度
					ition: 0.6, // 设置轮播图过度时间
					imgShow: 0, // 表示当前显示的图片索引
      };
    },
    methods: {
      load(){
        if(!this.noMore){
          this.isLoading = true;
          this.getLessonData(JSON.parse(JSON.stringify(this.pageInfo)));
        }
      },
      getLessonData(pageInfo){
        this.pageInfo.pageNum++;
        getLessonPage(pageInfo).then((res) => {
          if(res.code === 200){
            this.lessonData.push(...res.data.records);
            if(res.data.records.length < this.pageInfo.pageSize){
              this.noMore = true;
            }
          }else {
            this.$message.error(res.msg)
          }
        })
        this.isLoading = false;
      },
      getRecommendData(){
        getRecommendResource(JSON.parse(localStorage.getItem("userInfo")).userId).then((res) => {
          if(res.code == 200){
            this.recommendData.push(...res.data);
          }else {
            this.$message.error(res.msg)
          }
        })
      },


      MouseFun(type) { // 停止定时器            // 重新执行定时器
					type == '移入' ? clearTimeout(this.start) : this.carousel()
				},
      carousel() {
					this.start = setInterval(() => {
						this.NextFun()
					}, 1500)
      },
				// 这里通过额外封装的节流函数触发 PrevFun() 和 NextFun(),以达到防止重复点击的效果
				throttle(fun) {
          if (this.flag) {
						this.flag = false;
						fun(); // 此为模板中传递进来的PrevFun()或NextFun()函数
						setTimeout(() => {
              this.flag = true;
						}, 650); // 设置节流间隔时间,不得小于图片过渡时间
					}
				},
        // 上一张
				PrevFun() {
					if (this.leftVal == 0) { // 判断显示的图片 是 第一张时执行
						// this.imgList.length是指循环图片数组的图片个数
						this.ition = 0 // 将过渡时间变成0，瞬间位移到最后一张图
						this.imgShow = this.imgList.length - 1 // 将高亮小点改为最后一张图
						this.leftVal = this.imgList.length * this.imgWidth // 瞬间移动
						this.$nextTick(() => {	// $nextTick是一个vue内置函数,是一个等待dom元素更新后执行的回调函数
							setTimeout(() => { // 通过延时障眼法,归原过渡时间,执行真正的“上一张”函数
								this.ition = 0.6
								this.leftVal -= this.imgWidth
							}, this.ition * 1000)
						})
					} else { // 判断显示的图片 不是 第一张时执行
						this.ition = 0.6
						this.leftVal -= this.imgWidth
						this.imgShow--
					}
				},
        // 下一张
				NextFun() {
					if (this.leftVal == (this.imgList.length - 1) * this.imgWidth) { // 判断显示的图片 是 最后一张时执行
						this.ition = 0.6
						this.leftVal += this.imgWidth
						this.imgShow = 0
						this.$nextTick(() => {
							setTimeout(() => {
								this.ition = 0
								this.leftVal = 0
							}, this.ition * 1000)
						})
					} else { // 判断显示的图片 不是 最后一张时执行
						this.ition = 0.6
						this.leftVal += this.imgWidth
						this.imgShow++
					}
				},
        // 点击小圆点
				instFun(index) {
					this.ition = 0.6
					this.leftVal = index * this.imgWidth
					this.imgShow = index
				},

    },
    created() {
      this.getRecommendData();
    },
    mounted() {
      this.carousel()
    },
    computed: {
      footerTip(){
        if(this.isLoading){
          return "加载中...";
        }else if(this.noMore){
          return "没有更多了";
        }
      },
    },
  };
  
  </script>
  
  <style scoped >
  .el-header{
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
  .search-input{
    width: 25%;
    max-width: 350px;
    min-width: 175px;
    margin: 10px 20px;
  }
  .el-main {
    background-color: rgb(245, 245, 245);
    padding: 0;
    height: calc(100vh - 120px);
  }
  .recommend-container{
    /* //width: 100%;
    //height: 100%; */
  }
  .recommend-container-title{
    text-align: center;
    font-size: 1.5rem;
    margin-top: 3px;
  }
  .recommend-area{
    width: 100%;
    /* //height: 265px; */
    margin-bottom: 40px;
    float: left;
    /* //display: flex;
    //flex-direction: column;
    //flex-wrap: wrap;
    //justify-content: center;
    //align-items: center; */
  }
  .recommend-card-wrapper{
    float: left;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lesson-title{
    width: 100%;
    height: 50px;
    float: left;
    text-align: center;
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
  .infinite-list{
    height: calc(100vh - 120px);
    list-style: none;
    padding: 30px;
    box-sizing: border-box;
  }
  .infinite-list-item{
    margin-bottom: 40px;
    float: left;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .infinite-footer{
    text-align: center;
    width: 100%;
    float: left;
  }


  /* 图片容器样式 */
		.SwiperBox {
			position: relative;
			width: 1400px;
			height: 600px;
			box-sizing: border-box;
			cursor: pointer;
			overflow: hidden;
      margin: auto;
		}
		.imgBox {
			position: absolute;
			top: 0px;
			left: 0px;
			min-width: 500px;
			height: 300px;
			display: flex;
			justify-content: flex-start;
		}
		/* 图片默认样式 */
		.imgBox img {
			flex-shrink: 0;
			width: 1400px;
			height: 600px;
		}
		/* 两个按钮共有的样式,也可直接使用箭头图片替代 */
		.leftBtn,
		.rightBtn {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: 30px;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(109, 109, 109, 0.445);
			color: #fff;
			border-radius: 50%;
			cursor: pointer;
			font-size: 12px;
			font-weight: 500;
			user-select: none;
		}
		.leftBtn {
			left: 10px;
		}
		.rightBtn {
			right: 10px;
		}
		/* 下方指示器盒子 */
		.instBox {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 10px;
			display: flex;
		}
		/* 小圆点 */
		.inst {
			width: 10px;
			height: 10px;
			border: 1px solid #ccc;
			margin-right: 8px;
			background: #fff;
			border-radius: 50%;
			cursor: pointer;
		}
		.inst:last-child {
			margin-right: 0px;
		}
		.instActv {
			border: 1px solid #ff0000;
			background: #ff0000;
		}

  </style>