<template>
    <el-container>
        <el-main>
            <el-container direction="vertical">
                <el-header>
                    <div></div>
                    可选择
                    <div></div>
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
                    <div>{{  }}</div>
                    已选择
                    <div class="selected-header-area">
                        <div><el-button size="small" type="primary" @click="autoGenerateButton">自动生成</el-button></div>
                        <div>
                            <el-button size="small" type="primary" @click="generatepaper">确 定</el-button>
                        </div>
                    </div>
                </el-header>
                <ul class="infinite-list" style="overflow:auto">
                    <li v-for="(item, index) in selectedQuestionData" class="infinite-list-item">
                        <selectedtestpapercard :records=item :index="index" @cancelRefresh="cancelRefresh"></selectedtestpapercard>
                    </li>
                    <p class="infinite-footer">{{ rightFooterTip }}</p>
                </ul>
            </el-container>
        </el-main>
        <autogeneratedialog ref="autogeneratedialog"></autogeneratedialog>
    </el-container>
</template>

<script>
import { getQuestionPage } from '@/api/testApis.js'
import { findQuestionOptions } from '@/api/questionApis.js'
import pretestpapercard from './pretestpapercard.vue';
import selectedtestpapercard from './selectedtestpapercard.vue'
import { handlePaper,getPaperQuestion } from '@/api/paperApis.js'
import autogeneratedialog from './autogeneratedialog.vue';
export default {
    components: {
        pretestpapercard,
        selectedtestpapercard,
        autogeneratedialog,
    },
    data() {
        return {
            paperId: 0,
            //分页查询
            questionQuery: {
                pageNum: 0,
                pageSize: 10,
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
        this.paperId = this.$route.query.paperId;
        getPaperQuestion(this.$route.query.paperId)
        .then((res) => {
            res.data.forEach((item) => {
                this.selectedQuestionId.push(item.questionId)
                this.selectedQuestionData.push(item)
            })
        })
        .then(() => {
            this.selectedQuestionData.forEach((item) => {
                findQuestionOptions(item.questionId)
                .then((res) => {
                    item.options = res.data;
                })
            })
            this.rightLoading = false;
        })
    },
    mounted() {

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
            this.$confirm("确定试题?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
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
                        window.close();
                    }else {
                        this.$message.error(res.msg);
                    }
                })
            })  
        },
        autoGenerateButton(){
            this.$nextTick(() => {
                this.$refs.autogeneratedialog.dialogVisible();
            })
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
/* 顶部 */
.el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* background: #cedff3; */
    background: #b3e8d8;
}
.selected-header-area{
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-button{
    margin-right: 10px;
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