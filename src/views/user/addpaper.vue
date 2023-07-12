<template>
    <el-container>
        <el-main>
            <el-container direction="vertical">
                <el-header>
                    <!-- <div>
                        <el-input class="search-input" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input">
                        </el-input>
                        <el-button type="primary" class="search-button" @click="nameSearch(input)">搜 索</el-button>
                    </div>
                    <div class="el-header-right">
                    </div> -->
                    可选择
                </el-header>
                <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                    <li v-for="(item, index) in questionData" class="infinite-list-item">
                        <pretestpapercard ref="preQuestion" :records=item :index="index" @selectedRefresh="selectedRefresh"></pretestpapercard>
                    </li>
                    <p class="infinite-footer">{{ leftFooterTip }}</p>
                </ul>
            </el-container>
        </el-main>
        <el-main>
            <el-container direction="vertical">
                <el-header>
                    <!-- <div>
                        <el-input class="search-input" placeholder="请输入内容" suffix-icon="el-icon-search" v-model="input">
                        </el-input>
                        <el-button type="primary" class="search-button" @click="nameSearch(input)">搜 索</el-button>
                    </div>
                    <div class="el-header-right">
                    </div> -->
                    已选择
                    <el-button type="primary" @click="generatepaper">验 证</el-button>
                </el-header>
                <ul class="infinite-list" style="overflow:auto">
                    <li v-for="(item, index) in selectedQuestionData" class="infinite-list-item">
                        <selectedtestpapercard :records=item :index="index" @cancelRefresh="cancelRefresh"></selectedtestpapercard>
                    </li>
                    <p class="infinite-footer">{{ rightFooterTip }}</p>
                </ul>
            </el-container>
        </el-main>
    </el-container>
</template>

<script>
import { getQuestionPage } from '@/api/testApis.js'
import pretestpapercard from './pretestpapercard.vue';
import selectedtestpapercard from './selectedtestpapercard.vue'
import { handlePaper,getPaperQuestion } from '@/api/paperApis.js'
export default {
    components: {
        pretestpapercard,
        selectedtestpapercard,
    },
    data() {
        return {
            paperId: 0,
            //分页查询
            questionQuery: {
                pageNum: 0,
                pageSize: 1,
                questionStatement: "",
                bankId: 0,
            },
            //已选择试题
            selectedQuestionData: [],
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
            selectedQuestionId: [],
            //搜索框
            input: '',
            isLoading: true,
            noMore: false,
            rightLoading: true,
        }
    },
    created() {
        this.questionQuery.bankId = this.$route.query.bankId;
        this.paperId = this.$route.query.classId;
    },
    mounted() {
        getPaperQuestion(this.$route.query.paperId)
        .then((res) => {
            this.selectedQuestionData.push(...res.data)
            this.rightLoading = false;
        })
    },
    methods: {
        //分页查询获取试题数据
        getQuestionData(questionQuery) {
            //放在第一步 防止异步请求同一页数据
            this.questionQuery.pageNum++;
            getQuestionPage(questionQuery)
            .then((res) => {
                if (res.code == 200) {
                    res.data.records.filter((data) => {

                    })
                    this.questionData.push(...res.data.records)
                    if(res.data.records.length < questionQuery.pageSize){
                        this.noMore = true;
                    }
                } else {
                    this.questionQuery.pageNum--;
                    this.$message.error(res.msg);
                }
            })
            this.isLoading = false;
        },
        load() {
            this.isLoading = true;
            this.getQuestionData(this.questionQuery);
        },
        selectedRefresh(index){
            this.load();
            this.selectedQuestionId.push(this.questionData[index].questionId);
            this.selectedQuestionData.push(this.questionData[index]);
        },
        cancelRefresh(index){
            this.selectedQuestionId[index] = 0;
            this.questionData.push(this.selectedQuestionData[index])
        },
        generatepaper(){
            console.log(this.selectedQuestionId);
            let handPapersQuery = {
                handleQuestionIds: [],
                paperId: 0,
            }
            this.selectedQuestionId.forEach((item) => {
                if(item != 0){
                    handPapersQuery.handleQuestionIds.push(item);
                }
            })
            handPapersQuery.paperId = this.$route.query.paperId;
            handlePaper(handPapersQuery)
            .then((res) => {
                if(res.code == 200){
                    this.$message.success(res.msg);
                }else {
                    this.$message.error(res.msg);
                }
            })
            console.log(handPapersQuery);
        }
    },
    computed: {
        leftFooterTip() {
            if (this.noMore) {
                return "没有更多了";
            }else if (this.isLoading) {
                return "加载中...";
            }
        },
        rightFooterTip(){
            if(this.rightLoading){
                return "加载中...";
            }else {
                return "没有更多了";
            }
        },
    },
}
</script>

<style scoped>
.el-main {
    width: 50%;
    height: 100vh;
    padding: 0;
}   
/* 搜索框 */
.el-header{
    display: flex;
    align-items: center;
    justify-content: center;
    background: #cedff3;
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
.infinite-list{
    height: calc(100vh - 60px);
    list-style: none;
    padding: 30px;
    box-sizing: border-box;
}
.infinite-list::-webkit-scrollbar{
    display: none;
}
/* .infinite-list-item{
    margin-bottom: 20px;
} */
.infinite-footer{
    text-align: center;
}
</style>