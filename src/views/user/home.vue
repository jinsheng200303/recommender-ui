<template>
    <div>
      <el-header>
        <el-input
            class="search-input"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input">
        </el-input>
      </el-header>
      <el-main>
        <template >
          <ul
              class="infinite-list"
              v-infinite-scroll="load"
              style="overflow:auto">
            <li v-for="item in recommendData" class="infinite-list-item">
              <component
                  :key="item.knowledgeId"
                  :is="cardCategory(item.resourceType)"
                  :recommendData="item">
              </component>
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
        pageInfo:{
          pageNum: 1,
          pageSize: 8,
          resourcesName: '',
        },
        input: '',
        isLoading: true,
        noMore: false,
      };
    },
    methods: {
      cardCategory(resourceType){
        if(resourceType === "文档"){
          return "recommendTextCard";
        }else if(resourceType === "视频"){
          return "recommendVideoCard";
        }
      },
      load(){
        if(!this.noMore){
          this.isLoading = true;
          this.getRecommendData(JSON.parse(JSON.stringify(this.pageInfo)));
        }
      },
      getRecommendData(pageInfo){
        this.pageInfo.pageNum++;
        getRecommendResource(JSON.parse(localStorage.getItem("userInfo")).userId).then((res) => {
          if(res.code == 200){
            this.recommendData.push(...res.data);
            if(res.data.length < this.pageInfo.pageSize){
              this.noMore = true;
            }
          }else {
            this.$message.error(res.msg)
          }
        })
        this.isLoading = false;
      },
    },
    created() {

    },
    mounted() {

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
  </style>