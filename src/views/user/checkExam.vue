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
      </div>
    </div>
  </div>
</template>

<script>
import { getPaperQuestion } from '@/api/paperApis.js'
import { findQuestionOptions } from '@/api/questionApis.js'
import startExamQuestion from './startExamQuestion.vue'
import {getStudentPaper} from "@/api/studentPaperPageApis";
export default {
  components: {
    startExamQuestion,
  },
  data() {
    return {
      questionData: [],
      pageInfo: {
        examId: this.$route.query.examId,
        userId: this.$route.query.studentId,
        pageNum: 1,
        pageSize: 1,
      }
    }
  },
  created() {
    // getPaperQuestion(this.$route.query.paperId)
    //     .then((res) => {
    //       res.data.forEach((item) => {
    //         this.questionData.push(item);
    //         this.correctAnswer.push(item.answer);
    //         item.studentAnswer = '';
    //       })
    //     }).then(() => {
    //   this.questionData.forEach((item) => {
    //     findQuestionOptions(item.questionId)
    //         .then((res) => {
    //           item.options = res.data;
    //         })
    //   })
    // })
  },
  mounted() {
    this.getData();
  },
  methods: {
    selectedRefresh(radioValue,index){

    },
    getData(){
      getStudentPaper(this.pageInfo).then((res) => {
        if(res.code === 200){
          this.questionData = JSON.parse(res.data.records[0].paper)
          this.$nextTick(() => {
            this.questionData.forEach((item,index) => {
              this.$refs.examQuestion[index].checkRefresh();
              this.$refs.examQuestion[index].submitRefresh();
            })
          })
        }else {
          this.$message.error(res.error)
        }
      })
    },
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