<template>
    <div>
        <el-container>
            <el-aside width="15%">
                <el-menu 
                    class="asideMenu" 
                    @select="handleSelect" 
                    :default-active="activetestPath">
                    <el-menu-item v-for="item in asideNavData" :key="item.bankId" :index="item.bankName">
                        <span slot="title">{{ item.bankName }}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container direction="vertical">
                <el-header>
                    <div>
                        <el-input
                            class="search-input"
                            placeholder="请输入内容"
                            suffix-icon="el-icon-search"
                            v-model="input">
                        </el-input>
                        <el-button type="primary" class="search-button" @click="nameSearch(input)">搜 索</el-button>
                    </div>
                    <div class="el-header-right">
                        <!-- <el-button type="primary" size="small" @click="addClass"><i class="el-icon-plus"></i>添加</el-button> -->
                    </div>
                </el-header>
                <!-- <router-view></router-view> -->
                <!-- <el-main class="test-card-area"> -->
                    <ul 
                    class="infinite-list" 
                    v-infinite-scroll="load"
                    style="overflow:auto">
                        <li v-for="item in questionData" class="infinite-list-item">
                            <testcard :records=item></testcard>
                        </li>
                        <p class="infinite-footer">{{ footerTip }}</p>
                    </ul>
                <!-- </el-main> -->
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { getQuestionPage,getQuestionBank } from '@/api/testApis.js'
import { getRecommendQuestion } from '@/api/personStylePaperApis'
import testcard from './testcard.vue'
import {findQuestionOptions} from "@/api/questionApis";
export default {
    components: {
        testcard,
    },
    data() {
        return {
            //初始化分页基础数据
            init: {
                pageNum: 0,
                pageSize: 10,
                newDataLength: 10,
            },
            //侧边导航栏题库数据
            asideNavData: [
              {
                bankName: '推荐',
                bankId: -1,
              },
                // {
                //     "status": "启用",
                //     "bankId": 1,
                //     "bankName": "数据库",
                //     "bankDesc": "数据库的题目",
                //     "createdTime": null,
                //     "modifyTime": null
                // },
            ],
            //激活导航
            activetestPath: '',
            //分页查询请求数据
            questionQuery: {
                pageNum: 0,
                pageSize: 0,
                questionStatement: "",
                bankId: 0,
            },
            //新数据长度
            newDataLength: 0,
            //试题数据
            questionData: [
                // {
                //     "status": 1,
                //     "questionId": 2,
                //     "bankId": 1,
                //     "questionType": "填空题",
                //     "knowledgeId": 1,
                //     "questionStatement": "第二题",
                //     "answer": "B",
                //     "difficultyLevel": "难",
                //     "score": "3"
                //     "options": [
                //      {
                //      "status": 1,
                //      "optionId": 5,
                //      "questionId": 2,
                //      "optionLabel": "A",
                //      "optionValue": "test5"
                //      },
                //     ],
                // },
            ],
            //搜索框
            input: '',
            isLoading: true,
            noMore: false,
            hasInited: false,
        }
    },
    methods: {
        //侧边导航选择事件
        handleSelect(key, keyPath) {
            if(key != sessionStorage.getItem("testPath")){
                sessionStorage.setItem("testPath",key);
                if(key !== "推荐"){
                  this.asideNavData.forEach((item) => {
                    if(item.bankName == key){
                      this.questionQuery.bankId = item.bankId;
                    }
                  })
                }else {
                  this.questionQuery.bankId = -1;
                }
                this.questionQuery.pageNum = this.init.pageNum;
                this.questionQuery.pageSize = this.init.pageSize;
                this.newDataLength = this.init.newDataLength;
                this.questionQuery.questionStatement = "";
                this.input = "";
                this.questionData.length = 0;
                this.isLoading = false;
                this.noMore = false;
                this.load();
            }
        },
        //侧边导航获取题库列表及再次执行load方法，处理load先加载无法获取数据
        getAsideNavData(){
            getQuestionBank()
            .then((res) => {
                this.asideNavData.push(...res)
                this.asideNavData.forEach((item) => {
                    if(item.bankName == this.activetestPath){
                        this.questionQuery.bankId = item.bankId;
                    }
                })
                this.hasInited = true;
                this.load();
            })
        },
        //分页查询获取试题数据
        getQuestionData(questionQuery){
            //放在第一步 防止异步请求同一页数据
            this.questionQuery.pageNum++;
            if(questionQuery.bankId == -1){
              getRecommendQuestion(JSON.parse(localStorage.getItem("userInfo")).userId).then((res) => {
                if(res.code == 200){
                  this.questionData.push(...res.data)
                  this.newDataLength = res.data.length;
                }else {
                  this.questionQuery.pageNum--;
                  this.$message.error(res.msg);
                }
              }).then(() => {
                this.questionData.forEach((item) => {
                  findQuestionOptions(item.questionId).then((res) => {
                        item.options = res.data;
                  })
                })
                this.isLoading = false;
              })
            }else {
              getQuestionPage(questionQuery)
                  .then((res) => {
                    if(res.code == 200){
                      this.questionData.push(...res.data.records)
                      this.newDataLength = res.data.records.length;
                    }else {
                      this.questionQuery.pageNum--;
                      this.$message.error(res.msg);
                    }
                    this.isLoading = false;
                  }).catch((err) => {
                this.questionQuery.pageNum--;
                this.isLoading = false;
                console.error(err);
              })
            }
        },
        //滚动加载方法
        load () {
            if(this.hasInited){
                if(this.newDataLength == this.questionQuery.pageSize){
                    this.isLoading = true;
                    this.getQuestionData(this.questionQuery);
                }else {
                    this.noMore = true;
                }
            }
        },
        //搜索重置分页数据及判断分页末尾判断
        nameSearch(input){
            this.questionQuery.pageNum = this.init.pageNum;
            this.questionQuery.pageSize = this.init.pageSize;
            this.newDataLength = this.init.newDataLength;
            this.questionQuery.questionStatement = input;
            this.questionData.length = 0;
        },
    },
    created() {
        //侧边导航激活位置加载
        let testPath = sessionStorage.getItem("testPath");
        if(testPath == undefined || testPath == null){
            this.activetestPath = '推荐';
        }else {
            this.activetestPath = sessionStorage.getItem("testPath");
        }
        //初始化分页及分页末数据
        this.questionQuery.pageNum = this.init.pageNum;
        this.questionQuery.pageSize = this.init.pageSize;
        this.newDataLength = this.init.newDataLength;
        this.getAsideNavData();
    },
    mounted() {
        
    },
    computed: {
        footerTip(){
            if(this.isLoading){
                return "加载中...";
            }else if(this.noMore || this.newDataLength == 0){
                return "没有更多了";
            }
        },
    },
}
</script>

<style scoped>
.el-aside{
    min-width: 125px;
    max-width: 250px;
}
.el-aside::-webkit-scrollbar{
    display: none;
}
.asideMenu{
    text-align: center;
    height: calc(100vh - 60px);
    background-color: rgb(250, 250, 250);
    border: 0;
}
.el-menu-item{
    font-size: 1rem;
}
/* 搜索框按钮区域样式 */
.el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: #cedff3; */
    background-color: rgb(245,245,245);
}
.search-input{
    width: 70%;
    max-width: 350px;
    min-width: 150px;
    float: left;
}
.search-button{
    display: flex;
    align-items: center;
    float: right;
}
.el-header-right{
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin: 10px 20px;
}
/* 题库区域 */
.test-card-area{
    height: calc(100vh - 120px);
    padding: 0;
}
.infinite-list{
    height: calc(100vh - 120px);
    list-style: none;
    padding: 30px;
    box-sizing: border-box;
    background-color: rgb(245, 245, 245);
}
.infinite-list-item{
    margin-bottom: 20px;
    background-color: rgb(240, 240, 240);
}
.infinite-footer{
    text-align: center;
}
</style>