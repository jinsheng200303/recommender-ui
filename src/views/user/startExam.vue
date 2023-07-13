<template>
    <div class="container">
        <div class="paper-card">
            <div class="title">{{ this.$route.query.examTitle }}</div>
            <div class="question-area">
                <startExamQuestion v-for="(item,index) in questionData" 
                :records="item" 
                :index="index" 
                :key="index"
                @selectedRefresh="selectedRefresh"
                ref="examQuestion">
                </startExamQuestion>
            </div>
            <div class="footer">
                <el-button type="primary" @click="submitAnswer">提 交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { getPaperQuestion } from '@/api/paperApis.js'
import { findQuestionOptions } from '@/api/questionApis.js'
import startExamQuestion from './startExamQuestion.vue'
export default {
    components: {
        startExamQuestion,
    },
    data() {
        return {
            questionData: [],
            selectedAnswer: [],
            correctAnswer: [],
        }
    },
    created() {
        getPaperQuestion(this.$route.query.paperId)
        .then((res) => {
            res.data.forEach((item) => {
                this.questionData.push(item);
                this.correctAnswer.push(item.answer);
            })
        }).then(() => {
            this.questionData.forEach((item) => {
                findQuestionOptions(item.questionId)
                .then((res) => {
                    item.options = res.data;
                })
            })
        })
    },
    mounted() {
        setTimeout(() => {
            console.log(this.questionData);
            console.log(this.correctAnswer);
        }, 1000);
    },
    methods: {
        selectedRefresh(radioValue,index){
            this.selectedAnswer[index] = radioValue;
        },
        submitAnswer(){
            this.$confirm("确定提交?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
            .then(() => {
                console.log(this.selectedAnswer)
                this.questionData.forEach((item,index) => {
                    this.$refs.examQuestion[index].submitRefresh();
                })
            })
        }
    },
}
</script>

<style scoped>
.container{
    width: 100%;
    min-height: 100vh;
    padding: 10px 10px 40px 10px;
    box-sizing: border-box;
    background-color: rgb(240,240,240);
}
.paper-card{
    width: 100%;
    max-width: 23cm;
    margin: auto;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 30px;
    background: #ffffff;
    box-shadow: 1px 1px 10px -2px rgba(0, 0, 0, .2);
}
.title{
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
}
.footer{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>